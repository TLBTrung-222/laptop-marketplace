import { Button } from "@/components/ui/button";
import { Settings } from "lucide-react";
import Link from "next/link";
import { NAVBAR_ITEMS } from "../constants";

export const Navbar = () => {
    return (
        <nav className="flex h-full flex-col gap-2 p-4">
            {NAVBAR_ITEMS.map((item) => (
                <Button
                    key={item.href}
                    asChild
                    variant="admin"
                    size="lg"
                    className="px-3"
                >
                    <Link href={item.href}>
                        <item.icon className="!size-5" />
                        <span className="font-semibold capitalize">
                            {item.label}
                        </span>
                    </Link>
                </Button>
            ))}
            <div className="mt-auto">
                <Button
                    variant="admin"
                    size="lg"
                    className="w-full px-3"
                    asChild
                >
                    <Link href="/admin/settings">
                        <Settings className="!size-5" />
                        <span className="font-semibold capitalize">
                            Settings
                        </span>
                    </Link>
                </Button>
            </div>
        </nav>
    );
};
