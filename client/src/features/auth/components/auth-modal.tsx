"use client";

import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

import { SignInForm } from "./sign-in";
import { SignUpForm } from "./sign-up";

import { useAppStore } from "@/providers/store-provider";

export const AuthModal = () => {
    const { isOpen, type, onClose } = useAppStore((state) => state.modal);

    const isModalOpen = isOpen && type === "auth";

    return (
        <Dialog open={isModalOpen} onOpenChange={onClose}>
            <DialogContent className="px-10 py-10">
                <DialogHeader>
                    <DialogTitle>Welcome Back!</DialogTitle>
                    <DialogDescription>
                        Please log in to continue, or create a new account to
                        get started.
                    </DialogDescription>
                </DialogHeader>
                <Tabs defaultValue="login">
                    <TabsList className="grid w-full grid-cols-2">
                        <TabsTrigger value="login">Log in</TabsTrigger>
                        <TabsTrigger value="signUp">Create Account</TabsTrigger>
                    </TabsList>
                    <TabsContent value="login">
                        <SignInForm />
                    </TabsContent>
                    <TabsContent value="signUp">
                        <SignUpForm />
                    </TabsContent>
                </Tabs>
            </DialogContent>
        </Dialog>
    );
};
