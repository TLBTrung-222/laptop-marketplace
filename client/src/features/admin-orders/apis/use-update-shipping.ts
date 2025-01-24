import { axiosClient } from "@/lib/axios";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { ShippingInput } from "../schemas/shipping";

export const useUpdateShipping = (orderId: number) => {
    const queryClient = useQueryClient();

    const mutation = useMutation({
        mutationFn: async (data: ShippingInput) => {
            const response = await axiosClient.put(
                `/admin/orders/${orderId}/shipping`,
                data,
            );
            return response.data;
        },
        onError: (error) => {
            console.log(error);
            toast.error("Failed to update shipping status");
        },
        onSuccess: () => {
            toast.success("Updated shipping status successfully");
            queryClient.invalidateQueries({
                queryKey: ["admin-orders"],
            });
        },
    });

    return mutation;
};
