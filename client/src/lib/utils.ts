import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

export function formatPrice(price: number) {
    return new Intl.NumberFormat("vi-VN", {
        style: "currency",
        currency: "VND",
    }).format(price);
}

type Segment = {
    href: string;
    label: string;
};

export function generateBreadcrumbs(path: string) {
    const pathWithoutQuery = path.split("?")[0];

    const segments = pathWithoutQuery
        .split("/")
        .filter((segment) => segment !== "");

    return segments.reduce<Segment[]>((acc, segment, index) => {
        const href = `/${segments.slice(0, index + 1).join("/")}`;

        let label = segment
            .replace(/[-_]/g, " ")
            .replace(/\b\w/g, (char) => char.toUpperCase());

        acc.push({ href, label });

        return acc;
    }, []);
}

export function normalizeString(str: string) {
    return str
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
        .toLowerCase();
}
