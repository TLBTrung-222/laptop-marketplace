"use client";

import { UserAvatar } from "@/components/user-avatar";
import { cn } from "@/lib/utils";
import { Account } from "@/types";
import { useState } from "react";

type Props = {
    seller: Account;
};

export const SellerCell = ({ seller }: Props) => {
    console.log("🚀 ~ SellerCell ~ seller:", seller);
    const [expand, setExpand] = useState(false);
    return (
        <div
            className="flex cursor-pointer items-center gap-x-2"
            onClick={() => setExpand(!expand)}
        >
            <UserAvatar
                src={seller.avatar}
                alt={seller.name}
                className="size-6 lg:size-8"
            />

            <div className="flex flex-col">
                <p>{seller.name}</p>
                <p
                    className={cn(
                        "hidden w-32 truncate text-xs text-neutral-500 lg:block",
                        expand && "w-auto",
                    )}
                >
                    {seller.email}
                </p>
            </div>
        </div>
    );
};
