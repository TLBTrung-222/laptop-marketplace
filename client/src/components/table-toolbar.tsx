"use client";

import { Table } from "@tanstack/react-table";

import { Button } from "@/components/ui/button";
import {
    DropdownMenu,
    DropdownMenuCheckboxItem,
    DropdownMenuContent,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { Search, Settings2, X } from "lucide-react";

interface Props<TData> {
    columnId: string;
    table: Table<TData>;
}

export function DataTableToolbar<TData>({ table, columnId }: Props<TData>) {
    const filterValue =
        (table.getColumn(columnId)?.getFilterValue() as string) ?? "";

    const onFilterChange = (value: string) => {
        table.getColumn(columnId)?.setFilterValue(value);
    };
    return (
        <div className="flex items-center">
            <div className="relative">
                <Input
                    placeholder={`Search ${columnId} ...`}
                    value={filterValue}
                    onChange={(event) =>
                        onFilterChange(event.currentTarget.value)
                    }
                    className="max-w-md"
                />

                <button className="absolute right-3 top-1/2 -translate-y-1/2 transform text-muted-foreground [&_svg]:size-4">
                    {filterValue ? (
                        <X onClick={() => onFilterChange("")} />
                    ) : (
                        <Search />
                    )}
                </button>
            </div>
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <Button
                        variant="outline"
                        size="sm"
                        className="ml-auto hidden h-8 lg:flex"
                    >
                        <Settings2 />
                        View
                    </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-[150px]">
                    <DropdownMenuLabel>Toggle columns</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    {table
                        .getAllColumns()
                        .filter(
                            (column) =>
                                typeof column.accessorFn !== "undefined" &&
                                column.getCanHide(),
                        )
                        .map((column) => {
                            return (
                                <DropdownMenuCheckboxItem
                                    key={column.id}
                                    className="capitalize"
                                    checked={column.getIsVisible()}
                                    onCheckedChange={(value) =>
                                        column.toggleVisibility(!!value)
                                    }
                                >
                                    {column.id}
                                </DropdownMenuCheckboxItem>
                            );
                        })}
                </DropdownMenuContent>
            </DropdownMenu>
        </div>
    );
}
