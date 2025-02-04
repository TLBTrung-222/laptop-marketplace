"use client";

import { Sidebar, SidebarContent, SidebarGroup, SidebarGroupContent, SidebarGroupLabel, SidebarMenu, SidebarMenuButton, SidebarMenuItem, SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { Home, Settings, Inbox } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function AccountLayout({ children }: { children: React.ReactNode }) {
    const menuItems = [
        { label: "Personal Data", path: "/profile", icon: Home },
        { label: "Payment", path: "/profile/settings", icon: Settings },
        { label: "Orders", path: "/profile/orders", icon: Inbox },
        { label: "Wish list", path: "/profile/orders", icon: Inbox },
        { label: "Notification", path: "/profile/orders", icon: Inbox },
    ];

    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    if (!mounted) {
        return null;
    }

    return (
        <div>
            <div className="flex">
                {/* <SidebarTrigger/> */}
                {/* Sidebar chỉ áp dụng cho Profile */}
                <div className="w-[250px] h-fit bg-gray-50 mt-10 ml-10 rounded-md p-2">
                    <div>
                        <h3>Jimmy smith</h3>
                    </div>
                    <div>
                        {menuItems.map(item=>(
                        <div className="flex gap-4 text-gray-800 mt-4">
                            <item.icon className="w-5 h-5"/>
                            <Link href={item.path}>
                                {item.label}
                            </Link>
                        </div>
                        ))}
                    </div>
                </div>
                
                {/* Nội dung của từng trang con */}
                <main className="ml-2 mt-10 p-2">{children}</main>
            </div>
        </div>
    );
}
