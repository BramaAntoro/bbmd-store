import { createClient } from "@/lib/supabase/server";
import { AppError } from "@/lib/errors/AppError";
import responseSuccess from "@/lib/responses/responseSuccess";
import { TypeResponseSuccess } from "@/types/responseSuccess.type";
import { TypeProductInput } from "../types/ProductInput.type";
import getUserId from "@/lib/auth/getUserId.util";

export default async function postProductService(
  product: TypeProductInput,
): Promise<TypeResponseSuccess<TypeProductInput>> {
  const supabase = await createClient();

  const userId = await getUserId();

  const submitData = { ...product, user_id: userId };

  const { data, error } = await supabase
    .from("products")
    .insert(submitData)
    .select()
    .single();

  if (error) {
    console.error("SUPABASE ERROR:", error);
    throw new AppError(error.message);
  }

  if (data.stock && data.stock > 0) {
    const { error: logError } = await supabase.from("stock_logs").insert({
      id: crypto.randomUUID(),
      product_id: data.id,
      quantity: data.stock,
      type: "IN",
    });

    if (logError) throw new AppError(logError.message);
  }
  return responseSuccess(data, "Success create product", 201);
}
