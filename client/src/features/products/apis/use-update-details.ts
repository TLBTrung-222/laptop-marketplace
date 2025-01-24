import { axiosClient } from "@/lib/axios";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { ProductDetailInput } from "../schemas/product-detail";

export const useUpdateDetails = (detailId?: number) => {
    const queryClient = useQueryClient();

    const mutation = useMutation({
        mutationFn: async (data: ProductDetailInput) => {
            const response = await axiosClient.put(
                `/products/${detailId}/specifications`,
                data,
            );
            return response.data;
        },
        onError: (error) => {
            console.log("🚀 ~ error:", error);
            toast.error("Failed to update product details");
        },
        onSuccess: () => {
            toast.success("Product details updated successfully");
            queryClient.invalidateQueries({
                queryKey: ["details", detailId],
            });
        },
    });

    return mutation;
};
