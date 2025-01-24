"use client";

import { ChevronRight, LayoutGrid } from "lucide-react";
import { usePathname } from "next/navigation";

import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { generateBreadcrumbs } from "@/lib/utils";
import Link from "next/link";
import { Fragment } from "react";

export function BreadcrumbNav() {
    const pathname = usePathname();
    const breadcrumbs = generateBreadcrumbs(pathname);

    if (pathname === "/" || pathname === "/admin" || pathname === "/seller")
        return null;

    const rootRoute = pathname.includes("admin") ? "/admin" : "/seller";

    return (
        <Breadcrumb className="mb-4">
            <BreadcrumbList>
                <BreadcrumbItem>
                    <BreadcrumbLink
                        asChild
                        className="flex items-center gap-1 hover:text-admin"
                    >
                        <Link href={rootRoute}>
                            <LayoutGrid className="size-4" />
                            <span className="inline">Dashboard</span>
                        </Link>
                    </BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator>
                    <ChevronRight className="size-4" />
                </BreadcrumbSeparator>

                {breadcrumbs.map((breadcrumb, index) => {
                    if (
                        breadcrumb.label === "Admin" ||
                        breadcrumb.label === "Seller"
                    )
                        return null;

                    let label = breadcrumb.label;

                    if (+label) {
                        label = "Details";
                    }

                    if (index === breadcrumbs.length - 1) {
                        return (
                            <BreadcrumbPage
                                key={breadcrumb.href}
                                className="font-medium text-admin"
                            >
                                {label}
                            </BreadcrumbPage>
                        );
                    }

                    return (
                        <Fragment key={breadcrumb.href}>
                            <BreadcrumbLink
                                asChild
                                className="inline-block hover:text-admin"
                            >
                                <Link href={breadcrumb.href}>{label}</Link>
                            </BreadcrumbLink>
                            <BreadcrumbSeparator>
                                <ChevronRight className="h-4 w-4" />
                            </BreadcrumbSeparator>
                        </Fragment>
                    );
                })}
            </BreadcrumbList>
        </Breadcrumb>
    );
}
