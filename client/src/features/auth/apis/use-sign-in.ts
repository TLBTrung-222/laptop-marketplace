import { axiosClient } from "@/lib/axios";
import { Account } from "@/types";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { SignInInput } from "../schemas/sign-in";

export const useSignIn = () => {
    const router = useRouter();

    const mutation = useMutation({
        mutationFn: async (data: SignInInput) => {
            const result = await axiosClient.post("/auth/signin", data);
            return result.data as Account;
        },
        onError: (error) => {
            console.error(error);
            toast.error("Invalid credentials");
        },
        onSuccess: (data) => {
            toast.success("Welcome back");

            if (data.role.roleName === "admin") {
                router.push("/admin");
            }

            if (data.role.roleName === "seller") {
                router.push("/seller");
            }
        },
    });

    return mutation;
};
