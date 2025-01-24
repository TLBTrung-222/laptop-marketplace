"use client";

import { Button } from "@/components/ui/button";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ADMIN_NAVBAR_ITEMS, SELLER_NAVBAR_ITEMS } from "../constants";
import { Setting } from "./settings";

export const Navbar = () => {
    const pathname = usePathname();

    const navbarItems = pathname.includes("admin")
        ? ADMIN_NAVBAR_ITEMS
        : SELLER_NAVBAR_ITEMS;

    return (
        <nav className="flex h-full flex-col gap-2 p-4">
            {navbarItems.map((item) => (
                <Button
                    key={item.href}
                    asChild
                    variant={pathname === item.href ? "admin" : "admin-ghost"}
                    size="lg"
                    className="w-auto justify-start px-3"
                >
                    <Link href={item.href}>
                        <item.icon />
                        <span className="hidden font-medium capitalize md:block">
                            {item.label}
                        </span>
                    </Link>
                </Button>
            ))}
            <div className="mt-auto">
                <Setting />
            </div>
        </nav>
    );
};
