import { axiosClient } from "@/lib/axios";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

export const useLogout = () => {
    const router = useRouter();

    const mutation = useMutation({
        mutationFn: async () => {
            return await axiosClient.post("/auth/signout");
        },
        onError: (error) => {
            console.log("🚀 ~ useLogout ~ error:", error);
            toast.error("Failed to logout");
        },
        onSuccess: () => {
            router.push("/");
        },
    });
    return mutation;
};
