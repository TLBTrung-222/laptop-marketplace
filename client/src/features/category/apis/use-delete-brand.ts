import { axiosClient } from "@/lib/axios";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

export const useDeleteCategory = (id: number) => {
    const queryClient = useQueryClient();

    const mutation = useMutation({
        mutationFn: async () => {
            return await axiosClient.delete(`/categories/${id}`);
        },
        onError: (error) => {
            console.error(error);
            toast.error("An error occurred while deleting the category");
        },
        onSuccess: () => {
            toast.success("Category deleted successfully");
            queryClient.invalidateQueries({
                queryKey: ["categories"],
            });
        },
    });

    return mutation;
};
