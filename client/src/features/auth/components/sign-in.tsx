"use client";

import { useState } from "react";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import { Form, FormField, FormItem, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";

import { Icons } from "@/components/icons";
import { KeyRound, MailIcon } from "lucide-react";
import { toast } from "sonner";

import { TogglePassword } from "./toggle-password";

import { useModalStore } from "@/providers/modal-store-provider";
import { useLogin } from "../api/use-sign-in";

const formSchema = z.object({
    email: z.string().email({
        message: "Please enter a valid email address",
    }),
    password: z.string().min(6, {
        message: "Password must be at least 6 characters long",
    }),
});

type FormValues = z.infer<typeof formSchema>;
export type SignInFormValues = FormValues;

export const SignInForm = () => {
    const [isShow, setIsShow] = useState(false);
    const onClose = useModalStore((state) => state.onClose);

    const form = useForm<FormValues>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            email: "buyer@gmail.com",
            password: "password",
        },
    });

    const { isPending, mutate } = useLogin();

    const onSubmit = (values: FormValues) => {
        mutate(values, {
            onSuccess() {
                toast.success("Login successful");
                form.reset();
                onClose();
            },
        });
    };

    return (
        <div className="space-y-6 mt-6">
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)}>
                    <div className="space-y-4">
                        <FormField
                            control={form.control}
                            name="email"
                            render={({ field }) => (
                                <FormItem>
                                    <div className="relative">
                                        <MailIcon className="absolute top-2 left-3 size-5 text-muted-foreground" />
                                        <Input
                                            placeholder="E-mail"
                                            className="pl-10"
                                            {...field}
                                        />
                                    </div>

                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="password"
                            render={({ field }) => (
                                <FormItem>
                                    <div className="relative">
                                        <KeyRound className="absolute top-2 left-3 size-5 text-muted-foreground" />
                                        <Input
                                            type={isShow ? "text" : "password"}
                                            placeholder="Password"
                                            className="pl-10"
                                            {...field}
                                        />
                                        <TogglePassword
                                            show={isShow}
                                            onChange={setIsShow}
                                        />
                                    </div>

                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </div>

                    <div className="text-right mt-1">
                        <Button variant="link" className="text-sm">
                            Forgot Password ?
                        </Button>
                    </div>

                    <Button
                        type="submit"
                        disabled={isPending}
                        className="w-full mt-3"
                    >
                        Login
                    </Button>
                </form>
            </Form>

            <Separator className="relative text-center my-3">
                <span className="absolute -top-3 -translate-x-1/2 px-2 bg-white text-sm">
                    Or Log In with
                </span>
            </Separator>

            <div className="flex gap-x-6">
                <Button variant="outline" className="w-full">
                    <Icons.google className="w-6 h-6 mr-2" />
                    Google
                </Button>

                <Button variant="outline" className="w-full">
                    <Icons.facebook className="w-6 h-6 mr-2 text-primary" />
                    Facebook
                </Button>
            </div>
        </div>
    );
};
