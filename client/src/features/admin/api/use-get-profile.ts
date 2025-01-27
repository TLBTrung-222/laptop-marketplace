import { axiosClient } from "@/lib/axios";
import { Account } from "@/types";
import { useQuery } from "@tanstack/react-query";

export const useGetProfile = () => {
    const query = useQuery({
        queryKey: ["profile"],
        queryFn: async () => {
            const response = await axiosClient.get("/accounts/profile");
            const account = response.data as Account;
            if (account.avatar) {
                const avatar = await axiosClient.get("/accounts/avatar");
                account.avatar = avatar.data;
            }
            return account;
        },
    });

    return query;
};
