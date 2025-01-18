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
import { EditBrandModal } from "./edit-brand-modal";

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
            <EditBrandModal
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
