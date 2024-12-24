'use client'

import Image from "next/image"
import { useState } from "react"
import { cn } from "@/lib/utils"

interface ProductGalleryProps {
  images: string[]
}

export function ProductGallery({ images }: ProductGalleryProps) {
  const [selectedImage, setSelectedImage] = useState(0)

  return (
    <div className="space-y-4">
      <div className="relative aspect-square overflow-hidden rounded-lg">
        <Image
          src={images[selectedImage]}
          alt="Product image"
          className="object-cover"
          fill
          priority
        />
      </div>
      <div className="grid grid-cols-4 gap-4">
        {images.map((image, index) => (
          <button
            key={index}
            onClick={() => setSelectedImage(index)}
            className={cn(
              "relative aspect-square overflow-hidden rounded-lg border-2",
              selectedImage === index
                ? "border-primary"
                : "border-transparent"
            )}
          >
            <Image
              src={image}
              alt={`Product thumbnail ${index + 1}`}
              className="object-cover"
              fill
            />
          </button>
        ))}
      </div>
    </div>
  )
}

