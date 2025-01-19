"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import { SelectOptions } from "@/components/select-options";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useGetBrands } from "@/features/brands/apis/use-get-brands";
import { useGetCategories } from "@/features/category/apis/use-get-categories";
import { STATUS_OPTIONS } from "../constants";
import { ProductInput, productSchema } from "../schemas/product";

export const AddProductForm = () => {
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

    const { data: brands } = useGetBrands();
    const { data: categories } = useGetCategories();

    const brandOptions =
        brands?.map((brand) => ({ label: brand.name, value: brand.id })) || [];

    const categoryOptions =
        categories?.map((category) => ({
            label: category.type,
            value: category.id,
        })) || [];

    // const { mutate, isPending } = useSignIn();

    const onSubmit = (data: ProductInput) => {
        console.log("🚀 ~ onSubmit ~ data:", data);
    };

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
                    <FormField
                        control={form.control}
                        name="categoryId"
                        render={({ field }) => (
                            <FormItem className="flex-1">
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
                            <FormItem className="flex-1">
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
                            <FormItem className="flex-1">
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
                <div className="flex items-start gap-4">
                    <FormField
                        control={form.control}
                        name="price"
                        render={({ field }) => (
                            <FormItem className="flex-1">
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

                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="stockQuantity"
                        render={({ field }) => (
                            <FormItem className="flex-1">
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
                    <Button type="submit" variant="admin">
                        Submit
                    </Button>
                </div>
            </form>
        </Form>
    );
};
