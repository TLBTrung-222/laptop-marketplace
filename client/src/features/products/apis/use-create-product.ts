import { axiosClient } from "@/lib/axios";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import { ProductInput } from "../schemas/product";

export const useCreateProduct = () => {
    const mutation = useMutation({
        mutationFn: async (data: ProductInput) => {
            const response = await axiosClient.post("/products", data);
        },
        onError: (error) => {
            console.log("🚀 ~ error:", error);
            toast.error("Failed to create product");
        },
        onSuccess: () => {
            toast.success("Product created successfully");
        },
    });

    return mutation;
};
