import { formatCurrency } from "@/features/home/component/format-currency"
import { useGetOrderItems } from "@/features/order/apis/use-get-items"
import { useGetProduct } from "@/features/products/apis/use-get-product"
import { Order } from "@/types"
import Image from "next/image"
import { useRouter } from "next/navigation"

export default function DeliveringOrder({orders}:{orders: Order[]}) {
    const deliveringOrders = orders.filter(order => order.orderStatus === 'delivering')
    if (!deliveringOrders || deliveringOrders.length <= 0) return (<p>No delivering orders</p>)

    return (
        <div className="w-full">
            <h2 className="font-bold text-xl mb-4 mt-6">Delivering Orders</h2>
            {deliveringOrders.map((order, index) => (
                <div key={order.id} className="mt-6 p-4 bg-white rounded-lg shadow-lg">
                    <OrderHistoryItem order={order} index={index} />
                    <hr className="my-4 border-t-2 border-gray-200" />
                </div>
            ))}
        </div>
    )
}

const OrderHistoryItem = ({order, index}:{order:any, index:number}) => {
    const {data} = useGetOrderItems(order.id)
    if (!data) return null
    const orderItems = data[0].orderToProducts ?? []
    if (!orderItems) return null

    return (
        <div className="space-y-4">
            <p className="text-lg font-semibold">Order Number: {index + 1}</p>
            <p className="text-xl font-bold text-blue-600">Total Amount: {formatCurrency(data[0].totalAmount)}</p>
            
            {orderItems.map((product: any) => (
                <ProductItem item={product} key={product.id} />
            ))}
        </div>
    )
}

const ProductItem = ({item}: {item: any}) => {
    const {data} = useGetProduct(item.productId)
    const router = useRouter()
    if (!data) return null

    return (
        <div
            className="flex p-4 gap-4 bg-gray-100 rounded-lg shadow-md hover:shadow-xl transition-all cursor-pointer"
            onClick={() => router.push(`/product/${data.id}`)}
        >
            <Image
                alt="Product"
                height={80}
                width={80}
                src={`${data.images[0].image}`}
                className="rounded-md"
            />
            <div className="flex flex-col justify-between">
                <p className="font-semibold text-lg">{data?.name}</p>
                <p className="text-blue-600 text-sm">{formatCurrency(data.price * item.quantity)} VND</p>
            </div>
        </div>
    )
}
