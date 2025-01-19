import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import { BrandInput } from "../schemas/brand";
import { BrandForm } from "./brand-form";

type Props = {
    title: string;
    initialValues?: BrandInput;
    onSubmit: (data: BrandInput) => void;
    open: boolean;
    onOpenChange: (open: boolean) => void;
};

export const BrandModal = ({
    title,
    initialValues,
    onSubmit,
    open,
    onOpenChange,
}: Props) => {
    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>{title}</DialogTitle>
                </DialogHeader>
                <BrandForm initialValues={initialValues} onSubmit={onSubmit} />
            </DialogContent>
        </Dialog>
    );
};
