import { axiosClient } from "@/lib/axios";
import { Brand } from "@/types";
import { useQuery } from "@tanstack/react-query";

export const useGetBrand = (id: number) => {
    const query = useQuery({
        queryKey: ["brand", id],
        queryFn: async () => {
            const response = await axiosClient.get(`/brands/${id}`);
            return response.data as Brand;
        },
    });
    return query;
};
