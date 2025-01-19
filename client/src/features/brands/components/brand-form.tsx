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

import { useEffect } from "react";
import { BrandInput, brandSchema } from "../schemas/brand";

type Props = {
    initialValues?: BrandInput;
    onSubmit: (data: BrandInput) => void;
};

export const BrandForm = ({ initialValues, onSubmit }: Props) => {
    const form = useForm<BrandInput>({
        resolver: zodResolver(brandSchema),
        defaultValues: {
            name: "",
        },
    });

    useEffect(() => {
        if (!initialValues) return;

        form.reset(initialValues);
    }, [initialValues, form]);

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
