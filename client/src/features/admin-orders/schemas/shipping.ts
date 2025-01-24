import { z } from "zod";

export const shippingSchema = z.object({
    status: z.string(),
});

export type ShippingInput = z.infer<typeof shippingSchema>;
