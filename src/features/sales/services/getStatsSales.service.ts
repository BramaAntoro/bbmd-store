import { AppError } from "@/lib/errors/AppError";
import { TypeResponseSuccess } from "@/types/responseSuccess.type";
import { createClient } from "@/lib/supabase/server";
import getUserId from "@/lib/auth/getUserId.util";
import responseSuccess from "@/lib/responses/responseSuccess";
import { TypeSaleStatsCard } from "../types/SaleStatsCard.type";
import { formatCurrency, formatNumber } from "@/utils/formatCurrency.util";

const RANGE_30D = "30d";
const RANGE_1Y = "1y";

type SaleStatsRow = {
  total: number;
  created_at: string;
};

export default async function getStatsSalesService(
  range?: string,
): Promise<TypeResponseSuccess<TypeSaleStatsCard[]>> {
  const supabase = await createClient();
  const userId = await getUserId();

  let query = supabase
    .from("sales")
    .select("total, created_at")
    .eq("user_id", userId)
    .order("created_at", { ascending: false });

  if (range === RANGE_30D) {
    const fromDate = new Date();
    fromDate.setDate(fromDate.getDate() - 30);
    query = query.gte("created_at", fromDate.toISOString());
  }

  if (range === RANGE_1Y) {
    const fromDate = new Date();
    fromDate.setFullYear(fromDate.getFullYear() - 1);
    query = query.gte("created_at", fromDate.toISOString());
  }

  const { data, error } = await query;

  if (error) throw new AppError("Failed to get sales statistics");

  const sales = (data as SaleStatsRow[] | null | undefined) ?? [];
  const totalRevenue = sales.reduce(
    (accumulator, sale) => accumulator + (sale.total ?? 0),
    0,
  );
  const totalTransactions = sales.length;
  const averageOrderValue =
    totalTransactions > 0 ? totalRevenue / totalTransactions : 0;

  const stats: TypeSaleStatsCard[] = [
    { label: "Pendapatan", value: formatCurrency(totalRevenue) },
    { label: "Transaksi", value: formatNumber(totalTransactions) },
    { label: "Rata-rata Pesanan", value: formatCurrency(averageOrderValue) },
  ];

  return responseSuccess(stats, "Successfully retrieved statistics");
}
