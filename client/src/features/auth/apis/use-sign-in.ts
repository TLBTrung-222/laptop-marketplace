import { axiosClient } from "@/lib/axios";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { SignInInput } from "../schemas/sign-in";

export const useSignIn = () => {
    const router = useRouter();

    const mutation = useMutation({
        mutationFn: async (data: SignInInput) => {
            await axiosClient.post("/auth/signin", data);
        },
        onError: (error) => {
            console.error(error);
            toast.error("Invalid credentials");
        },
        onSuccess: () => {
            router.push("/admin");
            toast.success("Welcome back");
        },
    });

    return mutation;
};
