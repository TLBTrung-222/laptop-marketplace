import { AddProductDetail } from "@/features/products/components/add-product-detail";
import { AddProductForm } from "@/features/products/components/add-product-form";
import { ProductSection } from "@/features/products/components/product-section";

export default function AddPage() {
    return (
        <div className="mx-auto max-w-3xl space-y-6">
            <ProductSection title="General Information">
                <AddProductForm />
            </ProductSection>
            <ProductSection title="Product Details">
                <AddProductDetail />
            </ProductSection>
        </div>
    );
}
