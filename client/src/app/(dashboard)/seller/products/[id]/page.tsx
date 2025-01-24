"use client";

import { ProductDetail } from "@/features/products/components/product-detail";
import { ProductForm } from "@/features/products/components/product-form";
import { ProductSection } from "@/features/products/components/product-section";
import { ProductInput } from "@/features/products/schemas/product";
import { ProductDetailInput } from "@/features/products/schemas/product-detail";
import { useParams } from "next/navigation";

export default function ProductPage() {
    const { id } = useParams<{ id: string }>();

    const onEditProduct = (data: ProductInput) => {
        console.log("🚀 ~ onAddProduct ~ data:", data);
    };

    const onEditDetail = (data: ProductDetailInput) => {
        console.log("🚀 ~ onEditDetail ~ data:", data);
    };

    return (
        <div className="mx-auto max-w-3xl space-y-6">
            <ProductSection title="General Information">
                <ProductForm onSubmit={onEditProduct} id={+id} />
            </ProductSection>
            <ProductSection title="Product Details">
                <ProductDetail onSubmit={onEditDetail} />
            </ProductSection>
        </div>
    );
}
