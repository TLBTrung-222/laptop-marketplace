import { z } from "zod";

export const brandSchema = z.object({
    name: z.string().min(1, {
        message: "Name is required",
    }),
});

export type BrandInput = z.infer<typeof brandSchema>;
