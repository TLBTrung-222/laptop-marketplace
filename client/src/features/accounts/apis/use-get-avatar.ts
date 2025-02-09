import { axiosClient } from "@/lib/axios";
import { useQuery } from "@tanstack/react-query";

export const useGetAvatar = () => {
    const query = useQuery({
        queryKey: ["avatar"],
        queryFn: async () => {
            const response = await axiosClient.get("/accounts/avatar");
            return response.data;
        },
    });
    return query;
};
