import { axiosClient } from "@/lib/axios";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

export const useLogout = () => {
    const router = useRouter();
    const queryClient = useQueryClient();

    const mutation = useMutation({
        mutationFn: async () => {
            return await axiosClient.post("/auth/signout");
        },
        onError: (error) => {
            console.log("🚀 ~ useLogout ~ error:", error);
            toast.error("Failed to logout");
        },
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ["profile"],
            });
            router.push("/sign-in");
        },
    });
    return mutation;
};
