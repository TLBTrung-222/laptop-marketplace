import { z } from "zod";

export const productDetailSchema = z.object({
    cpu: z.string().min(1, {
        message: "CPU is required",
    }),
    ram: z.string().min(1, {
        message: "RAM is required",
    }),
    storage: z.string().min(1, {
        message: "Storage is required",
    }),
    gpu: z.string().min(1, {
        message: "GPU is required",
    }),
    display: z.string().min(1, {
        message: "Display is required",
    }),
    port: z.string().min(1, {
        message: "Port is required",
    }),
    keyboard: z.string().min(1, {
        message: "Keyboard is required",
    }),
    lan: z.string().min(1, {
        message: "LAN is required",
    }),
    wifi: z.string().min(1, {
        message: "Wifi is required",
    }),
    bluetooth: z.string().min(1, {
        message: "Bluetooth is required",
    }),
    webcam: z.string().min(1, {
        message: "Webcam is required",
    }),
    os: z.string().min(1, {
        message: "OS is required",
    }),
    battery: z.string().min(1, {
        message: "Battery is required",
    }),
    weight: z.number().min(0, {
        message: "Weight must be greater than or equal to 0",
    }),
    color: z.string().min(1, {
        message: "Color is required",
    }),
    dimensions: z.string().min(1, {
        message: "Dimensions is required",
    }),
});

export type ProductDetailInput = z.infer<typeof productDetailSchema>;
