import { axiosClient } from "@/lib/axios";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { ProductInput } from "../schemas/product";

type ProductRequest = Omit<ProductInput, "categoryId" | "brandId"> & {
    categoryId: number;
    brandId: number;
};

export const useUpdateProduct = (id: number) => {
    const queryClient = useQueryClient();

    const mutation = useMutation({
        mutationFn: async (data: ProductRequest) => {
            const response = await axiosClient.put(`/products/${id}`, data);
            return response.data;
        },
        onError: (error) => {
            console.log("🚀 ~ error:", error);
            toast.error("Failed to update product");
        },
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ["products"],
            });

            toast.success("Product updated successfully");
        },
    });

    return mutation;
};
