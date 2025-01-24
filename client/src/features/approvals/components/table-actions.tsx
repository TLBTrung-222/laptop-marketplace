"use client";

import { Trash } from "lucide-react";

import { Button } from "@/components/ui/button";
import { useConfirm } from "@/hooks/use-confirm";
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
            <Button
                variant="admin-ghost"
                size="icon"
                className="justify-center"
                disabled={isPending}
                onClick={onDelete}
            >
                <Trash />
            </Button>
        </>
    );
};
