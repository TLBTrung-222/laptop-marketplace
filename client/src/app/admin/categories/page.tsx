"use client";

import { ExportDataButton } from "@/components/export-data-button";
import { AddCategoryModal } from "@/features/category/components/add-category-modal";
import { CategoryTable } from "@/features/category/components/category-table";
import { useRef } from "react";

export default function CategoriesPage() {
    const ref = useRef<HTMLTableElement>(null);

    return (
        <>
            <div className="flex items-center justify-between">
                <h1 className="text-2xl font-medium text-neutral-700">
                    Categories
                </h1>
                <div className="flex gap-4">
                    <ExportDataButton tableRef={ref} fileName="Categories" />
                    <AddCategoryModal />
                </div>
            </div>
            <CategoryTable tableRef={ref} />
        </>
    );
}
