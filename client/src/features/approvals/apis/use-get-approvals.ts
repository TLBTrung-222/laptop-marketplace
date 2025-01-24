import { axiosClient } from "@/lib/axios";
import { Approval } from "@/types";
import { useQuery } from "@tanstack/react-query";

export const useGetApprovals = () => {
    const query = useQuery({
        queryKey: ["approvals"],
        queryFn: async () => {
            const response = await axiosClient.get("/approvals");
            return response.data as Approval[];
        },
    });
    return query;
};
