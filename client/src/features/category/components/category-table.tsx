"use client";

import { DataTable } from "@/components/data-table";
import { TableSkeleton } from "@/components/table-skeleton";
import { useGetCategories } from "../apis/use-get-categories";
import { columns } from "./columns";

type Props = {
    tableRef?: React.RefObject<HTMLTableElement>;
};

export const CategoryTable = ({ tableRef }: Props) => {
    const { data, isLoading } = useGetCategories();

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
                columnFilter="type"
                tableRef={tableRef}
            />
        </div>
    );
};
