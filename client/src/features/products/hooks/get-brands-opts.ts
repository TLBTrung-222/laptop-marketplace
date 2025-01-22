import { useGetBrands } from "@/features/brands/apis/use-get-brands";
import { useMemo } from "react";

export const useGetBrandsOpts = () => {
    const { data: brands } = useGetBrands();

    return useMemo(
        () =>
            brands?.map((brand) => ({
                label: brand.name,
                value: brand.id.toString(),
            })) || [],
        [brands],
    );
};
