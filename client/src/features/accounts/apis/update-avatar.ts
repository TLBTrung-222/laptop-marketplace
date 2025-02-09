import { axiosClient } from "@/lib/axios";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

export const useUpdateAvatarImages = () => {
    const queryClient = useQueryClient();

    const mutation = useMutation({
        mutationFn: async (data: FormData) => {
            const response = await axiosClient.put(
                `/accounts/avatar`,
                data,
                {
                    headers: {
                        "Content-Type": "multipart/form-data",
                    },
                },
            );
            return response.data;
        },
        onError: (error) => {
            console.log("🚀 ~ error:", error),
            toast.error("Failed to upload images");
        },
        onSuccess: (data) => {
            toast.info(data);
            toast.success("Images uploaded successfully");
        },
    });
    return mutation;
};
