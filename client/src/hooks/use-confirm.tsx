import { useState } from "react";

import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";

type State = {
    resolve: (value: boolean) => void;
} | null;

export const useConfirm = (
    title = "Are you absolutely sure?",
    message = "This action cannot be undone. This will permanently remove your data from our servers.",
) => {
    const [promise, setPromise] = useState<State>(null);

    const confirm = () =>
        new Promise<boolean>((resolve, reject) => {
            setPromise({ resolve });
        });

    const handleClose = () => {
        setPromise(null);
    };

    const handleConfirm = () => {
        promise?.resolve(true);
        handleClose();
    };

    const handleCancel = () => {
        promise?.resolve(false);
        handleClose();
    };

    const ConfirmationDialog = () => (
        <Dialog open={promise !== null} onOpenChange={handleClose}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>{title}</DialogTitle>
                    <DialogDescription>{message}</DialogDescription>
                </DialogHeader>
                <div className="flex justify-end gap-2">
                    <Button onClick={handleCancel} variant="admin-ghost">
                        Cancel
                    </Button>
                    <Button onClick={handleConfirm} variant="admin">
                        Confirm
                    </Button>
                </div>
            </DialogContent>
        </Dialog>
    );
    return { ConfirmationDialog, confirm };
};
