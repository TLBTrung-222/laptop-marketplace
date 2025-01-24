"use client";

import { DataTable } from "@/components/data-table";
import { TableSkeleton } from "@/components/table-skeleton";
import { useGetAdminApprovals } from "../apis/use-get-approvals";
import { columns } from "./columns";

export const ApprovalTable = () => {
    const { data, isLoading } = useGetAdminApprovals();

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
