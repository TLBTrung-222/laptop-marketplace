"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { DEFAULT_AVATAR } from "@/constants";
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
            <Avatar className="size-0 md:size-6 lg:size-8">
                <AvatarImage src={seller.avatar ?? DEFAULT_AVATAR} />
                <AvatarFallback className="capitalize">
                    {seller.name[0]}
                </AvatarFallback>
            </Avatar>

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
