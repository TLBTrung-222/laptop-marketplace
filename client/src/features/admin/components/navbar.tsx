"use client";

import { Button } from "@/components/ui/button";
import { Settings } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { NAVBAR_ITEMS } from "../constants";

export const Navbar = () => {
    const pathname = usePathname();

    return (
        <nav className="flex h-full flex-col gap-2 p-4">
            {NAVBAR_ITEMS.map((item) => (
                <Button
                    key={item.href}
                    asChild
                    variant={pathname === item.href ? "admin" : "admin-ghost"}
                    size="lg"
                    className="w-auto justify-start px-3"
                >
                    <Link href={item.href}>
                        <item.icon className="!size-5" />
                        <span className="hidden font-semibold capitalize md:block">
                            {item.label}
                        </span>
                    </Link>
                </Button>
            ))}
            <div className="mt-auto">
                <Button
                    variant="admin-ghost"
                    size="lg"
                    className="w-full px-3"
                    asChild
                >
                    <Link href="/admin/settings">
                        <Settings className="!size-5" />
                        <span className="hidden font-semibold capitalize md:block">
                            Settings
                        </span>
                    </Link>
                </Button>
            </div>
        </nav>
    );
};
