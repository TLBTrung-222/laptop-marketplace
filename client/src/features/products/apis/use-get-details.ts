import { axiosClient } from "@/lib/axios";
import { ProductDetail } from "@/types";
import { useQuery } from "@tanstack/react-query";

export const useGetDetails = (id: number) => {
    const query = useQuery({
        queryKey: ["detail", id],
        queryFn: async () => {
            const response = await axiosClient.get(
                `/products/${id}/specifications`,
            );
            return response.data as ProductDetail;
        },
    });
    return query;
};

export const fetchProductDetails = async (id: number) => {
    const response = await fetch(
        `${process.env.NEXT_PUBLIC_SERVER}/products/${id.toString()}/specifications?${Date.now()}`,
    );
    
    if (!response.ok) {
        throw new Error("Failed to fetch product details");
    }
    const data = await response.json();
    return data.data as ProductDetail;
};