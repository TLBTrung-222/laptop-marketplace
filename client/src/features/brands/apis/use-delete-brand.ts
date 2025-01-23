import { axiosClient } from "@/lib/axios";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

export const useDeleteBrand = (id: number) => {
    const queryClient = useQueryClient();

    const mutation = useMutation({
        mutationFn: async () => {
            return await axiosClient.delete(`/brands/${id}`);
        },
        onError: (error) => {
            console.error(error);
            toast.error("An error occurred while deleting the brand");
        },
        onSuccess: () => {
            toast.success("Brand deleted successfully");
            queryClient.invalidateQueries({
                queryKey: ["brands"],
            });
        },
    });

    return mutation;
};
