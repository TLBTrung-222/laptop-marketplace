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
import { useGetProduct } from "../apis/use-get-product";

interface Props {
    id: number;
}

export const RowActions = ({ id }: Props) => {
    const { data } = useGetProduct(id);

    const { confirm, ConfirmationDialog } = useConfirm(
        "Are you sure you want to delete this product?",
    );

    if (!data) {
        return null;
    }

    const onDelete = async () => {
        const ok = await confirm();
        if (!ok) {
            return;
        }

        console.log("Deleting brand", id);
    };

    return (
        <>
            <ConfirmationDialog />

            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <Button variant="ghost" className="size-8 p-0">
                        <MoreHorizontal className="size-4" />
                    </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                    <DropdownMenuItem asChild>
                        <Link href={`/admin/brands/${id}`}>
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
