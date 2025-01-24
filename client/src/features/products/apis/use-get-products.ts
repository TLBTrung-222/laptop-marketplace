import { axiosClient } from "@/lib/axios";
import { Product } from "@/types";
import { useQuery } from "@tanstack/react-query";

export const useGetProducts = () => {
    const query = useQuery({
        queryKey: ["products"],
        queryFn: async () => {
            const response = await axiosClient.get("/products");
            return response.data as Product[];
        },
    });
    return query;
};
