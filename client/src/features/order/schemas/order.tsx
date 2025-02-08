import { z } from "zod";

export const orderSchema = z.object({
   orderItems: z.array(
    z.object({
        id: z.number().int().positive(),
        quantity: z.number().int().positive()
    })
   ),
   shippingInfors: z.object({
    city: z.string().min(1,"City is required"),
    district: z.string().min(1,"District is required"),
    street: z.string().min(1,"Street is required"),
   }),
   paymentMethod: z.enum(["vnpay", "cod"])

});

export type OrderInput = z.infer<typeof orderSchema>;