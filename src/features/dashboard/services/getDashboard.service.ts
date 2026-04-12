import getUserId from "@/lib/auth/getUserId.util";
import { AppError } from "@/lib/errors/AppError";
import responseSuccess from "@/lib/responses/responseSuccess";
import { createClient } from "@/lib/supabase/server";
import { TypeResponseSuccess } from "@/types/responseSuccess.type";
import { formatCurrency, formatNumber } from "@/utils/formatCurrency.util";
import { TypeDashboardData } from "../types/DashboardData.type";

const RANGE_30D = "30d";
const RANGE_1Y = "1y";

type SalesItemRow = {
  quantity: number;
  price: number;
  cost: number;
  product_id: string;
  sales?: { user_id: string; created_at: string } | null;
  products?: { name: string | null } | null;
};

type ProductRow = {
  id: string;
  cost: number | null;
  stock: number | null;
};

type StockLogRow = {
  product_id: string;
  quantity: number | null;
  type: "IN" | "OUT" | null;
  created_at: string | null;
  products?: { cost: number | null } | null;
};

function resolveRangeDate(range?: string) {
  if (range === RANGE_30D) {
    const fromDate = new Date();
    fromDate.setDate(fromDate.getDate() - 30);
    return fromDate.toISOString();
  }

  if (range === RANGE_1Y) {
    const fromDate = new Date();
    fromDate.setFullYear(fromDate.getFullYear() - 1);
    return fromDate.toISOString();
  }

  return null;
}

function formatMonthLabel(date: Date) {
  return new Intl.DateTimeFormat("id-ID", {
    month: "short",
    year: "numeric",
  }).format(date);
}

function formatDayLabel(date: Date) {
  return new Intl.DateTimeFormat("id-ID", {
    day: "2-digit",
    month: "short",
  }).format(date);
}

type Bucket = { start: Date; end: Date; label: string };

function buildBuckets(range?: string) {
  const now = new Date();

  if (range === RANGE_1Y) {
    const buckets: Bucket[] = [];
    for (let i = 11; i >= 0; i -= 1) {
      const start = new Date(now);
      start.setMonth(start.getMonth() - i, 1);
      start.setHours(0, 0, 0, 0);

      const end = new Date(start);
      end.setMonth(end.getMonth() + 1);
      end.setDate(0);
      end.setHours(23, 59, 59, 999);
      if (i === 0 && end > now) {
        end.setTime(now.getTime());
      }

      buckets.push({ start, end, label: formatMonthLabel(start) });
    }
    return buckets;
  }

  const startDate = new Date(now);
  startDate.setDate(startDate.getDate() - 29);
  startDate.setHours(0, 0, 0, 0);

  const endDate = new Date(now);
  endDate.setHours(23, 59, 59, 999);

  const totalDays = Math.floor(
    (endDate.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24),
  ) + 1;
  const bucketCount = Math.ceil(totalDays / 7);
  const buckets: Bucket[] = [];

  for (let i = 0; i < bucketCount; i += 1) {
    const bucketStart = new Date(startDate);
    bucketStart.setDate(bucketStart.getDate() + i * 7);
    const bucketEnd = new Date(bucketStart);
    bucketEnd.setDate(bucketEnd.getDate() + 6);
    if (bucketEnd > endDate) bucketEnd.setTime(endDate.getTime());

    buckets.push({
      start: bucketStart,
      end: bucketEnd,
      label: `${formatDayLabel(bucketStart)} - ${formatDayLabel(bucketEnd)}`,
    });
  }

  return buckets;
}

function buildSalesSeries(rows: SalesItemRow[], buckets: Bucket[]) {
  const revenue = buckets.map(() => 0);

  for (const item of rows) {
    const saleDateRaw = item.sales?.created_at;
    if (!saleDateRaw) continue;
    const saleDate = new Date(saleDateRaw);

    const bucketIndex = buckets.findIndex(
      (bucket) => saleDate >= bucket.start && saleDate <= bucket.end,
    );
    if (bucketIndex === -1) continue;

    const quantity = item.quantity ?? 0;
    revenue[bucketIndex] += (item.price ?? 0) * quantity;
  }

  return revenue;
}

