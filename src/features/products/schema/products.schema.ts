import {z} from "zod";

export const productSchema = z.object({
    name: z.string().min(1, "Nama produk harus diisi"),
    sku: z.string().optional(),
    barcode: z.string().min(1, "Barcode harus diisi"),
    price: z.coerce.number().min(5_00, "Harga minimal Rp 500"),
    cost: z.coerce.number().min(1_000, "Biaya/Modal minimal Rp 1.000"),
    stock: z.coerce.number().min(1, "Stock minimal 1"),
})

// export type ProductInput = z.infer<typeof productSchema>;