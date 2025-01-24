import { axiosClient } from "@/lib/axios";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { CategoryInput } from "../schemas/category";

export const useCreateCategory = () => {
    const queryClient = useQueryClient();

    const mutation = useMutation({
        mutationFn: async (data: CategoryInput) => {
            return await axiosClient.post(`/categories`, data);
        },
        onError: (error) => {
            console.error(error);
            toast.error("An error occurred while creating the category");
        },
        onSuccess: () => {
            toast.success("Category created successfully");
            queryClient.invalidateQueries({
                queryKey: ["categories"],
            });
        },
    });

    return mutation;
};
