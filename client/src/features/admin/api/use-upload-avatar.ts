import { axiosClient } from "@/lib/axios";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

export const useUploadAvatar = () => {
    const queryClient = useQueryClient();

    const mutation = useMutation({
        mutationFn: async (data: FormData) => {
            const response = await axiosClient.post("/accounts/avatar", data, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            });

            return response.data;
        },
        onError: (error) => {
            console.log("🚀 ~ error:", error);
            toast.error("Failed to upload avatar");
        },
        onSuccess: () => {
            toast.success("Avatar uploaded successfully");
            queryClient.invalidateQueries({
                queryKey: ["profile"],
            });
        },
    });
    return mutation;
};
