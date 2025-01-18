"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

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

import { BrandInput, brandSchema } from "../schemas/brand";

export const AddBrandForm = () => {
    const form = useForm<BrandInput>({
        resolver: zodResolver(brandSchema),
        defaultValues: {
            name: "",
        },
    });

    // const { mutate, isPending } = useSignIn();

    const onSubmit = (data: BrandInput) => {
        console.log("🚀 ~ onSubmit ~ data:", data);
    };

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Name</FormLabel>
                            <FormControl>
                                <Input
                                    placeholder="Asus, Dell, HP, etc."
                                    {...field}
                                />
                            </FormControl>

                            <FormMessage />
                        </FormItem>
                    )}
                />
                <div className="flex justify-end space-x-4">
                    <Button type="submit" variant="admin">
                        Submit
                    </Button>
                </div>
            </form>
        </Form>
    );
};
