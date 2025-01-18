"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { SignInInput, signInSchema } from "../schemas/sign-in";

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
import { Separator } from "@/components/ui/separator";

import { Icons } from "@/components/icons";
import { InputPassword } from "@/components/input-password";
import Link from "next/link";
import { useSignIn } from "../apis/use-sign-in";

export const SignInForm = () => {
    const form = useForm<SignInInput>({
        resolver: zodResolver(signInSchema),
        defaultValues: {
            email: "",
            password: "",
        },
    });

    const { mutate, isPending } = useSignIn();

    const onSubmit = (data: SignInInput) => {
        mutate(data);
    };

    return (
        <Form {...form}>
            <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="w-full space-y-4"
            >
                <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Email</FormLabel>
                            <FormControl>
                                <Input
                                    type="email"
                                    placeholder="Your email"
                                    {...field}
                                />
                            </FormControl>

                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="password"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Password</FormLabel>
                            <FormControl>
                                <InputPassword field={field} />
                            </FormControl>

                            <FormMessage />
                        </FormItem>
                    )}
                />

                <Link
                    href="/forgot-password"
                    className="mt-2 inline-block text-right text-xs font-normal text-blue-500 hover:underline"
                >
                    Forgot password?
                </Link>

                <Button
                    type="submit"
                    size="lg"
                    className="w-full bg-blue-600 hover:bg-blue-600/80"
                    disabled={isPending}
                >
                    Sign in
                </Button>

                <Separator />

                <Button
                    type="button"
                    variant="outline"
                    size="lg"
                    className="w-full"
                >
                    <Icons.google />
                    Or sign in with Google
                </Button>
            </form>
        </Form>
    );
};
