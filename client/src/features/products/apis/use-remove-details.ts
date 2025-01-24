import { axiosClient } from "@/lib/axios";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

export const useRemoveDetails = (id: string) => {
    const queryClient = useQueryClient();

    const mutation = useMutation({
        mutationFn: async () => {
            const response = await axiosClient.delete(
                `/products/${id}/specifications`,
            );
            return response.data;
        },
        onError: (error) => {
            console.log("🚀 ~ error:", error);
            toast.error("Failed to remove product details");
        },
        onSuccess: () => {
            toast.success("Product details removed successfully");
            queryClient.invalidateQueries({
                queryKey: ["details", id],
            });
        },
    });

    return mutation;
};
