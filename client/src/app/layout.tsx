import type { Metadata } from "next";
import "./globals.css";

import { Inter } from "next/font/google";

import { Modals } from "@/components/modals";
import { Toaster } from "@/components/ui/sonner";
import { ModalStoreProvider } from "@/providers/modal-store-provider";
import { QueryProvider } from "@/providers/query-provider";

const inter = Inter({
    subsets: ["latin"],
    display: "swap",
});

export const metadata: Metadata = {
    title: "Tech Heim",
    description: "Tech Heim - Laptop marketplace",
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
            <head>
                <link
                    rel="icon"
                    type="image/png"
                    href="/favicon/favicon-96x96.png"
                    sizes="96x96"
                />
                <link
                    rel="icon"
                    type="image/svg+xml"
                    href="/favicon/favicon.svg"
                />
                <link rel="shortcut icon" href="/favicon/favicon.ico" />
                <link
                    rel="apple-touch-icon"
                    sizes="180x180"
                    href="/favicon/apple-touch-icon.png"
                />
                <link rel="manifest" href="/favicon/site.webmanifest" />
            </head>
            <body className={inter.className}>
                <QueryProvider>
                    <ModalStoreProvider>
                        {children}

                        <Modals />
                    </ModalStoreProvider>
                </QueryProvider>
                <Toaster position="top-center" richColors theme="light" />
            </body>
        </html>
    );
}
