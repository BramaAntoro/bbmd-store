import { AppError } from "@/lib/errors/AppError";
import { TypeResponseSuccess } from "@/types/responseSuccess.type";
import { createClient } from "@/lib/supabase/server";
import getUserId from "@/lib/auth/getUserId.util";
import responseSuccess from "@/lib/responses/responseSuccess";
import { TypeProductStatsCard } from "../types/ProductStatsCard.type";

export default async function getStatsProductsService(): Promise<
  TypeResponseSuccess<TypeProductStatsCard[]>
> {
  const supabase = await createClient();

  const userId = await getUserId();

  const { data, error } = await supabase
    .from("products")
    .select("id, stock, price")
    .eq("user_id", userId);

  const totalProduct = data?.length;
  const totalStock = data?.reduce(
    (accumulator, product) => accumulator + product.stock,
    0,
  );
  const outOfStock = data?.filter((product) => product.stock === 0).length;

  const stats: TypeProductStatsCard[] = [
    { label: "Total Produk", value: String(totalProduct ?? 0) },
    { label: "Total Stok", value: String(totalStock ?? 0) },
    { label: "Stok Habis", value: String(outOfStock ?? 0) },
  ];

  if (error) throw new AppError("Failed to get total products");

  return responseSuccess(stats, "Successfully retrieved statistics");
}
