import { TypeResponseSuccess } from "@/types/responseSuccess.type";
import { TypeProductUpdate } from "../types/ProductInput.type";
import { createClient } from "@/lib/supabase/server";
import { AppError } from "@/lib/errors/AppError";
import responseSuccess from "@/lib/responses/responseSuccess";

export default async function updateProductService(
  dataUpdate: TypeProductUpdate,
): Promise<TypeResponseSuccess<TypeProductUpdate>> {
  const supabase = await createClient();

  const { id, ...payload } = dataUpdate;
  let stockDelta = 0;

  if (dataUpdate.stock !== undefined) {
    const { data: current, error: currentError } = await supabase
      .from("products")
      .select("stock")
      .eq("id", id)
      .single();

    if (currentError) throw new AppError(currentError.message);
    const currentStock = current?.stock ?? 0;
    stockDelta = dataUpdate.stock - currentStock;
  }

  const { data, error } = await supabase
    .from("products")
    .update(payload)
    .eq("id", id)
    .select();

  if (error) throw new AppError(error.message);

  if (stockDelta !== 0) {
    const { error: logError } = await supabase.from("stock_logs").insert({
      id: crypto.randomUUID(),
      product_id: id,
      quantity: Math.abs(stockDelta),
      type: stockDelta > 0 ? "IN" : "OUT",
    });

    if (logError) throw new AppError(logError.message);
  }

  return responseSuccess(data[0], "successful data update", 201);
}
