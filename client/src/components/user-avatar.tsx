import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";
import React from "react";

type Props = {
    src: string | null | undefined;
    alt?: string;
    className?: React.HTMLAttributes<HTMLSpanElement>["className"];
};

export const UserAvatar = ({ src, alt, className }: Props) => {
    return (
        <Avatar className={cn(className)}>
            <AvatarImage src={src ?? "https://github.com/shadcn.png"} />
            <AvatarFallback className="capitalize">
                {alt?.at(0) || "A"}
            </AvatarFallback>
        </Avatar>
    );
};
