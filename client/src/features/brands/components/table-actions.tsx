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
import { useDeleteBrand } from "../apis/use-delete-brand";
import { useEditBrand } from "../apis/use-edit-brand";
import { useGetBrand } from "../apis/use-get-brand";
import { BrandInput } from "../schemas/brand";
import { BrandModal } from "./brand-modal";

interface Props {
    id: number;
}

export const RowActions = ({ id }: Props) => {
    const { data } = useGetBrand(id);

    const [openEdit, setOpenEdit] = useState(false);
    const { confirm, ConfirmationDialog } = useConfirm(
        "Are you sure you want to delete this brand?",
    );

    const edit = useEditBrand(id);
    const remove = useDeleteBrand(id);

    const isPending = edit.isPending || remove.isPending;

    if (!data) {
        return null;
    }

    const onEdit = (data: BrandInput) => {
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

    return (
        <>
            <ConfirmationDialog />
            <BrandModal
                open={openEdit}
                onOpenChange={setOpenEdit}
                title="Edit Brand"
                initialValues={data}
                onSubmit={onEdit}
                disabled={isPending}
            />
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
