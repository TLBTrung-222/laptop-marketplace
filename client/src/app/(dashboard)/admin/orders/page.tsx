import { OrderTable } from "@/features/admin-orders/components/order-table";

export default function OrdersPage() {
    return (
        <>
            <div className="flex items-center justify-between">
                <h1 className="text-2xl font-medium text-neutral-700">
                    Orders
                </h1>
            </div>
            <OrderTable />
        </>
    );
}
