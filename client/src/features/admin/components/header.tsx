"use client";

import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { UserAvatar } from "@/components/user-avatar";
import { ChevronDown, LogOut, Mail, Phone } from "lucide-react";
import Link from "next/link";
import { useGetProfile } from "../api/use-get-profile";
import { useLogout } from "../api/use-logout";

export const Header = () => {
    const { data } = useGetProfile();
    const { mutate, isPending } = useLogout();

    return (
        <div className="fixed left-0 right-0 top-0 z-40 flex w-full items-center justify-end border-b border-gray-200 bg-white p-4">
            <div className="flex items-center gap-3">
                <div className="relative">
                    <UserAvatar
                        src={data?.avatar}
                        alt={data?.name}
                        className="size-8"
                    />
                    <div className="absolute -bottom-1 -right-1 size-2.5 -translate-x-1/2 rounded-full bg-emerald-500 ring-1 ring-white" />
                </div>
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <div className="flex cursor-pointer items-center gap-3">
                            <div className="leading-none">
                                <p className="text-sm font-semibold capitalize">
                                    {data?.name}
                                </p>
                                <p className="text-xs capitalize text-muted-foreground">
                                    {data?.role.roleName}
                                </p>
                            </div>
                            <ChevronDown className="size-4 text-muted-foreground" />
                        </div>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" sideOffset={10}>
                        <DropdownMenuLabel>My Account</DropdownMenuLabel>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem asChild>
                            <Link href={`mailto:${data?.email}`}>
                                <Mail className="size-4" />
                                {data?.email}
                            </Link>
                        </DropdownMenuItem>
                        <DropdownMenuItem asChild>
                            <Link href={`tel:${data?.phoneNumber}`}>
                                <Phone className="size-4" />
                                0912345678
                            </Link>
                        </DropdownMenuItem>
                        <DropdownMenuItem
                            disabled={isPending}
                            onClick={() => mutate()}
                        >
                            <LogOut className="size-4" />
                            Logout
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            </div>
        </div>
    );
};
