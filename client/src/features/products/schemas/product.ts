import { z } from "zod";

export const productSchema = z.object({
    brandId: z.string(),
    categoryId: z.string(),
    name: z.string().min(2, {
        message: "Name must be at least 2 characters",
    }),
    price: z.number().gt(0, {
        message: "Price must be greater than 0",
    }),
    description: z.string().min(1, {
        message: "Description is required",
    }),
    stockQuantity: z.number().min(0, {
        message: "Stock quantity must be greater than or equal to 0",
    }),
    status: z.string(),
});

export type ProductInput = z.infer<typeof productSchema>;
