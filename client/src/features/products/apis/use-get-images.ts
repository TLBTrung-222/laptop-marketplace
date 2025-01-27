import { axiosClient } from "@/lib/axios";
import { useQuery } from "@tanstack/react-query";

export const useGetImages = (productId: number) => {
    const query = useQuery({
        queryKey: ["products-images", productId],
        queryFn: async () => {
            const response = await axiosClient.get(
                `/products/${productId}/images`,
            );
            return response.data;
        },
    });
    return query;
};
