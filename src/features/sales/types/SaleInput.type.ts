import {z} from "zod";
import { saleSchema } from "../schema/sales.schema";

export type TypeSaleInput = z.infer<typeof saleSchema>[]