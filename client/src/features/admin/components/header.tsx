"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
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
                    <Avatar className="size-8">
                        <AvatarImage src="https://github.com/shadcn.png" />
                        <AvatarFallback>CN</AvatarFallback>
                    </Avatar>
                    <div className="absolute -bottom-1 -right-1 size-2.5 -translate-x-1/2 rounded-full bg-emerald-500 ring-1 ring-white" />
                </div>
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <div className="flex items-center gap-3">
                            <div className="leading-none">
                                <p className="text-sm font-semibold">
                                    Jay Hargudson
                                </p>
                                <p className="text-xs text-muted-foreground">
                                    Admin
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
                                admin@gmail.com
                            </Link>
                        </DropdownMenuItem>
                        <DropdownMenuItem asChild>
                            <Link href={`tel:${data?.phone}`}>
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
