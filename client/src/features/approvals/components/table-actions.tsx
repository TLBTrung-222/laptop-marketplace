"use client";

import { Edit, MoreHorizontal, Trash } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useConfirm } from "@/hooks/use-confirm";
import Link from "next/link";
import { useDeleteApproval } from "../apis/use-remove-approval";

interface Props {
    id: number;
}

export const RowActions = ({ id }: Props) => {
    const { confirm, ConfirmationDialog } = useConfirm(
        "Are you sure you want delete this approval?",
    );

    const { isPending, mutate } = useDeleteApproval();

    const onDelete = async () => {
        const ok = await confirm();
        if (!ok) return;
        mutate(id);
    };

    return (
        <>
            <ConfirmationDialog />

            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <Button
                        variant="ghost"
                        className="size-8 p-0"
                        disabled={isPending}
                    >
                        <MoreHorizontal className="size-4" />
                    </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                    <DropdownMenuItem asChild>
                        <Link href={`/seller/products/${id}`}>
                            <Edit />
                            Edit
                        </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem
                        className="text-rose-600"
                        onClick={onDelete}
                    >
                        <Trash />
                        Delete
                    </DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>
        </>
    );
};
