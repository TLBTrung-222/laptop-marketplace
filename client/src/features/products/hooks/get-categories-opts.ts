import { useGetCategories } from "@/features/category/apis/use-get-categories";
import { useMemo } from "react";

export const useGetCategoriesOpts = () => {
    const { data: categories } = useGetCategories();

    return useMemo(
        () =>
            categories?.map((category) => ({
                label: category.type,
                value: category.id.toString(),
            })) || [],
        [categories],
    );
};
