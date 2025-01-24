import {
    AlignEndHorizontal,
    Factory,
    LayoutGrid,
    ListCheck,
    LucideIcon,
    ShoppingBag,
    Truck,
    Users,
} from "lucide-react";

type NavbarItem = {
    href: string;
    label: string;
    icon: LucideIcon;
};

export const ADMIN_NAVBAR_ITEMS: NavbarItem[] = [
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
        href: "/admin/orders",
        label: "Orders",
        icon: Truck,
    },
    {
        href: "/admin/accounts",
        label: "Accounts",
        icon: Users,
    },
];

export const SELLER_NAVBAR_ITEMS: NavbarItem[] = [
    {
        href: "/seller",
        label: "Dashboard",
        icon: LayoutGrid,
    },
    {
        href: "/seller/products",
        label: "Products",
        icon: ShoppingBag,
    },
    {
        href: "/seller/approvals",
        label: "Approvals",
        icon: ListCheck,
    },
];
