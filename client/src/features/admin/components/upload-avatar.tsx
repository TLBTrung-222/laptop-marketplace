"use client";

import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
} from "@/components/ui/form";
import { UserAvatar } from "@/components/user-avatar";
import { zodResolver } from "@hookform/resolvers/zod";
import { Camera, Loader } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useUploadAvatar } from "../api/use-upload-avatar";

const formSchema = z.object({
    avatar: z.any(),
});

type FormValues = z.infer<typeof formSchema>;

type Props = {
    avatar?: string | null;
};

export const UploadAvatar = ({ avatar }: Props) => {
    const [preview, setPreview] = useState<string | null>(avatar || null);

    const form = useForm<FormValues>({
        resolver: zodResolver(formSchema),
    });

    const handleFileChange = (files: FileList | null) => {
        const file = files?.[0];

        if (file) {
            const url = URL.createObjectURL(file);
            setPreview(url);

            form.setValue("avatar", file);
            form.handleSubmit(onSubmit)();
        }
    };

    const { mutate, isPending } = useUploadAvatar();

    const onSubmit = async (data: FormValues) => {
        const file = data.avatar;
        if (!file || !(file instanceof File)) {
            console.error("No valid file provided");
            return;
        }

        const formData = new FormData();
        formData.append("avatar", file);

        mutate(formData, {
            onSuccess() {
                URL.revokeObjectURL(preview!);
            },
        });
    };

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="mx-auto">
                <FormField
                    control={form.control}
                    name="avatar"
                    render={({ field: { onChange, value, ...field } }) => (
                        <FormItem className="relative h-20 w-20">
                            <UserAvatar
                                className="size-20"
                                src={preview}
                                alt="Avatar"
                            />
                            <div className="absolute -bottom-1 -right-1 cursor-pointer rounded-full bg-admin-50 p-1 ring-2 ring-white">
                                {isPending ? (
                                    <Loader className="size-5 animate-spin text-admin" />
                                ) : (
                                    <FormLabel className="cursor-pointer">
                                        <Camera className="size-5 text-admin" />
                                    </FormLabel>
                                )}
                            </div>

                            <FormControl>
                                <input
                                    type="file"
                                    accept="image/*"
                                    className="hidden"
                                    disabled={isPending}
                                    onChange={(e) => {
                                        handleFileChange(e.target.files);
                                        onChange(e.target.files);
                                    }}
                                    {...field}
                                />
                            </FormControl>
                        </FormItem>
                    )}
                />
            </form>
        </Form>
    );
};
