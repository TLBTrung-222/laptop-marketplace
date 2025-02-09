import { axiosClient } from "@/lib/axios";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { ProductDetailInput } from "../schemas/product-detail";
import { Order } from "@/types";

export const useCreateOrder = (id: number) => {
    const queryClient = useQueryClient();
    const router = useRouter();

    const mutation = useMutation({
        mutationFn: async (data:{}) => {
            const returnUrl =
                typeof window !== "undefined"
                    ? `${window.location.origin}/account/order/order-success`
                    : "";
            const response = await axiosClient.post(
                `/orders`,
                {
                    ...data,
                    returnUrl
                }
            );
            return response.data;
        },
        onError: (error) => {
            console.log("🚀 ~ error:", error);
            toast.error("Failed to create order");
        },
        onSuccess: () => {
            toast.success("Order created successfully");
            queryClient.invalidateQueries({
                queryKey: ["order", id],
            });
            router.refresh();
        },
    });

    return mutation;
};
