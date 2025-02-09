import { axiosClient } from "@/lib/axios";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

export const useCreateRatings = (id: number) => {
    const queryClient = useQueryClient();
    const router = useRouter();

    const mutation = useMutation({
        mutationFn: async (data:any) => {
            const form = new FormData()
            if (data.comment){
                form.append('comment', data.comment);
            }
            form.append('ratingStar', data.ratingStar)
            const response = await axiosClient.post(
                `/products/${id}/ratings`,
                data,
            );
            return response.data;
        },
        onError: (error) => {
            console.log("🚀 ~ error:", error);
            toast.error("Failed to create ratings");
        },
        onSuccess: () => {
            toast.success("Ratings created successfully");
            queryClient.invalidateQueries({
                queryKey: ["ratings", id],
            });
            router.refresh();
        },
    });

    return mutation;
};
