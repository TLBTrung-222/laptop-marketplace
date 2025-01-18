import { z } from "zod";

export const categorySchema = z.object({
    type: z.string().nonempty({
        message: "Type is required",
    }),
});

export type CategoryInput = z.infer<typeof categorySchema>;
