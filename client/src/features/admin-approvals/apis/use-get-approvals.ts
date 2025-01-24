import { axiosClient } from "@/lib/axios";
import { Approval } from "@/types";
import { useQuery } from "@tanstack/react-query";

export const useGetAdminApprovals = () => {
    const query = useQuery({
        queryKey: ["admin-approvals"],
        queryFn: async () => {
            const response = await axiosClient.get("/admin/approvals");
            return response.data as Approval[];
        },
    });
    return query;
};
