"use client";

import { Icons } from "@/components/icons";
import { Checkbox } from "@/components/ui/checkbox";
import { UserAvatar } from "@/components/user-avatar";
import { cn, formatPrice } from "@/lib/utils";
import { Order } from "@/types";
import { ColumnDef } from "@tanstack/react-table";
import { format, isBefore } from "date-fns";
import { DataTableColumnHeader } from "../../../components/table-header";
import { ShippingBadge } from "./shipping-badge";
import { RowActions } from "./table-actions";

export const columns: ColumnDef<Order>[] = [
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
        filterFn: (row, columnId, filterValue: string) => {
            return row.original.id.toString().includes(filterValue);
        },
    },
    {
        accessorKey: "buyer",
        header: ({ column }) => (
            <DataTableColumnHeader column={column} title="Customer" />
        ),
        cell: ({ row }) => {
            const { name, email, avatar } = row.original.buyer;
            return (
                <div className="flex items-center space-x-2">
                    <UserAvatar src={avatar} alt={name} className="size-8" />
                    <div className="text-xs">
                        <p className="text-sm font-semibold capitalize">
                            {name}
                        </p>
                        <p>{email}</p>
                    </div>
                </div>
            );
        },
        sortingFn: (rowA, rowB) => {
            return rowA.original.buyer.name.localeCompare(
                rowB.original.buyer.name,
            );
        },
    },

    {
        accessorKey: "city",
        header: ({ column }) => (
            <DataTableColumnHeader column={column} title="City" />
        ),
        cell: ({ row }) => row.original.shipping.city,
        sortingFn: (rowA, rowB) => {
            return rowA.original.shipping.city.localeCompare(
                rowB.original.shipping.city,
            );
        },
    },

    {
        accessorKey: "totalAmount",
        header: ({ column }) => (
            <DataTableColumnHeader column={column} title="Total" />
        ),
        cell: ({ row }) => formatPrice(row.original.totalAmount),
        sortingFn: (rowA, rowB) => {
            return rowA.original.totalAmount - rowB.original.totalAmount;
        },
    },
    {
        accessorKey: "payment",
        header: ({ column }) => (
            <DataTableColumnHeader column={column} title="Payment" />
        ),
        cell: ({ row }) => {
            const paymentMethod = row.original.payment.paymentMethod;
            const Icon = Icons[paymentMethod];
            const size = paymentMethod === "vnpay" ? "h-4" : "size-8";
            return <Icon className={cn(size)} />;
        },
        sortingFn: (rowA, rowB) => {
            return rowA.original.payment.paymentMethod.localeCompare(
                rowB.original.payment.paymentMethod,
            );
        },
    },
    {
        accessorKey: "Date",
        header: ({ column }) => (
            <DataTableColumnHeader column={column} title="Date" />
        ),
        cell: ({ row }) => format(row.original.orderDate, "dd/MM/yyyy"),
        sortingFn: (rowA, rowB) => {
            return isBefore(rowA.original.orderDate, rowB.original.orderDate)
                ? -1
                : 1;
        },
    },
    {
        accessorKey: "shipping",
        header: ({ column }) => (
            <DataTableColumnHeader column={column} title="Shipping" />
        ),
        cell: ({ row }) => {
            const status = row.original.shipping.shippingStatus.split(" ")[0];

            return <ShippingBadge status={status} />;
        },
        sortingFn: (rowA, rowB) => {
            return rowA.original.shipping.shippingStatus.localeCompare(
                rowB.original.shipping.shippingStatus,
            );
        },
    },

    {
        id: "actions",
        header: "Details",
        cell: ({ row }) => <RowActions order={row.original} />,
    },
];
