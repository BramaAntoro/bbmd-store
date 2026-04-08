import updateProductService from "../services/updateProduct.service";
import { TypeProductInput } from "../types/ProductInput.type";

export default async function updateProductAction(data: TypeProductInput) {
    return await updateProductService(data);
}