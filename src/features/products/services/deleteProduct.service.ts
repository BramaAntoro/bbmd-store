import { AppError } from "@/lib/errors/AppError";
import responseSuccess from "@/lib/responses/responseSuccess";
import { createClient } from "@/lib/supabase/server";
import { TypeResponseSuccess } from "@/types/responseSuccess.type";

export default async function deleteProductService(
  id: string,
): Promise<TypeResponseSuccess<null>> {
  const supabase = await createClient();

  const { error } = await supabase.from("products").delete().eq("id", id);

  if (error) throw new AppError(error.message);

  return responseSuccess(null, "Product successfully deleted");
}
