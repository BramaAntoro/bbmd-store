import { TypeResponseSuccess } from "@/types/responseSuccess.type";
import { TypeProductInput } from "../types/ProductInput.type";
import { createClient } from "@/lib/supabase/server";
import { AppError } from "@/lib/errors/AppError";
import responseSuccess from "@/lib/responses/responseSuccess";

export default async function updateProductService(
  dataUpdate: TypeProductInput,
): Promise<TypeResponseSuccess<TypeProductInput>> {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("product")
    .update(dataUpdate)
    .eq("id", dataUpdate.id)
    .select();

  if (error) throw new AppError(error.message);

  return responseSuccess(data[0], "successful data update", 201);
}
