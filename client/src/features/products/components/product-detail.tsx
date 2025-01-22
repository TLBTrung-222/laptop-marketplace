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
import { Textarea } from "@/components/ui/textarea";
import { useEffect } from "react";
import {
    ProductDetailInput,
    productDetailSchema,
} from "../schemas/product-detail";

type Props = {
    initialValues?: ProductDetailInput;
    onSubmit: (data: ProductDetailInput) => void;
};

export const ProductDetail = ({ initialValues, onSubmit }: Props) => {
    const form = useForm<ProductDetailInput>({
        resolver: zodResolver(productDetailSchema),
        defaultValues: {
            cpu: "",
            ram: "",
            storage: "",
            gpu: "",
            display: "",
            port: "",
            keyboard: "",
            lan: "",
            wifi: "",
            bluetooth: "",
            webcam: "",
            os: "",
            battery: "",
            weight: 0,
            color: "",
            dimensions: "",
        },
    });

    useEffect(() => {
        if (!initialValues) return;
        form.reset(initialValues);
    }, [initialValues, form]);

    return (
        <Form {...form}>
            <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-4 [&_input]:bg-neutral-50 [&_textarea]:bg-neutral-50"
            >
                <FormField
                    control={form.control}
                    name="cpu"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>CPU</FormLabel>
                            <FormControl>
                                <Input
                                    placeholder="Intel® Core™ Ultra 5 Processor..."
                                    {...field}
                                />
                            </FormControl>

                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="ram"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Ram</FormLabel>
                            <FormControl>
                                <Input
                                    placeholder="16GB DDR4 3200MHz..."
                                    {...field}
                                />
                            </FormControl>

                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="storage"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Storage</FormLabel>
                            <FormControl>
                                <Input
                                    placeholder="1TB PCIe NVMe SSD..."
                                    {...field}
                                />
                            </FormControl>

                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="gpu"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>GPU</FormLabel>
                            <FormControl>
                                <Input
                                    placeholder="NVIDIA® GeForce RTX™ 3060..."
                                    {...field}
                                />
                            </FormControl>

                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="display"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Display</FormLabel>
                            <FormControl>
                                <Input
                                    placeholder="15.6” FHD (1920 x 1080) IPS..."
                                    {...field}
                                />
                            </FormControl>

                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="port"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Port</FormLabel>
                            <FormControl>
                                <Textarea
                                    className="h-40 resize-none"
                                    placeholder="USB-C, USB-A, HDMI, etc..."
                                    {...field}
                                />
                            </FormControl>

                            <FormMessage />
                        </FormItem>
                    )}
                />
                <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                    <FormField
                        control={form.control}
                        name="keyboard"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Keyboard</FormLabel>
                                <FormControl>
                                    <Input
                                        placeholder="Backlit Keyboard..."
                                        {...field}
                                    />
                                </FormControl>

                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="lan"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>LAN</FormLabel>
                                <FormControl>
                                    <Input
                                        placeholder="LAN Port..."
                                        {...field}
                                    />
                                </FormControl>

                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="wifi"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Wifi</FormLabel>
                                <FormControl>
                                    <Input placeholder="Wifi 6..." {...field} />
                                </FormControl>

                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="bluetooth"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Bluetooth</FormLabel>
                                <FormControl>
                                    <Input
                                        placeholder="Bluetooth 5.0..."
                                        {...field}
                                    />
                                </FormControl>

                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="webcam"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Webcam</FormLabel>
                                <FormControl>
                                    <Input
                                        placeholder="720p HD Webcam..."
                                        {...field}
                                    />
                                </FormControl>

                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="os"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>OS</FormLabel>
                                <FormControl>
                                    <Input
                                        placeholder="Windows 10 Home..."
                                        {...field}
                                    />
                                </FormControl>

                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="battery"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Battery</FormLabel>
                                <FormControl>
                                    <Input
                                        placeholder="4-cell 76Whr Battery..."
                                        {...field}
                                    />
                                </FormControl>

                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="weight"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Weight</FormLabel>
                                <FormControl>
                                    <Input
                                        type="number"
                                        placeholder="1.8 kg"
                                        value={field.value}
                                        onChange={(e) => {
                                            field.onChange(+e.target.value);
                                        }}
                                    />
                                </FormControl>

                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="color"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Color</FormLabel>
                                <FormControl>
                                    <Input
                                        placeholder="Black, Silver, etc..."
                                        {...field}
                                    />
                                </FormControl>

                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="dimensions"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Dimensions</FormLabel>
                                <FormControl>
                                    <Input
                                        placeholder="360 x 250 x 20 mm"
                                        {...field}
                                    />
                                </FormControl>

                                <FormMessage />
                            </FormItem>
                        )}
                    />
                </div>

                <div className="flex justify-end">
                    <Button type="submit" variant="admin">
                        Submit
                    </Button>
                </div>
            </form>
        </Form>
    );
};
