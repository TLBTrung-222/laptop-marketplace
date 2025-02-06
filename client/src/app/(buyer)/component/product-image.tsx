"use client";
import { useState, useEffect } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight, ShoppingCart } from "lucide-react";
import { useCart } from "./cart-context";
import { CartItem } from "@/types";

interface ProductImage {
  image: string; // URL of the image
}

export default function ProductImages({ product }: { product: any }) {
  const [selectedImage, setSelectedImage] = useState(product.images[0].image);
  const [currentIndex, setCurrentIndex] = useState(0);
  const {addToCart}= useCart();

    useEffect(() => {
        if (product && product.images && product.images.length > 0) {
            setSelectedImage(product.images[0].image);
        }  
    }, [product]);

    const handlePrev = () => {
        setCurrentIndex((prevIndex) => Math.max(prevIndex - 1, 0));
    };

    const handleNext = () => {
        const maxIndex = Math.max(product.images.length - 4, 0);
        setCurrentIndex((prevIndex) => Math.min(prevIndex + 1, maxIndex));
    };

  const displayedImages = product.images.slice(currentIndex, currentIndex + 4);

  const handleAddToCart = (event: React.MouseEvent, product: CartItem)=>{
    event.stopPropagation();
    addToCart(product);
  }

  return (
    <div className="xs:w-full sm:w-fit">
      <div className="justify-center items-center w-full flex relative">
        <ShoppingCart
            onClick={(event)=>handleAddToCart(event, {...product, quantity:1, })}
            className="top-10
            rounded text-black
            absolute left-0
            bg-slate-300 p-1
            hover:bg-blue-300 opacity-30"
            size={40}
        />
        <Image
          src={selectedImage}
          alt={product.name}
          width={240}
          height={240}
          className="object-cover rounded-md md:w-[300px] md:h-[300px]"
        />
      </div>
      <div className="flex justify-center items-center space-x-4 relative">
        <ChevronLeft
            onClick={handlePrev}
            className="items-center
            rounded text-black
            absolute left-0
            bg-slate-300
            hover:bg-blue-300 opacity-30"
            size={30}
        />
        <div className="flex space-x-4 overflow-x-auto">
            {displayedImages.map((image:ProductImage, index:number) => (
            <div key={index} className="relative">
              <Image
                src={image.image}
                alt={`Product Image ${index}`}
                width={60}
                height={60}
                className="object-cover rounded-md cursor-pointer"
                onClick={() => setSelectedImage(image.image)}
              />
            </div>
            ))}
        </div>
        <ChevronRight
            onClick={handleNext}
            className="items-center
            rounded text-black
            absolute right-0
            bg-slate-300
            hover:bg-blue-300 opacity-30"
            size={30}
        />
      </div>
    </div>
  );
}
