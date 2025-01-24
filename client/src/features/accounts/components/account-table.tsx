"use client";

import { DataTable } from "@/components/data-table";
import { TableSkeleton } from "@/components/table-skeleton";
import { useGetAccounts } from "../apis/get-accounts";
import { columns } from "./columns";

export const AccountTable = () => {
    const { data, isLoading } = useGetAccounts();

    if (isLoading) {
        return (
            <div className="mt-4">
                <TableSkeleton rows={5} columns={4} />
            </div>
        );
    }

    return (
        <div className="mt-4">
            <DataTable
                columns={columns}
                data={data || []}
                columnFilter="name"
            />
        </div>
    );
};
