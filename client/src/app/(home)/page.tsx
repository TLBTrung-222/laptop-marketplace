"use client";

import { Button } from "@/components/ui/button";
import { useModalStore } from "@/providers/modal-store-provider";

export default function AppPage() {
    const onOpen = useModalStore((state) => state.onOpen);
    return (
        <div>
            <Button onClick={() => onOpen("auth")}>Login/Sign up</Button>
        </div>
    );
}
