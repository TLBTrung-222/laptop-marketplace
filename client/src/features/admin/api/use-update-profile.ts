import { axiosClient } from "@/lib/axios";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { ProfileInput } from "../schemas/profile";

export const useEditProfile = (id?: number) => {
    const queryClient = useQueryClient();
    const mutation = useMutation({
        mutationFn: async (data: ProfileInput) => {
            const response = await axiosClient.put(`/accounts/${id}`, data);
            return response.data;
        },
        onError: (error) => {
            console.log("🚀 ~ error:", error);
            toast.error("Failed to update profile");
        },
        onSuccess: () => {
            toast.success("Profile updated successfully");
            queryClient.invalidateQueries({
                queryKey: ["profile"],
            });
        },
    });
    return mutation;
};
