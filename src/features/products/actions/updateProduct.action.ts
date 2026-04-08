"use server"

import updateProductService from "../services/updateProduct.service";
import { TypeProductUpdate } from "../types/ProductInput.type";

export default async function updateProductAction(data: TypeProductUpdate) {
    return await updateProductService(data);
}