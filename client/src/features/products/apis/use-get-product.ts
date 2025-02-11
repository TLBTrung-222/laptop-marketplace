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

const fetchProducts = async () => {
    const response = await fetch(
        `https://laptop-marketplace.shop/api/products?${Date.now()}`,
    );
    if (!response.ok) {
        throw new Error("Failed to fetch products");
    }
    const data = await response.json();
    return data.data;
};

export const getProducts = async () => {
    return fetchProducts();
};

const fetchProduct = async (id:number) => {
    const response = await fetch(
        `https://laptop-marketplace.shop/api/products/${id}`,
    );
    if (!response.ok) {
        throw new Error("Failed to fetch products");
    }
    const data = await response.json();
    return data.data;
};

export const getProduct = async (id:number) => {
    const product = await fetchProduct(id);
    if (product.images.length > 0) {
        product.images = product.images.map((image:any) => ({
            ...image,
            image: `${process.env.NEXT_PUBLIC_AWS_S3_BUCKET_URL}/${image.image}`,
        }));
    }
    return product
};