import getUserId from "@/lib/auth/getUserId.util";
import { AppError } from "@/lib/errors/AppError";
import responseSuccess from "@/lib/responses/responseSuccess";
import { createClient } from "@/lib/supabase/server";
import { TypePaginationMeta } from "@/types/paginationMeta.type";
import { TypeResponseSuccess } from "@/types/responseSuccess.type";
import { TypeProduct } from "../types/Product.type";
// import { TypeProduct } from "../types/ProductListItem.type";

export default async function getProductsService(
  name?: string,
  page: number = 1,
  limit: number = 10,
): Promise<TypeResponseSuccess<TypeProduct[]>> {
  const supabase = await createClient();

  const userId = await getUserId();

  const from = (page - 1) * limit;
  const to = from + limit - 1;

  let query = supabase
    .from("products")
    .select("*", { count: "exact" })
    .eq("user_id", userId);

  if (name) {
    query = query.ilike("name", `%${name}%`);
  }

  const { data, error, count } = await query.range(from, to);

  const total = count ?? 0;
  const totalPages = Math.ceil(total / limit);

  const meta: TypePaginationMeta = {
    page: page,
    limit: limit,
    total: total,
    totalPages: totalPages,
  };

  if (error) throw new AppError("Failed to get products");

  return responseSuccess(data, "Success get data products", 200, meta);
}
