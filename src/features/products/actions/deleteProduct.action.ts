"use server"

import deleteProductService from "../services/deleteProduct.service";

export default async function deleteProductAction(id: string){
    return await deleteProductService(id);
}