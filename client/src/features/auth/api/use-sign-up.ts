import { User } from "@/types";
import { SignUpFormValues } from "../schemas/sign-up";

import { axiosClient } from "@/lib/axios";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";

type SignUpValues = Omit<SignUpFormValues, "agreePolicy">;

export const useSignUp = () => {
    const mutation = useMutation({
        mutationFn: async (values: SignUpValues) => {
            const response = await axiosClient.post(
                "auth/seller/signup",
                values
            );
            return response.data as User;
        },
        onError: (error) => {
            console.log("🚀 ~ useLogin ~ error:", error);
            toast.error(error.response?.data.errors);
        },
    });

    return mutation;
};
