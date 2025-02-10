import type { Metadata } from "next";
import "./globals.css";

import { Toaster } from "@/components/ui/sonner";
import { inter } from "@/fonts";
import { QueryProvider } from "@/providers/query-provider";
import { CartProvider } from "../features/home/component/cart-context";

export const metadata: Metadata = {
    title: "Laptop marketplace",
    description:
        "An ecommerce marketplace allow you to buy/sell new/used laptop",
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
    <html lang="en" className={inter.className}>
        <body>
            <CartProvider>
                <QueryProvider>{children}</QueryProvider>
                <Toaster richColors theme="light" />
            </CartProvider>
        </body>
    </html>
    );
}