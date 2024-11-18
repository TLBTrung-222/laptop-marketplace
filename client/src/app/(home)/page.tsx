"use client";

import { Button } from "@/components/ui/button";
import { useAppStore } from "@/providers/store-provider";

export default function AppPage() {
    const onOpen = useAppStore((state) => state.modal.onOpen);
    return (
        <div>
            <Button onClick={() => onOpen("auth")}>Login/Sign up</Button>
        </div>
    );
}
