import { axiosClient } from "@/lib/axios";
import { Order } from "@/types";
import { useQuery } from "@tanstack/react-query";

export const useGetAdminOrders = () => {
    const query = useQuery({
        queryKey: ["admin-orders"],
        queryFn: async () => {
            const response = await axiosClient.get(`/admin/orders`);
            return response.data as Order[];
        },
    });
    return query;
};
