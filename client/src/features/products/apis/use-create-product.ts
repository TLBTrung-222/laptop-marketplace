import { axiosClient } from "@/lib/axios";
import { Product } from "@/types";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { ProductInput } from "../schemas/product";

type ProductRequest = Omit<ProductInput, "categoryId" | "brandId"> & {
    categoryId: number;
    brandId: number;
};

export const useCreateProduct = () => {
    const queryClient = useQueryClient();
    const router = useRouter();

    const mutation = useMutation({
        mutationFn: async (data: ProductRequest) => {
            const response = await axiosClient.post("/products", data);
            return response.data as Product;
        },
        onError: (error) => {
            console.log("🚀 ~ error:", error);
            toast.error("Failed to create product");
        },
        onSuccess: (data) => {
            queryClient.invalidateQueries({
                queryKey: ["products"],
            });
            router.push(`/seller/products/${data.id}`);
            toast.success("Product created successfully");
        },
    });

    return mutation;
};
