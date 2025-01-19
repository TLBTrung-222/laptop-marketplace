"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";
import { Account } from "@/types";
import { useState } from "react";

type Props = {
    seller: Account;
};

export const SellerCell = ({ seller }: Props) => {
    const [expand, setExpand] = useState(false);
    return (
        <div
            className="flex cursor-pointer items-center gap-x-2"
            onClick={() => setExpand(!expand)}
        >
            <Avatar className="size-8">
                <AvatarImage src="https://github.com/shadcn.png" />
                <AvatarFallback>CN</AvatarFallback>
            </Avatar>

            <div className="flex flex-col">
                <p>{seller.name}</p>
                <p
                    className={cn(
                        "w-32 truncate text-xs text-neutral-500",
                        expand && "w-auto",
                    )}
                >
                    {seller.email}
                </p>
            </div>
        </div>
    );
};
