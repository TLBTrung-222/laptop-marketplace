import { axiosClient } from "@/lib/axios";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

export const useUploadImages = (id: number) => {
    const queryClient = useQueryClient();

    const mutation = useMutation({
        mutationFn: async (data: FormData) => {
            const response = await axiosClient.post(
                `/products/${id}/images`,
                data,
                {
                    headers: {
                        "Content-Type": "multipart/form-data",
                    },
                },
            );
            return response.data as string[];
        },
        onError: (error) => {
            console.log("🚀 ~ error:", error),
                toast.error("Failed to upload images");
        },
        onSuccess: (data) => {
            queryClient.invalidateQueries({
                queryKey: ["product", id],
            });
            toast.success("Images uploaded successfully");
        },
    });
    return mutation;
};
