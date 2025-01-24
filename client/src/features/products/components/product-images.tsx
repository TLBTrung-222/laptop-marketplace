"use client";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Upload, X } from "lucide-react";
import Image from "next/image";
import { DragEvent, useRef, useState } from "react";

export type UploadedFile = {
    id: string;
    file: File;
    preview: string;
};

type Props = {
    maxFiles?: number;
    onImagesUploaded: (files: File[]) => void;
    className?: React.HTMLAttributes<HTMLDivElement>["className"];
};

export const ProductImages = ({
    maxFiles = 5,
    onImagesUploaded,
    className,
}: Props) => {
    const [isDragging, setIsDragging] = useState(false);
    const [uploadedFiles, setUploadedFiles] = useState<UploadedFile[]>([]);
    const fileInputRef = useRef<HTMLInputElement>(null);

    const handleFiles = (files: File[]) => {
        const imageFiles = files.filter((file) =>
            file.type.startsWith("image/"),
        );
        const remainingSlots = maxFiles - uploadedFiles.length;
        const filesToProcess = imageFiles.slice(0, remainingSlots);

        filesToProcess.forEach((file) => {
            const reader = new FileReader();
            reader.onload = (e) => {
                setUploadedFiles((prev) => {
                    const newFiles: UploadedFile[] = [
                        ...prev,
                        {
                            id: crypto.randomUUID(),
                            file,
                            preview: e.target?.result as string,
                        },
                    ];
                    onImagesUploaded(newFiles.map((f) => f.file));
                    return newFiles;
                });
            };
            reader.readAsDataURL(file);
        });
    };

    const removeFile = (id: string) => {
        setUploadedFiles((prev) => {
            const newFiles = prev.filter((f) => f.id !== id);
            onImagesUploaded(newFiles.map((f) => f.file));
            return newFiles;
        });
    };

    const onClick = () => {
        fileInputRef.current?.click();
    };

    const onDragOver = (e: DragEvent) => {
        e.preventDefault();
        setIsDragging(true);
    };

    const onDragLeave = (e: DragEvent) => {
        e.preventDefault();
        setIsDragging(false);
    };

    const onDrop = (e: DragEvent) => {
        e.preventDefault();
        setIsDragging(false);

        handleFiles(Array.from(e.dataTransfer.files));
    };

    const onFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files?.length) {
            handleFiles(Array.from(e.target.files));
        }
    };

    return (
        <div className={cn("w-full space-y-4", className)}>
            {uploadedFiles.length > 0 && (
                <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
                    {uploadedFiles.map((file) => (
                        <div
                            key={file.id}
                            className="group relative aspect-square"
                        >
                            <Image
                                src={file.preview || "/product-image.svg"}
                                alt={file.file.name}
                                fill
                                className="size-full rounded-lg object-cover"
                            />
                            <button
                                onClick={() => removeFile(file.id)}
                                className="absolute right-2 top-2 rounded-full bg-background/80 p-1 text-foreground opacity-0 transition-opacity group-hover:opacity-100"
                            >
                                <X className="size-4" />
                            </button>
                        </div>
                    ))}
                </div>
            )}

            {uploadedFiles.length < maxFiles && (
                <div
                    className={cn(
                        "relative min-h-[200px] cursor-pointer rounded-lg border-2 border-dashed border-muted-foreground/25 transition-colors hover:border-muted-foreground/50",
                        isDragging && "border-primary bg-muted/50",
                    )}
                    onDragOver={onDragOver}
                    onDragLeave={onDragLeave}
                    onDrop={onDrop}
                    onClick={onClick}
                >
                    <input
                        ref={fileInputRef}
                        type="file"
                        className="hidden"
                        accept="image/*"
                        multiple
                        onChange={onFileInputChange}
                    />
                    <div className="absolute inset-0 flex flex-col items-center justify-center gap-4 p-4">
                        <div className="rounded-full bg-muted p-4">
                            <Upload className="size-6 text-muted-foreground" />
                        </div>
                        <div className="text-center">
                            <p className="text-sm text-muted-foreground">
                                Drag & Drop images here or click to upload
                            </p>
                            <p className="mt-1 text-xs text-muted-foreground">
                                {uploadedFiles.length} of {maxFiles} files
                                uploaded
                            </p>
                            <Button
                                variant="admin-secondary"
                                className="mt-2 bg-admin-50 hover:bg-admin-50/80"
                                onClick={(e) => {
                                    e.stopPropagation();
                                    onClick();
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
};
