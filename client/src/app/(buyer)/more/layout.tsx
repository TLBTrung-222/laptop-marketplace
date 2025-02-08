"use client";
import { useGetProducts } from "@/features/products/apis/use-get-products";
import { Home, Settings, Inbox } from "lucide-react";
import { useEffect, useState } from "react";
import Header from "../../../features/home/component/header";
import { usePathname } from "next/navigation";
import { Product } from "@/types";
import { toast } from "sonner";

export default function FAQLayout({ children }: { children: React.ReactNode }) {
    const menuItems = [
        { label: "Personal Data", path: "/profile", icon: Home },
        { label: "Payment", path: "/profile/settings", icon: Settings },
        { label: "Orders", path: "/profile/orders", icon: Inbox },
        { label: "Wish list", path: "/profile/orders", icon: Inbox },
        { label: "Notification", path: "/profile/orders", icon: Inbox },
    ];
    const pathname = usePathname();
    const [isHeader, setIsHeader] = useState(true);
    const [mounted, setMounted] = useState(false);
    const { data } = useGetProducts();
    const listPathHaveHeaders = ["/account"];
    
    useEffect(() => {
        setMounted(true);
        setIsHeader(listPathHaveHeaders.includes(pathname));
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
