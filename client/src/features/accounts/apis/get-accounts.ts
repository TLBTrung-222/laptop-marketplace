import { axiosClient } from "@/lib/axios";
import { Account } from "@/types";
import { useQuery } from "@tanstack/react-query";

export const useGetAccounts = () => {
    const query = useQuery({
        queryKey: ["accounts"],
        queryFn: async () => {
            const response = await axiosClient.get("/accounts");
            return response.data as Account[];
        },
    });
    return query;
};
