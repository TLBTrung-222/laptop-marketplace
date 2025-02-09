"use client";

import { ShoppingBag } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { formatPrice } from "@/lib/utils";
import { Order } from "@/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { format } from "date-fns";
import {
    BadgeCheck,
    Calendar,
    CreditCard,
    Mail,
    MapPin,
    Package,
    Phone,
    Truck,
    User,
} from "lucide-react";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { ShippingInput, shippingSchema } from "@/features/admin-orders/schemas/shipping";
import { useUpdateShipping } from "@/features/admin-orders/apis/use-update-shipping";
import { SHIPPING_STATUS } from "@/features/admin-orders/constants";

interface Props {
    order: Order;
}

export const RowActions = ({ order }: Props) => {
    const [open, setOpen] = useState(false);

    const form = useForm<ShippingInput>({
        resolver: zodResolver(shippingSchema),
    });

    const {
        id,
        totalAmount,
        orderStatus,
        orderDate,
        payment,
        shipping,
        buyer,
    } = order;

    useEffect(() => {
        form.reset({
            status: shipping.shippingStatus,
        });
    }, [form, shipping.shippingStatus]);

    const { isPending, mutate } = useUpdateShipping(order.id);

    const onSubmit = (data: ShippingInput) => {
        mutate(data, {
            onSuccess: () => {
                setOpen(false);
            },
        });
    };

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button
                    variant="admin-ghost"
                    size="icon"
                    className="justify-center"
                >
                    <ShoppingBag />
                </Button>
            </DialogTrigger>
            <DialogContent className="lg:max-w-xl">
                <DialogHeader>
                    <DialogTitle>Order Detail</DialogTitle>
                    <DialogDescription>Order ID: {id}</DialogDescription>
                </DialogHeader>

                <ScrollArea className="max-h-[calc(100vh-10rem)] pr-4">
                    <Form {...form}>
                        <form
                            className="space-y-6"
                            onSubmit={form.handleSubmit(onSubmit)}
                        >
                            <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
                                <Card>
                                    <CardHeader>
                                        <div className="flex items-center justify-between">
                                            <CardTitle>Order #{id}</CardTitle>
                                            <Badge
                                                variant={
                                                    orderStatus === "completed"
                                                        ? "approved"
                                                        : "pending"
                                                }
                                                className="capitalize"
                                            >
                                                {orderStatus}
                                            </Badge>
                                        </div>
                                    </CardHeader>
                                    <CardContent className="space-y-4">
                                        <div className="flex items-center gap-2">
                                            <Calendar className="h-4 w-4 text-muted-foreground" />
                                            <span className="text-sm text-muted-foreground">
                                                Ordered on{" "}
                                                {format(
                                                    new Date(orderDate),
                                                    "PPP",
                                                )}
                                            </span>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <CreditCard className="h-4 w-4 text-muted-foreground" />
                                            <span className="text-sm font-medium">
                                                {formatPrice(totalAmount)}
                                            </span>
                                        </div>
                                    </CardContent>
                                </Card>

                                <Card>
                                    <CardHeader>
                                        <CardTitle className="flex items-center gap-2">
                                            Information
                                        </CardTitle>
                                    </CardHeader>
                                    <CardContent className="space-y-4">
                                        <div className="grid grid-cols-2 gap-4">
                                            <div className="space-y-2">
                                                <div className="flex items-center gap-2">
                                                    <User className="h-4 w-4 shrink-0 text-muted-foreground" />
                                                    <span className="font-medium capitalize">
                                                        {buyer.name}
                                                    </span>
                                                </div>
                                                <div className="flex items-center gap-2">
                                                    <Mail className="h-4 w-4 shrink-0 text-muted-foreground" />
                                                    <span className="text-sm">
                                                        {buyer.email}
                                                    </span>
                                                </div>
                                                <div className="flex items-center gap-2">
                                                    <Phone className="h-4 w-4 shrink-0 text-muted-foreground" />
                                                    <span className="text-sm">
                                                        {buyer.phoneNumber}
                                                    </span>
                                                </div>
                                            </div>
                                        </div>
                                    </CardContent>
                                </Card>
                            </div>

                            <Card>
                                <CardHeader>
                                    <CardTitle className="flex items-center gap-2">
                                        <CreditCard className="h-5 w-5" />{" "}
                                        Payment Information
                                    </CardTitle>
                                </CardHeader>
                                <CardContent className="space-y-4">
                                    <div className="grid grid-cols-2 gap-4">
                                        <div>
                                            <p className="text-sm text-muted-foreground">
                                                Method
                                            </p>
                                            <p className="font-medium uppercase">
                                                {payment.paymentMethod}
                                            </p>
                                        </div>
                                        <div>
                                            <p className="text-sm text-muted-foreground">
                                                Amount
                                            </p>
                                            <p className="font-medium">
                                                {formatPrice(
                                                    payment.paymentAmount,
                                                )}
                                            </p>
                                        </div>
                                        <div>
                                            <p className="text-sm text-muted-foreground">
                                                Status
                                            </p>
                                            <div className="flex items-center gap-2">
                                                <BadgeCheck className="h-4 w-4 text-green-500" />
                                                <span className="font-medium">
                                                    {payment.paymentStatus === 1
                                                        ? "Paid"
                                                        : "Pending"}
                                                </span>
                                            </div>
                                        </div>
                                        <div>
                                            <p className="text-sm text-muted-foreground">
                                                Date
                                            </p>
                                            <p className="font-medium">
                                                {payment.paymentDate &&
                                                    format(
                                                        new Date(
                                                            payment.paymentDate,
                                                        ),
                                                        "PPP",
                                                    )}
                                            </p>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>

                            <Card>
                                <CardHeader>
                                    <CardTitle className="flex items-center gap-2">
                                        <Truck className="h-5 w-5" /> Shipping
                                        Details
                                    </CardTitle>
                                </CardHeader>
                                <CardContent className="space-y-4">
                                    <FormField
                                        control={form.control}
                                        name="status"
                                        render={({ field }) => (
                                            <FormItem className="flex items-center gap-2">
                                                <FormLabel>
                                                    <Package className="size-5 flex-shrink-0 text-muted-foreground" />
                                                </FormLabel>
                                                <Select
                                                    onValueChange={
                                                        field.onChange
                                                    }
                                                    value={field.value}
                                                >
                                                    <FormControl>
                                                        <SelectTrigger className="capitalize">
                                                            <SelectValue placeholder="Select shipping status" />
                                                        </SelectTrigger>
                                                    </FormControl>
                                                    <SelectContent>
                                                        {SHIPPING_STATUS.map(
                                                            (status) => (
                                                                <SelectItem
                                                                    key={status}
                                                                    value={
                                                                        status
                                                                    }
                                                                    className="capitalize"
                                                                >
                                                                    {status}
                                                                </SelectItem>
                                                            ),
                                                        )}
                                                    </SelectContent>
                                                </Select>

                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />

                                    <div className="space-y-2">
                                        <p className="text-sm text-muted-foreground">
                                            Delivery Address
                                        </p>
                                        <div className="flex items-start gap-2">
                                            <MapPin className="mt-1 h-4 w-4 text-muted-foreground" />
                                            <div>
                                                <p className="font-medium">
                                                    {shipping.street}
                                                </p>
                                                <p className="text-sm text-muted-foreground">
                                                    {shipping.district},{" "}
                                                    {shipping.city}
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                    <Separator />
                                    <div className="grid grid-cols-2 gap-4">
                                        <div>
                                            <p className="text-sm text-muted-foreground">
                                                Shipping Date
                                            </p>
                                            <p className="font-medium">
                                                {format(
                                                    new Date(
                                                        shipping.shippingDate,
                                                    ),
                                                    "PPP",
                                                )}
                                            </p>
                                        </div>
                                        <div>
                                            <p className="text-sm text-muted-foreground">
                                                Delivery Date
                                            </p>
                                            <p className="font-medium">
                                                {shipping.deliveryDate
                                                    ? format(
                                                          new Date(
                                                              shipping.deliveryDate,
                                                          ),
                                                          "PPP",
                                                      )
                                                    : "Pending"}
                                            </p>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>

                            <div className="flex items-center justify-end">
                                <Button
                                    type="submit"
                                    variant="admin"
                                    disabled={isPending}
                                    className="w-full lg:w-auto"
                                >
                                    Submit
                                </Button>
                            </div>
                        </form>
                    </Form>
                </ScrollArea>
            </DialogContent>
        </Dialog>
    );
};
