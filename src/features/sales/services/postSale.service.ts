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

  if (errorSales) throw new AppError(errorSales.message);

  const salesItems = data.map((item) => ({
    sale_id: sales.id,
    product_id: item.product_id,
    price: item.price,
    cost: item.cost,
    quantity: item.quantity,
  }));

  const { error: errorSalesItem } = await supabase
    .from("sales_items")
    .insert(salesItems);

  if (errorSalesItem) throw new AppError(errorSalesItem.message);

  for (const item of data) {
    const { data: product, error: errorFetch } = await supabase
      .from("products")
      .select("stock")
      .eq("id", item.product_id)
      .single();

    if (errorFetch) throw new AppError(errorFetch.message);

    const { error: errorUpdate } = await supabase
      .from("products")
      .update({ stock: product.stock - item.quantity })
      .eq("id", item.product_id);

    if (errorUpdate) throw new AppError(errorUpdate.message);

    const { error: errorLog } = await supabase.from("stock_logs").insert({
      id: crypto.randomUUID(),
      product_id: item.product_id,
      quantity: item.quantity,
      type: "OUT",
    });

    if (errorLog) throw new AppError(errorLog.message);
  }

  return responseSuccess(null, "Success create sale", 201);
}
