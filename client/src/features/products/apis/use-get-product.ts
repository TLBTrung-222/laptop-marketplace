import { axiosClient } from "@/lib/axios";
import { Product } from "@/types";
import { useQuery } from "@tanstack/react-query";

export const useGetProduct = (id?: number) => {
    const query = useQuery({
        queryKey: ["product", id],
        enabled: !!id,
        queryFn: async () => {
            const response = await axiosClient.get(`/products/${id}`);
            const product = response.data as Product;
            if (product.images.length > 0) {
                product.images = product.images.map((image) => ({
                    ...image,
                    image: `${process.env.NEXT_PUBLIC_AWS_S3_BUCKET_URL}/${image.image}`,
                }));
            }
            return product;
        },
    });
    return query;
};
