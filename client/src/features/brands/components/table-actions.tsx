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

    if (!data) {
        return null;
    }

    const onEdit = (data: BrandInput) => {
        console.log("Editing brand", data);
    };

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
            <BrandModal
                open={openEdit}
                onOpenChange={setOpenEdit}
                title="Edit Brand"
                initialValues={data}
                onSubmit={onEdit}
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
