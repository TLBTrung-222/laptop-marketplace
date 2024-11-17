"use client";

import Link from "next/link";
import { useState } from "react";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
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
import { KeyRound, MailIcon, Phone, User2 } from "lucide-react";

import { toast } from "sonner";

import { TogglePassword } from "./toggle-password";

import { useAppStore } from "@/providers/store-provider";
import { useSignUp } from "../api/use-sign-up";
import { SignUpFormValues, signUpSchema } from "../schemas/sign-up";

export const SignUpForm = () => {
    const [isShow, setIsShow] = useState(false);
    const onClose = useAppStore((state) => state.modal.onClose);
    const setUser = useAppStore((state) => state.user.setUser);

    const form = useForm<SignUpFormValues>({
        resolver: zodResolver(signUpSchema),
        defaultValues: {
            name: "Buyer",
            phoneNumber: "+84901234567",
            email: "buyer@gmail.com",
            password: "password",
            agreePolicy: false,
        },
    });

    const { isPending, mutate } = useSignUp();

    const onSubmit = (values: SignUpFormValues) => {
        const { agreePolicy, ...rest } = values;
        mutate(rest, {
            onSuccess(data) {
                toast.success("Create account successful");
                form.reset();
                onClose();
                setUser(data);
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
                            name="name"
                            render={({ field }) => (
                                <FormItem>
                                    <div className="relative">
                                        <User2 className="absolute top-2 left-3 size-5 text-muted-foreground" />
                                        <Input
                                            placeholder="Full Name"
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
                            name="phoneNumber"
                            render={({ field }) => (
                                <FormItem>
                                    <div className="relative">
                                        <Phone className="absolute top-2 left-3 size-5 text-muted-foreground" />
                                        <Input
                                            placeholder="Phone number"
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

                        <FormField
                            control={form.control}
                            name="agreePolicy"
                            render={({ field }) => (
                                <FormItem>
                                    <div className="flex items-center gap-x-2">
                                        <FormControl>
                                            <Checkbox
                                                checked={field.value}
                                                onCheckedChange={field.onChange}
                                            />
                                        </FormControl>
                                        <FormLabel className="text-muted-foreground font-normal">
                                            I agree to all{" "}
                                            <Link
                                                href="#!"
                                                className="text-primary"
                                            >
                                                Terms & Conditions
                                            </Link>
                                        </FormLabel>
                                    </div>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </div>

                    <Button
                        type="submit"
                        disabled={isPending}
                        className="w-full mt-5"
                    >
                        Create Account
                    </Button>
                </form>
            </Form>

            <Separator className="relative text-center my-3">
                <span className="absolute -top-3 -translate-x-1/2 px-2 bg-white text-sm">
                    Or Sign Up with
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
