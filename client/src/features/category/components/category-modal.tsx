import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import { CategoryInput } from "../schemas/category";
import { CategoryForm } from "./category-form";

type Props = {
    title: string;
    initialValues?: CategoryInput;
    onSubmit: (data: CategoryInput) => void;
    open: boolean;
    onOpenChange: (open: boolean) => void;
    disabled?: boolean;
};

export const CategoryModal = ({
    title,
    initialValues,
    onSubmit,
    open,
    onOpenChange,
    disabled,
}: Props) => {
    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>{title}</DialogTitle>
                </DialogHeader>
                <CategoryForm
                    initialValues={initialValues}
                    onSubmit={onSubmit}
                    disabled={disabled}
                />
            </DialogContent>
        </Dialog>
    );
};
