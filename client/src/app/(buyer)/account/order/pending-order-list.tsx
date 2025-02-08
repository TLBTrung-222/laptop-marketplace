"use client"
import { formatCurrency } from "../../../../features/home/component/format-currency";
import Image from "next/image";
import { useGetProduct } from "@/features/products/apis/use-get-product";
import { useGetOrderItems } from "@/features/order/apis/use-get-items";
import { useRouter } from "next/navigation";

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
    orderStatus: "pending" | "completed" | "delivering"; // Chỉ có thể là pending hoặc completed
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

export default function PendingOrderList({orders}:{orders: Order[]}){
    return(
        <div className="w-full">
            <h2 className="font-bold mb-2 mt-4">Pending Orders</h2>
            {
                orders.map((order:any, index:number)=>{
                    return(
                        <div key={order.id} className="mt-6 shadow-md shadow-blue-500 p-2 sm:w-[400px] md:w-[600px]">
                            <div>
                                <OrderHistoryItem order={order} index={index}/>
                            </div>
                            <hr/>
                        </div>
                    )
                })
            }
        </div>
    )
}

const OrderHistoryItem = ({order, index}:{order:any, index:number})=>{
    const {data} = useGetOrderItems(order.id)
    if(!data) return
    const orderItems = data[0].orderToProducts??[]
    if(!orderItems) return null
    return(
        <div>
            <p>Number: {index}</p>
            <p>Total Amount: ${formatCurrency(data[0].totalAmount)}</p>
            {
                orderItems.map((product:any)=>(
                    <ProductItem item={product} key={product.id}/>
                ))
            }
        </div>
    )
}

const ProductItem = ({item}:{item: any})=>{
    const {data} = useGetProduct(item.productId)
    if(!data) return null
    const router = useRouter()
    return(
        <>
            <div className={`flex p-2 gap-2 hover:cursor-pointer shadow-md mt-2 sm:w-full`}
                onClick={()=>router.push(`/product/${data.id}`)}
            >
                <Image
                    alt='Product'
                    height={50}
                    width={50}
                    src={`${data.images[0].image}`}
                />
                <div className="flex flex-col justify-between">
                    <div>
                        <p className="font-semibold">{data?.name}</p>
                        <p className="text-blue-600">${formatCurrency(data.price * item.quantity)} VND</p>
                    </div>
                </div>
            </div>

        </>
    )
}