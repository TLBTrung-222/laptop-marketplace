"use client";

import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import { formatPrice } from "@/lib/utils";
import { Product } from "@/types";
import { ColumnDef } from "@tanstack/react-table";
import { DataTableColumnHeader } from "../../../components/table-header";
import { SellerCell } from "./seller-cell";
import { RowActions } from "./table-actions";

export const columns: ColumnDef<Product>[] = [
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
    },
    {
        accessorKey: "price",
        header: ({ column }) => (
            <DataTableColumnHeader column={column} title="Price" />
        ),
        cell: ({ row }) => formatPrice(row.original.price),
    },
    {
        accessorKey: "stockQuantity",
        header: ({ column }) => (
            <DataTableColumnHeader column={column} title="Stock" />
        ),
    },
    {
        accessorKey: "status",
        header: ({ column }) => (
            <DataTableColumnHeader column={column} title="Status" />
        ),
        cell: ({ row }) => {
            const status = row.original.status;

            return (
                <Badge variant={status} className="rounded-full">
                    {status}
                </Badge>
            );
        },
    },
    {
        accessorKey: "brand",
        header: ({ column }) => (
            <DataTableColumnHeader column={column} title="Brand" />
        ),
        cell: ({ row }) => row.original.brand.name,
        sortingFn: (a, b) => {
            const nameA = a.original.brand.name;
            const nameB = b.original.brand.name;
            const result = nameA.localeCompare(nameB);
            return nameA === nameB ? 0 : result > 0 ? 1 : -1;
        },
    },
    {
        accessorKey: "category",
        header: ({ column }) => (
            <DataTableColumnHeader column={column} title="Category" />
        ),
        cell: ({ row }) => row.original.category.type,
        sortingFn: (a, b) => {
            const typeA = a.original.category.type;
            const typeB = b.original.category.type;
            const result = typeA.localeCompare(typeB);
            return typeA === typeB ? 0 : result > 0 ? 1 : -1;
        },
    },
    {
        accessorKey: "seller",
        header: ({ column }) => (
            <DataTableColumnHeader column={column} title="Seller" />
        ),
        cell: ({ row }) => <SellerCell seller={row.original.seller} />,
    },
    {
        id: "actions",
        cell: ({ row }) => <RowActions id={row.original.id} />,
    },
];
