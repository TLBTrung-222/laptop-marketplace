"use client";

import { ProductForm } from "@/features/products/components/product-form";
import { ProductSection } from "@/features/products/components/product-section";
import { ProductInput } from "@/features/products/schemas/product";

export default function AddPage() {
    const onAddProduct = (data: ProductInput) => {
        console.log("🚀 ~ onAddProduct ~ data:", data);
    };

    return (
        <div className="mx-auto max-w-3xl space-y-6">
            <ProductSection title="General Information">
                <ProductForm onSubmit={onAddProduct} />
            </ProductSection>
        </div>
    );
}