function buildModalInSeries(logs: StockLogRow[], buckets: Bucket[]) {
  const totals = buckets.map(() => 0);

  for (const log of logs) {
    if (log.type !== "IN") continue;
    if (!log.created_at) continue;
    const logDate = new Date(log.created_at);

    const bucketIndex = buckets.findIndex(
      (bucket) => logDate >= bucket.start && logDate <= bucket.end,
    );
    if (bucketIndex === -1) continue;

    const cost = log.products?.cost ?? 0;
    const quantity = log.quantity ?? 0;
    totals[bucketIndex] += cost * quantity;
  }

  for (let i = 1; i < totals.length; i += 1) {
    totals[i] += totals[i - 1];
  }

  return totals;
}

export default async function getDashboardService(
  range?: string,
): Promise<TypeResponseSuccess<TypeDashboardData>> {
  const supabase = await createClient();
  const userId = await getUserId();

  const fromDate = resolveRangeDate(range);
  const buckets = buildBuckets(range);

  let query = supabase
    .from("sales_items")
    .select(
      "quantity, price, cost, product_id, sales!inner(user_id, created_at), products(name)",
    )
    .eq("sales.user_id", userId);

  if (fromDate) {
    query = query.gte("sales.created_at", fromDate);
  }

  const { data, error } = await query;

  if (error) throw new AppError("Failed to get dashboard data");

  const rows = (data as SalesItemRow[] | null | undefined) ?? [];

  const { data: productsData, error: productsError } = await supabase
    .from("products")
    .select("id, cost, stock")
    .eq("user_id", userId);

  if (productsError) throw new AppError("Failed to get products data");

  const totals = rows.reduce(
    (accumulator, item) => {
      const quantity = item.quantity ?? 0;
      const revenue = (item.price ?? 0) * quantity;
      const cost = (item.cost ?? 0) * quantity;

      return {
        revenue: accumulator.revenue + revenue,
        cost: accumulator.cost + cost,
        items: accumulator.items + quantity,
      };
    },
    { revenue: 0, cost: 0, items: 0 },
  );

  const productMap = new Map<string, { name: string; sold: number }>();
  for (const item of rows) {
    const productId = item.product_id;
    if (!productId) continue;

    const name = item.products?.name ?? "Produk tidak diketahui";
    const sold = item.quantity ?? 0;
    const current = productMap.get(productId);

    if (current) {
      current.sold += sold;
    } else {
      productMap.set(productId, { name, sold });
    }
  }

  const topProducts = Array.from(productMap.entries())
    .map(([product_id, value]) => ({
      product_id,
      name: value.name,
      sold: value.sold,
    }))
    .sort((a, b) => b.sold - a.sold)
    .slice(0, 5);

  const labels = buckets.map((bucket) => bucket.label);
  const revenueSeries = buildSalesSeries(rows, buckets);

  const productList = (productsData as ProductRow[] | null | undefined) ?? [];
  const productIds = productList.map((product) => product.id);

  let stockLogs: StockLogRow[] = [];
  if (productIds.length > 0 && buckets.length > 0) {
    const rangeStart = buckets[0].start.toISOString();
    const rangeEnd = buckets[buckets.length - 1].end.toISOString();
    const { data: logsData, error: logsError } = await supabase
      .from("stock_logs")
      .select("product_id, quantity, type, created_at, products(cost)")
      .in("product_id", productIds)
      .gte("created_at", rangeStart)
      .lte("created_at", rangeEnd);

    if (logsError) throw new AppError("Failed to get stock logs");
    stockLogs = (logsData as StockLogRow[] | null | undefined) ?? [];
  }

  const modalSeries = buildModalInSeries(stockLogs, buckets);
  const modalInTotal = modalSeries[modalSeries.length - 1] ?? 0;
  const profitFinal = totals.revenue - modalInTotal;
  const profitFinalTone =
    profitFinal > 0 ? "positive" : profitFinal < 0 ? "negative" : "neutral";

  const stats = [
    { label: "Omzet", value: formatCurrency(totals.revenue) },
    { label: "Modal Stok", value: formatCurrency(modalInTotal) },
    {
      label: "Laba Bersih",
      value: formatCurrency(profitFinal),
      tone: profitFinalTone,
    },
    {
      label: "Item Terjual",
      value: formatNumber(totals.items),
    },
  ];

  const analysis = {
    totalSales: formatCurrency(totals.revenue),
    totalCost: formatCurrency(modalInTotal),
    totalItems: formatNumber(totals.items),
    series: { labels, revenue: revenueSeries, modalStock: modalSeries },
  };

  return responseSuccess(
    { stats, analysis, topProducts },
    "Success get dashboard data",
    200,
  );
}
