import { axiosClient } from "@/lib/axios";
import { useQuery } from "@tanstack/react-query";

type PaymentMethod = "vnpay" | "cod";

interface Payment {
    id: number;
    paymentAmount: number;
    paymentStatus: number; // 0: Chưa thanh toán, 1: Đã thanh toán
    paymentMethod: PaymentMethod;
    paymentDate: string | null;
}

interface Shipping {
    id: number;
    shippingStatus: string; // Ví dụ: "delivering", "waiting to be packed", "completed"
    city: string;
    district: string;
    street: string;
    shippingDate: string;
    deliveryDate: string | null;
}

interface Order {
    id: number;
    totalAmount: number;
    orderStatus: "pending" | "completed"; // Chỉ có thể là pending hoặc completed
    orderDate: string;
    completionDate: string | null;
    payment: Payment;
    shipping: Shipping;
}

interface OrderResponse {
    isSuccess: boolean;
    data: Order[];
    errors: any; // Có thể thay `any` bằng `string | null` nếu chỉ chứa thông báo lỗi
}

export const useGetOrders = () => {
    const query = useQuery({
        queryKey: ["orders"],
        queryFn: async () => {
            const response = await axiosClient.get("/orders");
            return response.data as Order[];
        },
    });
    return query;
};
