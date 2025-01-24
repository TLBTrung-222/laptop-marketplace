"use client";

import { useCreateProduct } from "@/features/products/apis/use-create-product";
import { ProductForm } from "@/features/products/components/product-form";
import { ProductSection } from "@/features/products/components/product-section";
import { ProductInput } from "@/features/products/schemas/product";

export default function AddPage() {
    const { isPending, mutate } = useCreateProduct();

    const onAddProduct = (data: ProductInput) => {
        mutate({
            ...data,
            categoryId: parseInt(data.categoryId),
            brandId: parseInt(data.brandId),
        });
    };

    return (
        <div className="mx-auto max-w-3xl space-y-6">
            <ProductSection title="General Information">
                <ProductForm onSubmit={onAddProduct} disabled={isPending} />
            </ProductSection>
        </div>
    );
}
