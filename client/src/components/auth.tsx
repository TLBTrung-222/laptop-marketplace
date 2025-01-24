"use client";

import { useGetProfile } from "@/features/admin/api/use-get-profile";
import { DashboardSkeleton } from "./dashboard-loading";
import { Unauthorized } from "./unauthorized";

type Props = {
    children: React.ReactNode;
    role: "admin" | "seller";
};

export const Auth = ({ children, role }: Props) => {
    const { data, isLoading } = useGetProfile();

    if (isLoading) {
        return <DashboardSkeleton />;
    }

    if (!data || data.role.roleName !== role) {
        return <Unauthorized role="admin" />;
    }

    return <>{children}</>;
};
