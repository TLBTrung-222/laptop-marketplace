"use client";
import { useGetProducts } from "@/features/products/apis/use-get-products";
import { useEffect, useState } from "react";
import Header from "../../../features/home/component/header";
import { usePathname } from "next/navigation";

export default function ProductLayout({ children }: { children: React.ReactNode }) {
    const pathname = usePathname();
    const [mounted, setMounted] = useState(false);
    const { data } = useGetProducts();

    useEffect(() => {
        setMounted(true);
    }, [pathname, mounted]);

    if (!mounted) {
        return null;
    }

    return (
        <div>
            <Header data={data}/>
            <main className="ml-2 p-2">{children}</main>
        </div>
    );
}
