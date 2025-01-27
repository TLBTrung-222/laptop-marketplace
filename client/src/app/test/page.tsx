"use client";

import { useGetProduct } from "@/features/products/apis/use-get-product";
import { useRemoveImage } from "@/features/products/apis/use-remove-image";
import { useUploadImages } from "@/features/products/apis/use-upload-images";
import MultiImageUpload from "./multi-image-upload";

export default function Page() {
    // Example initial images
    const productId = 14;
    const product = useGetProduct(productId);
    const upload = useUploadImages(productId);
    const remove = useRemoveImage(productId);

    if (product.isPending) return <div>Loading...</div>;

    const initialImages = product.data?.images || [];

    return (
        <div className="container max-w-3xl py-10">
            <div className="space-y-4">
                <h2 className="text-2xl font-bold">Product Images</h2>
                <MultiImageUpload
                    initialImages={initialImages}
                    maxFiles={8}
                    onImagesUpload={async (files) => {
                        const formData = new FormData();
                        files.forEach((file) => {
                            formData.append("image", file);
                        });

                        await upload.mutateAsync(formData);
                    }}
                    onRemoveImage={async (image) => {
                        const imageUrl = image.replace(
                            `${process.env.NEXT_PUBLIC_AWS_S3_BUCKET_URL}/`,
                            "",
                        );

                        remove.mutate(imageUrl);
                    }}
                />
            </div>
        </div>
    );
}
