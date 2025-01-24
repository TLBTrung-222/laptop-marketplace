import { axiosClient } from "@/lib/axios";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { BrandInput } from "../schemas/brand";

export const useCreateBrand = () => {
    const queryClient = useQueryClient();

    const mutation = useMutation({
        mutationFn: async (data: BrandInput) => {
            return await axiosClient.post(`/brands`, data);
        },
        onError: (error) => {
            console.error(error);
            toast.error("An error occurred while creating the brand");
        },
        onSuccess: () => {
            toast.success("Brand created successfully");
            queryClient.invalidateQueries({
                queryKey: ["brands"],
            });
        },
    });

    return mutation;
};
