"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import { SelectOptions } from "@/components/select-options";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { formatPrice } from "@/lib/utils";
import { Product } from "@/types";
import { useEffect } from "react";
import { STATUS_OPTIONS } from "../constants";
import { useGetBrandsOpts } from "../hooks/get-brands-opts";
import { useGetCategoriesOpts } from "../hooks/get-categories-opts";
import { ProductInput, productSchema } from "../schemas/product";

type Props = {
    initialValues?: Product;
    onSubmit: (data: ProductInput) => void;
    disabled?: boolean;
};

export const ProductForm = ({ initialValues, onSubmit, disabled }: Props) => {
    const form = useForm<ProductInput>({
        resolver: zodResolver(productSchema),
        defaultValues: {
            name: "",
            description: "",
            status: "new",
            price: 0,
            stockQuantity: 0,
        },
    });

    const brandOptions = useGetBrandsOpts();
    const categoryOptions = useGetCategoriesOpts();

    useEffect(() => {
        if (!initialValues || !categoryOptions.length || !brandOptions.length)
            return;

        const { brand, category, seller, ratings, ...rest } = initialValues;

        form.reset({
            ...rest,
            brandId: initialValues.brand.id.toString(),
            categoryId: initialValues.category.id.toString(),
        });
    }, [initialValues, form, categoryOptions.length, brandOptions.length]);

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
                    <FormField
                        control={form.control}
                        name="categoryId"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Category</FormLabel>
                                <SelectOptions
                                    options={categoryOptions}
                                    field={field}
                                    placeholder="Select a category"
                                />

                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="brandId"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Brand</FormLabel>
                                <SelectOptions
                                    options={brandOptions}
                                    field={field}
                                    placeholder="Select a brand"
                                />

                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="status"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Status</FormLabel>
                                <SelectOptions
                                    options={STATUS_OPTIONS}
                                    field={field}
                                    placeholder="Select a status"
                                />

                                <FormMessage />
                            </FormItem>
                        )}
                    />
                </div>
                <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Product Name</FormLabel>
                            <FormControl>
                                <Input
                                    className="bg-neutral-50"
                                    placeholder="Asus, Dell, HP, etc."
                                    {...field}
                                />
                            </FormControl>

                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="description"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Description</FormLabel>
                            <FormControl>
                                <Textarea
                                    className="h-32 resize-none bg-neutral-50 placeholder:text-neutral-400"
                                    placeholder="Beautify your product with a description..."
                                    {...field}
                                />
                            </FormControl>

                            <FormMessage />
                        </FormItem>
                    )}
                />
                <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                    <FormField
                        control={form.control}
                        name="price"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Price</FormLabel>
                                <FormControl>
                                    <div className="relative">
                                        <Input
                                            className="bg-neutral-50"
                                            type="number"
                                            placeholder="Price"
                                            value={field.value}
                                            onChange={(e) =>
                                                field.onChange(+e.target.value)
                                            }
                                        />
                                        <Badge
                                            variant="secondary"
                                            className="absolute right-2 top-1/2 -translate-y-1/2 transform rounded-sm bg-neutral-200 px-2 text-xs text-muted-foreground"
                                        >
                                            VND
                                        </Badge>
                                    </div>
                                </FormControl>
                                <FormDescription>
                                    Price: {formatPrice(field.value)}
                                </FormDescription>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="stockQuantity"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Stock Quantity</FormLabel>
                                <FormControl>
                                    <Input
                                        type="number"
                                        className="bg-neutral-50"
                                        placeholder="Stock quantity"
                                        value={field.value}
                                        onChange={(e) =>
                                            field.onChange(+e.target.value)
                                        }
                                    />
                                </FormControl>

                                <FormMessage />
                            </FormItem>
                        )}
                    />
                </div>
                <div className="flex justify-end space-x-4">
                    <Button type="submit" variant="admin" disabled={disabled}>
                        Submit
                    </Button>
                </div>
            </form>
        </Form>
    );
};
