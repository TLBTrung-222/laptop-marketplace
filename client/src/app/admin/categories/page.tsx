"use client";

import { ExportDataButton } from "@/components/export-data-button";
import { Button } from "@/components/ui/button";
import { useCreateCategory } from "@/features/category/apis/use-create-category";
import { CategoryModal } from "@/features/category/components/category-modal";
import { CategoryTable } from "@/features/category/components/category-table";
import { CategoryInput } from "@/features/category/schemas/category";
import { Plus } from "lucide-react";
import { useRef, useState } from "react";

export default function CategoriesPage() {
    const ref = useRef<HTMLTableElement>(null);

    const [open, setOpen] = useState(false);
    const { isPending, mutate } = useCreateCategory();

    const onAddCategory = (data: CategoryInput) => {
        mutate(data, {
            onSuccess() {
                setOpen(false);
            },
        });
    };

    return (
        <>
            <div className="flex items-center justify-between">
                <h1 className="text-2xl font-medium text-neutral-700">
                    Categories
                </h1>
                <div className="flex gap-4">
                    <ExportDataButton tableRef={ref} fileName="Categories" />

                    <Button variant="admin" onClick={() => setOpen(true)}>
                        <Plus />
                        Add category
                    </Button>
                </div>
            </div>
            <CategoryModal
                title="Add Category"
                onSubmit={onAddCategory}
                open={open}
                onOpenChange={setOpen}
                disabled={isPending}
            />
            <CategoryTable tableRef={ref} />
        </>
    );
}
