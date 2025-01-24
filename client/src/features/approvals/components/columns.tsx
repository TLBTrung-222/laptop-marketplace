"use client";

import { Checkbox } from "@/components/ui/checkbox";
import { formatPrice } from "@/lib/utils";
import { Approval } from "@/types";
import { ColumnDef } from "@tanstack/react-table";
import { format, isBefore } from "date-fns";
import { DataTableColumnHeader } from "../../../components/table-header";
import { ApprovalBadge } from "./approval-badge";
import { RowActions } from "./table-actions";

export const columns: ColumnDef<Approval>[] = [
    {
        id: "select",
        header: ({ table }) => (
            <Checkbox
                checked={
                    table.getIsAllPageRowsSelected() ||
                    (table.getIsSomePageRowsSelected() && "indeterminate")
                }
                onCheckedChange={(value) =>
                    table.toggleAllPageRowsSelected(!!value)
                }
                aria-label="Select all"
                className="border-admin data-[state=checked]:bg-admin"
            />
        ),
        cell: ({ row }) => (
            <Checkbox
                checked={row.getIsSelected()}
                onCheckedChange={(value) => row.toggleSelected(!!value)}
                aria-label="Select row"
                className="border-admin data-[state=checked]:bg-admin"
            />
        ),
        enableSorting: false,
        enableHiding: false,
    },
    {
        accessorKey: "id",
        header: "ID",
    },
    {
        accessorKey: "name",
        header: ({ column }) => (
            <DataTableColumnHeader column={column} title="Name" />
        ),
        cell: ({ row }) => row.original.product.name,
        filterFn: (row, columnId, filterValue: string) => {
            return row.original.product.name
                .toLowerCase()
                .includes(filterValue.toLowerCase());
        },
        sortingFn: (rowA, rowB) => {
            return rowA.original.product.name.localeCompare(
                rowB.original.product.name,
            );
        },
    },
    {
        accessorKey: "price",
        header: ({ column }) => (
            <DataTableColumnHeader column={column} title="Price" />
        ),
        cell: ({ row }) => formatPrice(row.original.product.price),
        sortingFn: (rowA, rowB) => {
            return rowA.original.product.price - rowB.original.product.price;
        },
    },
    {
        accessorKey: "Stock",
        header: ({ column }) => (
            <DataTableColumnHeader column={column} title="Stock" />
        ),
        cell: ({ row }) => row.original.product.stockQuantity,
        sortingFn: (rowA, rowB) => {
            return (
                rowA.original.product.stockQuantity -
                rowB.original.product.stockQuantity
            );
        },
    },
    {
        accessorKey: "Date",
        header: ({ column }) => (
            <DataTableColumnHeader column={column} title="Date" />
        ),
        cell: ({ row }) => format(row.original.submissionDate, "dd/MM/yyyy"),
        sortingFn: (rowA, rowB) => {
            return isBefore(
                rowA.original.submissionDate,
                rowB.original.submissionDate,
            )
                ? -1
                : 1;
        },
    },
    {
        accessorKey: "status",
        header: ({ column }) => (
            <DataTableColumnHeader column={column} title="Status" />
        ),
        cell: ({ row }) => {
            const status = row.original.approvalStatus;

            return <ApprovalBadge status={status} />;
        },
        sortingFn: (rowA, rowB) => {
            return rowA.original.approvalStatus.localeCompare(
                rowB.original.approvalStatus,
            );
        },
    },
    {
        id: "actions",
        cell: ({ row }) => <RowActions id={row.original.id} />,
    },
];
