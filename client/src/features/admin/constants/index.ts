import {
    AlignEndHorizontal,
    Factory,
    LayoutGrid,
    ListCheck,
    LucideIcon,
    ShoppingBag,
    Users,
} from "lucide-react";

type NavbarItem = {
    href: string;
    label: string;
    icon: LucideIcon;
};

export const NAVBAR_ITEMS: NavbarItem[] = [
    {
        href: "/admin",
        label: "Dashboard",
        icon: LayoutGrid,
    },
    {
        href: "/admin/approvals",
        label: "Approvals",
        icon: ListCheck,
    },
    {
        href: "/admin/products",
        label: "Products",
        icon: ShoppingBag,
    },
    {
        href: "/admin/categories",
        label: "Categories",
        icon: AlignEndHorizontal,
    },
    {
        href: "/admin/brands",
        label: "Brands",
        icon: Factory,
    },
    {
        href: "/admin/accounts",
        label: "Accounts",
        icon: Users,
    },
];
