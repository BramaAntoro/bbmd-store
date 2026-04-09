import { createClient } from "@/lib/supabase/server";
import { TypeResponseSuccess } from "@/types/responseSuccess.type";
import { TypeSaleInput } from "../types/SaleInput.type";
import getUserId from "@/lib/auth/getUserId.util";
import { AppError } from "@/lib/errors/AppError";
import responseSuccess from "@/lib/responses/responseSuccess";

export default async function postSaleService(
  data: TypeSaleInput,
): Promise<TypeResponseSuccess<null>> {
  const supabase = await createClient();

  const userId = await getUserId();

  const total = data.reduce((acc, item) => acc + item.price * item.quantity, 0);

  const dataSale = { user_id: userId, total };

  const { data: sales, error: errorSales } = await supabase
    .from("sales")
    .insert(dataSale)
    .select("id")
    .single();

  const salesItem = { sale_id: sales?.id, ...data };

  if (errorSales) throw new AppError(errorSales.message);

  const { error: errorSalesItem } = await supabase
    .from("sales_items")
    .insert(salesItem);

  if (errorSalesItem) throw new AppError(errorSalesItem.message);

  return responseSuccess(null, "Success create sale", 201)
}