import { axiosClient } from "@/lib/axios";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

export const useDeleteApproval = () => {
    const queryClient = useQueryClient();

    const mutation = useMutation({
        mutationFn: async (id: number) => {
            const response = await axiosClient.delete(`/approvals/${id}`);

            return response.data;
        },
        onError: (error) => {
            console.error(error);
            toast.error("An error occurred. Please try again");
        },
        onSuccess: () => {
            toast.success("Approval deleted successfully");
            queryClient.invalidateQueries({
                queryKey: ["approvals"],
            });
        },
    });

    return mutation;
};
