import { axiosClient } from "@/lib/axios";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { OrderInput } from "../schemas/order";
import { useRouter } from "next/navigation";

export const useCreateOrder = () => {
    const queryClient = useQueryClient();
    const router = useRouter()
    const mutation = useMutation({

        mutationFn: async (data:{ orderItems: any[]; shippingInfors: any; paymentMethod: string }) => {
            const form = new FormData();
            form.append("orderItems", JSON.stringify(data.orderItems));
            form.append("shippingInfors", JSON.stringify(data.shippingInfors));
            form.append("paymentMethod", data.paymentMethod);
            const response = await axiosClient.post(`/orders/`, {
                ...data,
                returnUrl:`${window.location.origin}/`
            });
            return response.data as any;
        },
        onError: (error) => {
            console.error(error);
            toast.error("An error occurred while creating the order");
        },
        onSuccess: (data) => {
            toast.success("Order created successfully");
            if (data.paymentUrl){
                window.location.href = data.paymentUrl;
            } else{
                router.push("/")
            }
            queryClient.invalidateQueries({
                queryKey: ["orders"],
            });
        },
    });

    return mutation;
};
