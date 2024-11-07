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
    title: "Create Next App",
    description: "Generated by create next app",
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
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