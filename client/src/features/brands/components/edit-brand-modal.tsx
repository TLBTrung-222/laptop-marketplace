import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import { Brand } from "@/types";
import { EditBrandForm } from "./edit-category-form";

type Props = {
    initialValues: Brand;
    open: boolean;
    onOpenChange: (open: boolean) => void;
};

export const EditBrandModal = ({
    open,
    onOpenChange,
    initialValues,
}: Props) => {
    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Edit brand</DialogTitle>
                </DialogHeader>
                <EditBrandForm initialValues={initialValues} />
            </DialogContent>
        </Dialog>
    );
};
