import { productSchema } from "../schema/products.schema";
import postProductService from "../services/postProduct.service";
import { TypeProductInput } from "../types/ProductInput.type";

export default function postProductAction(products: TypeProductInput) {
  const schema = productSchema.parse({
    name: products.name,
    sku: products.sku,
    barcode: products.barcode,
    price: products.price,
    cost: products.cost,
    stock: products.stock,
  });

  return postProductService(schema)
}
