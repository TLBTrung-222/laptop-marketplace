"use client";

import { useGetProfile } from "@/features/admin/api/use-get-profile";
import { useRouter } from "next/navigation";

type Props = {
    children: React.ReactNode;
};

export const Auth = ({ children }: Props) => {
    const router = useRouter();
    const { isError } = useGetProfile();

    if (isError) {
        router.push("/sign-in");
    }

    return <>{children}</>;
};
