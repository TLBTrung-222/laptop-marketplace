import { axiosClient } from "@/lib/axios";
import { Product } from "@/types";
import { useQuery } from "@tanstack/react-query";

export const useGetProduct = (id?: number) => {
    const query = useQuery({
        queryKey: ["product", id],
        enabled: !!id,
        queryFn: async () => {
            const response = await axiosClient.get(`/products/${id}`);
            return response.data as Product;
        },
    });
    return query;
};
