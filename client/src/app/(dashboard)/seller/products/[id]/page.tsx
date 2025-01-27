"use client";

import { useCreateDetails } from "@/features/products/apis/use-create-details";
import { useGetDetails } from "@/features/products/apis/use-get-details";
import { useGetProduct } from "@/features/products/apis/use-get-product";
import { useRemoveImage } from "@/features/products/apis/use-remove-image";
import { useUpdateDetails } from "@/features/products/apis/use-update-details";
import { useUpdateProduct } from "@/features/products/apis/use-update-product";
import { useUploadImages } from "@/features/products/apis/use-upload-images";
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
    const uploadImages = useUploadImages(+id);
    const removeImage = useRemoveImage(+id);

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

    const onImagesUploaded = async (files: File[]) => {
        const formData = new FormData();
        files.forEach((file) => {
            formData.append("image", file);
        });
        await uploadImages.mutateAsync(formData);
    };

    const onRemoveImage = async (image: string) => {
        const imageUrl = image.replace(
            `${process.env.NEXT_PUBLIC_AWS_S3_BUCKET_URL}/`,
            "",
        );

        removeImage.mutate(imageUrl);
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
                    maxFiles={8}
                    initialImages={product.data?.images || []}
                    onImagesUpload={onImagesUploaded}
                    onRemoveImage={onRemoveImage}
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
