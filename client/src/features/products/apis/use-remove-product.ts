import { axiosClient } from "@/lib/axios";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

export const useRemoveProduct = (id: number) => {
    const queryClient = useQueryClient();

    const mutation = useMutation({
        mutationFn: async () => {
            const response = await axiosClient.delete(`/products/${id}`);
            return response.data;
        },
        onError: (error) => {
            console.log("🚀 ~ error:", error);
            toast.error("Failed to remove product");
        },
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ["products"],
            });

            toast.success("Product removed successfully");
        },
    });

    return mutation;
};
