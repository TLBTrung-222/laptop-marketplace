"use client";

import { useGetProfile } from "@/features/admin/api/use-get-profile";
import { usePathname } from "next/navigation";
import { DashboardSkeleton } from "./dashboard-loading";
import { Unauthorized } from "./unauthorized";

type Props = {
    children: React.ReactNode;
};

export const Auth = ({ children }: Props) => {
    const { data, isLoading } = useGetProfile();

    const pathname = usePathname();
    const role = pathname.split("/")[1];

    if (isLoading) {
        return <DashboardSkeleton />;
    }

    if (!data || data.role.roleName !== role) {
        return <Unauthorized role={role} />;
    }

    return <>{children}</>;
};
