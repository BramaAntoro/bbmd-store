import getUserId from "@/lib/auth/getUserId.util";
import { AppError } from "@/lib/errors/AppError";
import responseSuccess from "@/lib/responses/responseSuccess";
import { createClient } from "@/lib/supabase/server";
import { TypePaginationMeta } from "@/types/paginationMeta.type";
import { TypeResponseSuccess } from "@/types/responseSuccess.type";
import { TypeSaleListItem } from "../types/SaleListItem.type";

const DEFAULT_LIMIT = 10;

type SaleRow = {
  id: string;
  created_at: string;
  total: number;
  sales_items?: { quantity: number }[] | null;
};

export default async function getSalesService(
  page: number = 1,
  limit: number = DEFAULT_LIMIT,
  range?: string,
): Promise<TypeResponseSuccess<TypeSaleListItem[]>> {
  const supabase = await createClient();
  const userId = await getUserId();

  const from = (page - 1) * limit;
  const to = from + limit - 1;

  let query = supabase
    .from("sales")
    .select("id, created_at, total, sales_items(quantity)", { count: "exact" })
    .eq("user_id", userId)
    .order("created_at", { ascending: false });

  if (range === "30d") {
    const fromDate = new Date();
    fromDate.setDate(fromDate.getDate() - 30);
    query = query.gte("created_at", fromDate.toISOString());
  }

  if (range === "1y") {
    const fromDate = new Date();
    fromDate.setFullYear(fromDate.getFullYear() - 1);
    query = query.gte("created_at", fromDate.toISOString());
  }

  const { data, error, count } = await query.range(from, to);

  if (error) throw new AppError("Failed to get sales");

  const normalized = (data as SaleRow[] | null | undefined)?.map((sale) => ({
    id: sale.id,
    created_at: sale.created_at,
    total: sale.total,
    items_count:
      sale.sales_items?.reduce(
        (accumulator, item) => accumulator + (item.quantity ?? 0),
        0,
      ) ?? 0,
  })) ?? [];

  const total = count ?? 0;
  const totalPages = Math.ceil(total / limit);

  const meta: TypePaginationMeta = {
    page,
    limit,
    total,
    totalPages,
  };

  return responseSuccess(normalized, "Success get data sales", 200, meta);
}
