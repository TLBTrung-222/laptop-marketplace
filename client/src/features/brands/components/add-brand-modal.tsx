import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { Plus } from "lucide-react";
import { AddBrandForm } from "./add-brand-form";

export const AddBrandModal = () => {
    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button variant="admin">
                    <Plus />
                    Add brand
                </Button>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Add brand</DialogTitle>
                </DialogHeader>
                <AddBrandForm />
            </DialogContent>
        </Dialog>
    );
};
