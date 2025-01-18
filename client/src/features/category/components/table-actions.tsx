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
import { useState } from "react";
import { useGetCategory } from "../apis/use-get-category";
import { EditCategoryModal } from "./edit-category-modal";

interface Props {
    id: number;
}

export const RowActions = ({ id }: Props) => {
    const { data } = useGetCategory(id);

    const [openEdit, setOpenEdit] = useState(false);
    const { confirm, ConfirmationDialog } = useConfirm(
        "Are you sure you want to delete this category?",
    );

    if (!data) {
        return null;
    }

    const onDelete = async () => {
        const ok = await confirm();
        if (!ok) {
            return;
        }

        console.log("Deleting category", id);
    };

    return (
        <>
            <ConfirmationDialog />
            <EditCategoryModal
                initialValues={data}
                open={openEdit}
                onOpenChange={setOpenEdit}
            />
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <Button variant="ghost" className="size-8 p-0">
                        <MoreHorizontal className="size-4" />
                    </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                    <DropdownMenuItem onClick={() => setOpenEdit(true)}>
                        <Edit />
                        Edit
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
