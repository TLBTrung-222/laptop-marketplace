"use client";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Image as TImage } from "@/types";
import { Loader2, Upload, X } from "lucide-react";
import Image from "next/image";
import { useRef, useState } from "react";

export interface UploadedFile {
    id: string;
    file: File;
    preview: string;
}

export interface MultiImageUploadProps {
    initialImages: TImage[];
    onImagesUpload: (files: File[]) => Promise<void>;
    onRemoveImage: (image: string) => Promise<void>;
    maxFiles?: number;
    className?: string;
}

export default function MultiImageUpload({
    initialImages = [],
    onImagesUpload,
    onRemoveImage,
    maxFiles = 5,
    className,
}: MultiImageUploadProps) {
    const [isDragging, setIsDragging] = useState(false);
    const [uploadedFiles, setUploadedFiles] = useState<UploadedFile[]>([]);
    const [isUploading, setIsUploading] = useState(false);
    const [removingImages, setRemovingImages] = useState<Set<string>>(
        new Set(),
    );
    const fileInputRef = useRef<HTMLInputElement>(null);

    const totalImages = uploadedFiles.length + initialImages.length;

    const handleDragOver = (e: React.DragEvent) => {
        e.preventDefault();
        setIsDragging(true);
    };

    const handleDragLeave = (e: React.DragEvent) => {
        e.preventDefault();
        setIsDragging(false);
    };

    const handleDrop = async (e: React.DragEvent) => {
        e.preventDefault();
        setIsDragging(false);
        await handleFiles(Array.from(e.dataTransfer.files));
    };

    const handleFileInput = async (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files?.length) {
            await handleFiles(Array.from(e.target.files));
        }
    };

    const handleFiles = async (files: File[]) => {
        try {
            setIsUploading(true);
            const imageFiles = files.filter((file) =>
                file.type.startsWith("image/"),
            );
            const remainingSlots = maxFiles - totalImages;
            const filesToProcess = imageFiles.slice(0, remainingSlots);

            const newFiles: UploadedFile[] = await Promise.all(
                filesToProcess.map(async (file) => {
                    return new Promise((resolve) => {
                        const reader = new FileReader();
                        reader.onload = (e) => {
                            resolve({
                                id: Math.random().toString(36).slice(2),
                                file,
                                preview: e.target?.result as string,
                            });
                        };
                        reader.readAsDataURL(file);
                    });
                }),
            );

            setUploadedFiles((prev) => [...prev, ...newFiles]);

            if (newFiles.length > 0) {
                await onImagesUpload(newFiles.map((f) => f.file));

                setUploadedFiles([]);
            }
        } catch (error) {
            console.error("Error uploading files:", error);

            setUploadedFiles([]);
        } finally {
            setIsUploading(false);
        }
    };

    const removeImage = async (image: string) => {
        if (removingImages.has(image)) return;

        try {
            setRemovingImages((prev) => new Set(prev).add(image));
            await onRemoveImage(image);
        } catch (error) {
            console.error("Error removing image:", error);
        } finally {
            setRemovingImages((prev) => {
                const next = new Set(prev);
                next.delete(image);
                return next;
            });
        }
    };

    const handleClick = () => {
        fileInputRef.current?.click();
    };

    return (
        <div className={cn("w-full space-y-4", className)}>
            {(initialImages.length > 0 || uploadedFiles.length > 0) && (
                <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
                    {initialImages.map((image) => (
                        <div
                            key={image.id}
                            className="group relative aspect-square"
                        >
                            <Image
                                src={image.image || "/product-image.svg"}
                                alt={`Image ${image.id}`}
                                fill
                                className="h-full w-full rounded-lg object-cover"
                            />
                            <button
                                onClick={() => removeImage(image.image)}
                                disabled={removingImages.has(image.image)}
                                className={cn(
                                    "absolute right-2 top-2 rounded-full bg-background/80 p-1",
                                    "opacity-0 transition-opacity group-hover:opacity-100",
                                    "disabled:cursor-not-allowed",
                                )}
                            >
                                {removingImages.has(image.image) ? (
                                    <Loader2 className="h-4 w-4 animate-spin" />
                                ) : (
                                    <X className="h-4 w-4" />
                                )}
                            </button>
                        </div>
                    ))}

                    {uploadedFiles.map((file) => (
                        <div
                            key={file.id}
                            className="group relative aspect-square"
                        >
                            <Image
                                src={file.preview || "/product-image.svg"}
                                alt="Preview"
                                fill
                                className="h-full w-full rounded-lg object-cover opacity-50"
                            />
                            <div className="absolute inset-0 flex items-center justify-center">
                                <Loader2 className="h-6 w-6 animate-spin" />
                            </div>
                        </div>
                    ))}
                </div>
            )}

            {totalImages < maxFiles && (
                <div
                    className={cn(
                        "relative rounded-lg border-2 border-dashed border-muted-foreground/25 transition-colors",
                        "hover:border-muted-foreground/50",
                        isDragging && "border-primary bg-muted/50",
                        "min-h-[200px] cursor-pointer",
                        isUploading && "pointer-events-none opacity-50",
                    )}
                    onDragOver={handleDragOver}
                    onDragLeave={handleDragLeave}
                    onDrop={handleDrop}
                    onClick={handleClick}
                >
                    <input
                        ref={fileInputRef}
                        type="file"
                        className="hidden"
                        accept="image/*"
                        multiple
                        onChange={handleFileInput}
                        disabled={isUploading}
                    />

                    <div className="absolute inset-0 flex flex-col items-center justify-center gap-4 p-4">
                        <div className="rounded-full bg-muted p-4">
                            {isUploading ? (
                                <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
                            ) : (
                                <Upload className="h-6 w-6 text-muted-foreground" />
                            )}
                        </div>
                        <div className="text-center">
                            <p className="text-sm text-muted-foreground">
                                {isUploading
                                    ? "Uploading..."
                                    : "Drag and drop images here, or click to add"}
                            </p>
                            <p className="mt-1 text-xs text-muted-foreground">
                                {totalImages} of {maxFiles} files uploaded
                            </p>
                            <Button
                                variant="secondary"
                                className="mt-2"
                                disabled={isUploading}
                                onClick={(e) => {
                                    e.stopPropagation();
                                    handleClick();
                                }}
                            >
                                Add Images
                            </Button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
