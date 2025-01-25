"use client";

import { useCreateDetails } from "@/features/products/apis/use-create-details";
import { useGetDetails } from "@/features/products/apis/use-get-details";
import { useGetProduct } from "@/features/products/apis/use-get-product";
import { useUpdateDetails } from "@/features/products/apis/use-update-details";
import { useUpdateProduct } from "@/features/products/apis/use-update-product";
import { ProductDetail } from "@/features/products/components/product-detail";
import { ProductForm } from "@/features/products/components/product-form";
import { ProductImages } from "@/features/products/components/product-images";
import { ProductSection } from "@/features/products/components/product-section";
import { ProductInput } from "@/features/products/schemas/product";
import { ProductDetailInput } from "@/features/products/schemas/product-detail";
import { cn } from "@/lib/utils";
import { useParams } from "next/navigation";

export default function ProductPage() {
    const { id } = useParams<{ id: string }>();

    const details = useGetDetails(+id);
    const product = useGetProduct(+id);
    const isLoading = details.isLoading || product.isLoading;

    const createDetails = useCreateDetails(+id);
    const updateDetails = useUpdateDetails(details.data?.id);
    const updateProduct = useUpdateProduct(+id);

    if (isLoading) {
        return <div>Loading...</div>;
    }

    const onEditProduct = (data: ProductInput) => {
        updateProduct.mutate({
            ...data,
            categoryId: parseInt(data.categoryId),
            brandId: parseInt(data.brandId),
        });
    };

    const onCreateOrEditDetail = (data: ProductDetailInput) => {
        if (details.data) {
            updateDetails.mutate(data);
        } else {
            createDetails.mutate(data);
        }
    };

    const onImagesUploaded = (files: File[]) => {
        console.log("🚀 ~ onImagesUploaded ~ files:", files);
    };

    return (
        <div
            className={cn(
                "mx-auto flex max-w-3xl flex-col gap-y-6",
                !details.data && "flex-col-reverse",
            )}
        >
            <ProductSection title="General Information">
                <ProductForm
                    onSubmit={onEditProduct}
                    initialValues={product.data}
                    disabled={updateProduct.isPending}
                />
            </ProductSection>
            <ProductSection title="Product Images">
                <ProductImages
                    maxFiles={5}
                    onImagesUploaded={onImagesUploaded}
                />
            </ProductSection>
            <ProductSection title="Product Details">
                <ProductDetail
                    onSubmit={onCreateOrEditDetail}
                    initialValues={details.data}
                    disabled={
                        updateDetails.isPending || createDetails.isPending
                    }
                />
            </ProductSection>
        </div>
    );
}
