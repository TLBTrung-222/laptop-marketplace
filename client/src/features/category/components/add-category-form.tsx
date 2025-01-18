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

import { CategoryInput, categorySchema } from "../schemas/category";

export const AddCategoryForm = () => {
    const form = useForm<CategoryInput>({
        resolver: zodResolver(categorySchema),
        defaultValues: {
            type: "",
        },
    });

    // const { mutate, isPending } = useSignIn();

    const onSubmit = (data: CategoryInput) => {
        console.log("🚀 ~ onSubmit ~ data:", data);
    };

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                <FormField
                    control={form.control}
                    name="type"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Type</FormLabel>
                            <FormControl>
                                <Input
                                    placeholder="Ultrabook, Macbook..."
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
