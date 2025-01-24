"use client";

import { ExportDataButton } from "@/components/export-data-button";
import { Button } from "@/components/ui/button";
import { useCreateBrand } from "@/features/brands/apis/use-create-brand";
import { BrandModal } from "@/features/brands/components/brand-modal";
import { BrandTable } from "@/features/brands/components/brand-table";
import { BrandInput } from "@/features/brands/schemas/brand";
import { Plus } from "lucide-react";
import { useRef, useState } from "react";

export default function CategoriesPage() {
    const ref = useRef<HTMLTableElement>(null);

    const [open, setOpen] = useState(false);
    const { mutate, isPending } = useCreateBrand();

    const onAddBrand = (data: BrandInput) => {
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
                    Brands
                </h1>
                <div className="flex gap-4">
                    <ExportDataButton tableRef={ref} fileName="Brands" />
                    <Button
                        variant="admin"
                        onClick={() => setOpen(true)}
                        disabled={isPending}
                    >
                        <Plus />
                        Add Brand
                    </Button>
                </div>
            </div>
            <BrandModal
                open={open}
                onOpenChange={setOpen}
                title="Add Brand"
                onSubmit={onAddBrand}
                disabled={isPending}
            />
            <BrandTable tableRef={ref} />
        </>
    );
}
