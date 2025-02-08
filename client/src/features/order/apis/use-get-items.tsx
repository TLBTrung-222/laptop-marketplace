import { axiosClient } from "@/lib/axios";
import { useQuery } from "@tanstack/react-query";

export const useGetOrderItems = (orderId: any) => {
    const query = useQuery({
        queryKey: ["order-items", orderId],
        queryFn: async () => {
            const response = await axiosClient.get(
                `/orders/${orderId}/items`,
            );
            return response.data;
        },
    });
    return query;
};
