import { axiosClient } from "@/lib/axios";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { BrandInput } from "../schemas/brand";

export const useEditBrand = (id: number) => {
    const queryClient = useQueryClient();

    const mutation = useMutation({
        mutationFn: async (data: BrandInput) => {
            return await axiosClient.put(`/brands/${id}`, data);
        },
        onError: (error) => {
            console.error(error);
            toast.error("An error occurred while updating the brand");
        },
        onSuccess: () => {
            toast.success("Brand updated successfully");
            queryClient.invalidateQueries({
                queryKey: ["brand", id],
            });
            queryClient.invalidateQueries({
                queryKey: ["brands"],
            });
        },
    });

    return mutation;
};
