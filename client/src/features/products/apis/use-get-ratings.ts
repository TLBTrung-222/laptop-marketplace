import { axiosClient } from "@/lib/axios";
import { useQuery } from "@tanstack/react-query";

export const useGetComments = (productId: number) => {
    const query = useQuery({
        queryKey: ["products-ratings", productId],
        queryFn: async () => {
            const response = await axiosClient.get(
                `/products/${productId}/ratings`,
            );
            return response.data;
        },
    });
    return query;
};
