"use client";

import {
    Calendar,
    Check,
    Container,
    FileSearch,
    Mail,
    Phone,
    X,
} from "lucide-react";

import { Icons } from "@/components/icons";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { UserAvatar } from "@/components/user-avatar";
import { useConfirm } from "@/hooks/use-confirm";
import { formatPrice } from "@/lib/utils";
import { Approval } from "@/types";
import { format } from "date-fns";
import Image from "next/image";
import { useState } from "react";
import { useGetAdminApproval } from "../apis/use-get-admin-approval";
import { usePreviewApproval } from "../apis/use-preview";
import { ApprovalBadge } from "./approval-badge";

interface Props {
    id: number;
}

export const RowActions = ({ id }: Props) => {
    const [open, setOpen] = useState(false);
    const { confirm, ConfirmationDialog } = useConfirm(
        "Are you sure you want to approve this product?",
        "This will make the product available for sale on the platform",
    );

    const { isPending, mutate } = usePreviewApproval(id);

    const { isLoading, data: approval } = useGetAdminApproval(id);

    if (isLoading || !approval) {
        return null;
    }

    const { product, seller, approvalStatus, submissionDate } = approval;

    const onApprove = async (status: Approval["approvalStatus"]) => {
        if (status === "approved") {
            const ok = await confirm();
            if (!ok) {
                return;
            }
        }

        mutate(status, {
            onSuccess: () => {
                setOpen(false);
            },
        });
    };

    return (
        <>
            <ConfirmationDialog />
            <Dialog open={open} onOpenChange={setOpen}>
                <DialogTrigger asChild>
                    <Button
                        variant="admin-ghost"
                        size="icon"
                        className="justify-center"
                    >
                        <FileSearch />
                    </Button>
                </DialogTrigger>
                <DialogContent className="lg:max-w-xl">
                    <DialogHeader>
                        <DialogTitle>Product Approval Request</DialogTitle>
                        <DialogDescription>
                            Review the product details and seller information
                            below
                        </DialogDescription>
                    </DialogHeader>

                    <div className="flex items-center gap-x-4">
                        <UserAvatar src={seller.avatar} alt={seller.name} />
                        <div className="mr-auto">
                            <h2 className="text-lg font-semibold">
                                {seller.name}
                            </h2>
                            <p className="flex items-center text-sm text-muted-foreground">
                                <Mail className="mr-1 size-4" />
                                {seller.email}
                            </p>
                            <p className="flex items-center text-sm text-muted-foreground">
                                <Phone className="mr-1 size-4" />
                                {seller.phoneNumber}
                            </p>
                        </div>
                        <ApprovalBadge status={approvalStatus} />
                    </div>

                    <Separator />

                    <ScrollArea className="max-h-[calc(100vh-20rem)] pr-3">
                        <div className="grid grid-cols-1 gap-x-8 gap-y-4 lg:grid-cols-2">
                            <div className="relative flex items-center justify-center">
                                <Image
                                    src="/product.png"
                                    alt={product.name}
                                    width={300}
                                    height={300}
                                    className="block"
                                />
                                <Badge
                                    variant={product.status}
                                    className="absolute right-0 top-0 rounded-full ring-2 ring-white"
                                >
                                    {product.status}
                                </Badge>
                            </div>
                            <div className="space-y-2">
                                <div className="flex items-center text-sm text-muted-foreground lg:text-xs">
                                    <Calendar className="mr-2 size-4" />
                                    {format(
                                        new Date(submissionDate),
                                        "PPP 'at' p",
                                    )}
                                </div>
                                <h1 className="text-2xl font-semibold">
                                    {product.name}
                                </h1>
                                <div className="flex items-center gap-x-4">
                                    <div className="flex items-center">
                                        <Icons.vnd className="mr-1 size-5" />
                                        {formatPrice(product.price)}
                                    </div>
                                    <div className="flex items-center">
                                        <Container className="mr-1 size-4" />
                                        {product.stockQuantity}
                                    </div>
                                </div>

                                <p className="line-clamp-3 text-sm text-muted-foreground">
                                    {product.description}
                                </p>
                            </div>
                        </div>
                    </ScrollArea>
                    <div className="flex items-center justify-end gap-x-2">
                        <Button
                            variant="destructive"
                            disabled={isPending}
                            onClick={() => onApprove("rejected")}
                        >
                            <X />
                            Reject
                        </Button>
                        <Button
                            variant="admin"
                            disabled={isPending}
                            onClick={() => onApprove("approved")}
                        >
                            <Check />
                            Approve
                        </Button>
                    </div>
                </DialogContent>
            </Dialog>
        </>
    );
};
