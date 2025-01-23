import { axiosClient } from "@/lib/axios";
import { Account } from "@/types";
import { useQuery } from "@tanstack/react-query";

export const useGetProfile = () => {
    const query = useQuery({
        queryKey: ["profile"],
        queryFn: async () => {
            const response = await axiosClient.get("/accounts/profile");
            return response.data as Account;
        },
    });

    return query;
};
