import { axiosClient } from "@/lib/axios";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { ProductDetailInput } from "../schemas/product-detail";

export const useCreateDetails = (id: number) => {
    const queryClient = useQueryClient();
    const router = useRouter();

    const mutation = useMutation({
        mutationFn: async (data: ProductDetailInput) => {
            const response = await axiosClient.post(
                `/products/${id}/specifications`,
                data,
            );
            return response.data;
        },
        onError: (error) => {
            console.log("🚀 ~ error:", error);
            toast.error("Failed to create product details");
        },
        onSuccess: () => {
            toast.success("Product details created successfully");
            queryClient.invalidateQueries({
                queryKey: ["details", id],
            });
            router.refresh();
        },
    });

    return mutation;
};
