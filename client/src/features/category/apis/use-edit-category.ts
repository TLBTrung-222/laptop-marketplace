import { axiosClient } from "@/lib/axios";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { CategoryInput } from "../schemas/category";

export const useEditCategory = (id: number) => {
    const queryClient = useQueryClient();

    const mutation = useMutation({
        mutationFn: async (data: CategoryInput) => {
            return await axiosClient.put(`/categories/${id}`, data);
        },
        onError: (error) => {
            console.error(error);
            toast.error("An error occurred while updating the category");
        },
        onSuccess: () => {
            toast.success("Category updated successfully");
            queryClient.invalidateQueries({
                queryKey: ["categories"],
            });
            queryClient.invalidateQueries({
                queryKey: ["category", id],
            });
        },
    });

    return mutation;
};
