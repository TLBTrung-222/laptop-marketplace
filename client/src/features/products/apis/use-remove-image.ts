import { axiosClient } from "@/lib/axios";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

export const useRemoveImage = (productId: number) => {
    const queryClient = useQueryClient();

    const mutation = useMutation({
        mutationFn: async (key: string) => {
            const response = await axiosClient.delete("/products/images", {
                data: { key },
            });
            return response.data;
        },
        onError: (error) => {
            console.log("🚀 ~ useRemoveImage ~ error:", error);
            toast.error("Failed to remove image");
        },
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ["product", productId],
            });
            toast.success("Image removed successfully");
        },
    });
    return mutation;
};
