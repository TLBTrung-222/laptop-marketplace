import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import { Category } from "@/types";
import { EditCategoryForm } from "./edit-category-form";

type Props = {
    initialValues: Category;
    open: boolean;
    onOpenChange: (open: boolean) => void;
};

export const EditCategoryModal = ({
    open,
    onOpenChange,
    initialValues,
}: Props) => {
    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Edit category</DialogTitle>
                </DialogHeader>
                <EditCategoryForm initialValues={initialValues} />
            </DialogContent>
        </Dialog>
    );
};
