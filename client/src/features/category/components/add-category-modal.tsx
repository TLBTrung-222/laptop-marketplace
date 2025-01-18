import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { Plus } from "lucide-react";
import { AddCategoryForm } from "./add-category-form";

export const AddCategoryModal = () => {
    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button variant="admin">
                    <Plus />
                    Add category
                </Button>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Add category</DialogTitle>
                </DialogHeader>
                <AddCategoryForm />
            </DialogContent>
        </Dialog>
    );
};
