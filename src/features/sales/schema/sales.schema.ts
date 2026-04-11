import {z} from "zod";

export const saleSchema = z.object({
    product_id: z.string(),
    price: z.number(),
    cost: z.number(),
    quantity: z.number().min(1, "Minial 1 product")    
})

    