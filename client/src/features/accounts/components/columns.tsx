"use client";

import { Checkbox } from "@/components/ui/checkbox";
import { UserAvatar } from "@/components/user-avatar";
import { cn, normalizeString } from "@/lib/utils";
import { Account } from "@/types";
import { ColumnDef } from "@tanstack/react-table";
import { DataTableColumnHeader } from "../../../components/table-header";
import { ICONS_ROLE } from "../constants";

export const columns: ColumnDef<Account>[] = [
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
        cell: ({ row }) => {
            return (
                <div className="flex items-center gap-2">
                    <UserAvatar
                        src={row.original.avatar}
                        alt={row.original.name}
                        className="size-6 shrink-0"
                    />
                    <p>{row.original.name}</p>
                </div>
            );
        },
        filterFn: (rows, id, filterValue) => {
            const name = rows.original.name;
            return normalizeString(name).includes(normalizeString(filterValue));
        },
    },

    {
        accessorKey: "email",
        header: ({ column }) => (
            <DataTableColumnHeader column={column} title="Email" />
        ),
    },

    {
        accessorKey: "phoneNumber",
        header: ({ column }) => (
            <DataTableColumnHeader column={column} title="Phone" />
        ),
    },
    {
        accessorKey: "role",
        header: ({ column }) => (
            <DataTableColumnHeader column={column} title="Role" />
        ),
        cell: ({ row }) => {
            const role = row.original.role.roleName;
            const Icon = ICONS_ROLE[role];
            return (
                <div
                    className={cn(
                        "flex items-center gap-2 font-semibold",
                        role === "admin" && "text-admin",
                        role === "seller" && "text-amber-500",
                    )}
                >
                    <Icon className="size-4" />
                    <span className="capitalize">{role}</span>
                </div>
            );
        },
        sortingFn: (rowA, rowB) => {
            return rowA.original.role.roleName.localeCompare(
                rowB.original.role.roleName,
            );
        },
    },

    // {
    //     id: "actions",
    //     header: "Details",
    //     cell: ({ row }) => <RowActions order={row.original} />,
    // },
];
