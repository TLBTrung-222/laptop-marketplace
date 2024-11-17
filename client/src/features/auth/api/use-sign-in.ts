import { User } from "@/types";
import { SignInFormValues } from "../schemas/sign-in";

import { axiosClient } from "@/lib/axios";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";

export const useLogin = () => {
    const mutation = useMutation({
        mutationFn: async (values: SignInFormValues) => {
            const response = await axiosClient.post("/auth/signin", values);
            return response.data as User;
        },
        onError: (error) => {
            console.log("🚀 ~ useLogin ~ error:", error);
            toast.error(error.response?.data.errors);
        },
    });

    return mutation;
};
