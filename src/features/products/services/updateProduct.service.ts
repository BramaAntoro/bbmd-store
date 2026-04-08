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
  const { data, error } = await supabase
    .from("products")
    .update(payload)
    .eq("id", id)
    .select();

  if (error) throw new AppError(error.message);

  return responseSuccess(data[0], "successful data update", 201);
}
