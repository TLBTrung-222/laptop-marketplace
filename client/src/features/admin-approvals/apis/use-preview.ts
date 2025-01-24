import { axiosClient } from "@/lib/axios";
import { Approval } from "@/types";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

export const usePreviewApproval = (id: number) => {
    const queryClient = useQueryClient();

    const mutation = useMutation({
        mutationFn: async (status: Approval["approvalStatus"]) => {
            const response = await axiosClient.put(`/admin/approvals/${id}`, {
                status,
            });

            return response.data;
        },
        onError: (error) => {
            console.error(error);
            toast.error("Failed to update approval status");
        },
        onSuccess: () => {
            toast.success("Approval status updated successfully");
            queryClient.invalidateQueries({
                queryKey: ["admin-approvals"],
            });
        },
    });

    return mutation;
};
