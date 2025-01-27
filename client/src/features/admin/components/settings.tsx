"use client";

import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogContent,
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
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { Settings } from "lucide-react";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useGetProfile } from "../api/use-get-profile";
import { useEditProfile } from "../api/use-update-profile";
import { ProfileInput, profileSchema } from "../schemas/profile";
import { UploadAvatar } from "./upload-avatar";
export const Setting = () => {
    const [open, setOpen] = useState(false);

    const { data: profile, isPending } = useGetProfile();

    const form = useForm<ProfileInput>({
        resolver: zodResolver(profileSchema),
    });

    useEffect(() => {
        if (isPending || !profile) return;
        form.reset(profile);
    }, [isPending, profile, form]);

    const edit = useEditProfile(profile?.id);

    const onSubmit = async (data: ProfileInput) => {
        edit.mutate(data, {
            onSuccess() {
                setOpen(false);
                form.reset();
            },
        });
    };

    return (
        <>
            <Dialog open={open} onOpenChange={setOpen}>
                <DialogTrigger asChild>
                    <Button
                        variant="admin-ghost"
                        size="lg"
                        className="w-full px-3"
                    >
                        <Settings className="!size-5" />
                        <span className="hidden font-medium capitalize md:block">
                            Settings
                        </span>
                    </Button>
                </DialogTrigger>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Edit Profile</DialogTitle>
                    </DialogHeader>
                    <UploadAvatar avatar={profile?.avatar} />
                    <Form {...form}>
                        <form
                            onSubmit={form.handleSubmit(onSubmit)}
                            className="space-y-6"
                        >
                            <FormField
                                control={form.control}
                                name="name"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Name</FormLabel>
                                        <FormControl>
                                            <Input {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="phoneNumber"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Phone Number</FormLabel>
                                        <FormControl>
                                            <Input {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <Button
                                type="submit"
                                className="w-full"
                                variant="admin"
                                disabled={edit.isPending}
                            >
                                Save Changes
                            </Button>
                        </form>
                    </Form>
                </DialogContent>
            </Dialog>
        </>
    );
};
