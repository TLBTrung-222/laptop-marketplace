import { axiosClient } from "@/lib/axios";
import { Account } from "@/types";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import { SignUpInput } from "../schemas/sign-up";

export const useSignUp = ()=>{ 
    const mutation = useMutation({
        mutationFn: async (data: SignUpInput) => {
            const formData = new FormData();
            formData.append("name", data.name)
            formData.append("password", data.password)
            formData.append("phone", data.phoneNumber)
            formData.append("email", data.email)
            const result = await axiosClient.post("/auth/buyer/signup", formData);  // Đổi thành endpoint signup
            return result.data as Account;
        },
        onError: (error) => {
            console.error(error);
            toast.error(error.message || "An error occurred during sign-up");  // Cập nhật thông báo lỗi cho đăng ký
        },
        onSuccess: (data) => {
            toast.success("Account created successfully!");  // Thông báo thành công khi đăng ký
        },
    });

    return mutation;
}