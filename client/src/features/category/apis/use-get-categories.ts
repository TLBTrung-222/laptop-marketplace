import { axiosClient } from "@/lib/axios";
import { Category } from "@/types";
import { useQuery } from "@tanstack/react-query";

export const useGetCategories = () => {
    const query = useQuery({
        queryKey: ["categories"],
        queryFn: async () => {
            const response = await axiosClient.get("/categories");
            return response.data as Category[];
        },
    });
    return query;
};
