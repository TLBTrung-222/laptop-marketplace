"use client";

import { DataTable } from "@/components/data-table";
import { TableSkeleton } from "@/components/table-skeleton";
import { useGetAdminOrders } from "../apis/use-get-admin-orders";
import { columns } from "./columns";

export const OrderTable = () => {
    const { data, isLoading } = useGetAdminOrders();

    if (isLoading) {
        return (
            <div className="mt-4">
                <TableSkeleton rows={5} columns={4} />
            </div>
        );
    }

    return (
        <div className="mt-4">
            <DataTable columns={columns} data={data || []} columnFilter="id" />
        </div>
    );
};
