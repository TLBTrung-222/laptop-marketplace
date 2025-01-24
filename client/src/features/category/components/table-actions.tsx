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
import { useDeleteCategory } from "../apis/use-delete-brand";
import { useEditCategory } from "../apis/use-edit-category";
import { useGetCategory } from "../apis/use-get-category";
import { CategoryInput } from "../schemas/category";
import { CategoryModal } from "./category-modal";

interface Props {
    id: number;
}

export const RowActions = ({ id }: Props) => {
    const { data } = useGetCategory(id);

    const [openEdit, setOpenEdit] = useState(false);
    const { confirm, ConfirmationDialog } = useConfirm(
        "Are you sure you want to delete this category?",
    );

    const edit = useEditCategory(id);
    const remove = useDeleteCategory(id);

    if (!data) {
        return null;
    }

    const onEdit = (data: CategoryInput) => {
        edit.mutate(data, {
            onSuccess() {
                setOpenEdit(false);
            },
        });
    };

    const onDelete = async () => {
        const ok = await confirm();
        if (!ok) {
            return;
        }

        remove.mutate();
    };

    const isPending = edit.isPending || remove.isPending;

    return (
        <>
            <ConfirmationDialog />
            <CategoryModal
                title="Edit Category"
                initialValues={data}
                onSubmit={onEdit}
                open={openEdit}
                onOpenChange={setOpenEdit}
                disabled={isPending}
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
