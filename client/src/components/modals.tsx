"use client";

import { AuthModal } from "@/features/auth/components/auth-modal";
import { useMounted } from "@/hooks/use-mounted";

export const Modals = () => {
    const mounted = useMounted();

    if (!mounted) return null;

    return (
        <div>
            <AuthModal />
        </div>
    );
};
