import { axiosClient } from "@/lib/axios";
import { Approval } from "@/types";
import { useQuery } from "@tanstack/react-query";

export const useGetAdminApproval = (id: number) => {
    const query = useQuery({
        queryKey: ["admin-approval", id],
        queryFn: async () => {
            const response = await axiosClient.get(`/admin/approvals/${id}`);
            return response.data as Approval;
        },
    });
    return query;
};
