// export type TypeProductInput = {
//   name: string;
//   sku: string;
//   barcode: string;
//   price: number;
//   cost: number;
//   stock: number;
// };

import z from "zod";
import { productSchema } from "../schema/products.schema";

export type TypeProductInput = z.infer<typeof productSchema> & {id: string};