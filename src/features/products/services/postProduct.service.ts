import { createClient } from "@/lib/supabase/server";
import { AppError } from "@/lib/errors/AppError";
import responseSuccess from "@/lib/responses/responseSuccess";
import { TypeResponseSuccess } from "@/types/responseSuccess.type";
import { TypeProductInput } from "../types/ProductInput.type";

export default async function postProductService(product: TypeProductInput): Promise<TypeResponseSuccess<TypeProductInput>>{
    const supabase = await createClient();

    const {data, error} = await supabase
        .from("products")
        .insert(product)
        .select()
        .single();
    
    if(error) throw new AppError("Failed Create product");

    return responseSuccess(data, "Success create product", 201);
}