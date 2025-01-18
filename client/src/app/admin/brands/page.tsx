"use client";

import { ExportDataButton } from "@/components/export-data-button";
import { AddBrandModal } from "@/features/brands/components/add-brand-modal";
import { BrandTable } from "@/features/brands/components/brand-table";
import { useRef } from "react";

export default function CategoriesPage() {
    const ref = useRef<HTMLTableElement>(null);

    return (
        <>
            <div className="flex items-center justify-between">
                <h1 className="text-2xl font-medium text-neutral-700">
                    Brands
                </h1>
                <div className="flex gap-4">
                    <ExportDataButton tableRef={ref} fileName="Brands" />
                    <AddBrandModal />
                </div>
            </div>
            <BrandTable tableRef={ref} />
        </>
    );
}
