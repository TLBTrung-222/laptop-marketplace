"use client";

import { DataTable } from "@/components/data-table";
import { TableSkeleton } from "@/components/table-skeleton";
import { useGetProducts } from "../apis/use-get-products";
import { columns } from "./columns";

type Props = {
    tableRef?: React.RefObject<HTMLTableElement>;
};

export const ProductTable = ({ tableRef }: Props) => {
    const { data, isLoading } = useGetProducts();

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
                tableRef={tableRef}
            />
        </div>
    );
};
