import { axiosClient } from "@/lib/axios";
import { Category } from "@/types";
import { useQuery } from "@tanstack/react-query";

export const useGetCategory = (id: number) => {
    const query = useQuery({
        queryKey: ["category", id],
        queryFn: async () => {
            const response = await axiosClient.get(`/categories/${id}`);
            return response.data as Category;
        },
    });
    return query;
};
