import { axiosClient } from "@/lib/axios";
import { ProductDetail } from "@/types";
import { useQuery } from "@tanstack/react-query";

export const useGetDetails = (id: number) => {
    const query = useQuery({
        queryKey: ["detail", id],
        queryFn: async () => {
            const response = await axiosClient.get(
                `/products/${id}/specifications`,
            );
            return response.data as ProductDetail;
        },
    });
    return query;
};
