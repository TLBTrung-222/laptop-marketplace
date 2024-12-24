'use client'

import Image from 'next/image'
import { Star, Heart, ChevronLeft, ChevronRight } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { useState } from 'react'

interface SimilarProduct {
  id: string
  name: string
  price: number
  rating: number
  image: string
}

const similarProducts: SimilarProduct[] = [
  {
    id: '1',
    name: 'Apple 2022 MacBook Pro Laptop',
    price: 1399.00,
    rating: 4.5,
    image: '/placeholder.svg?height=200&width=300'
  },
  {
    id: '2',
    name: 'Apple 2022 MacBook Air Laptop with M2 chip',
    price: 1299.00,
    rating: 4.5,
    image: '/placeholder.svg?height=200&width=300'
  },
  {
    id: '3',
    name: 'Apple 2023 MacBook Air Laptop with M2 chip: 15.3-inch',
    price: 1299.00,
    rating: 4.5,
    image: '/placeholder.svg?height=200&width=300'
  },
  {
    id: '4',
    name: 'Apple 2022 MacBook Air Laptop with M2 chip',
    price: 1099.00,
    rating: 4.5,
    image: '/placeholder.svg?height=200&width=300'
  }
]

export function SimilarProducts() {
  const [currentIndex, setCurrentIndex] = useState(0)

  const nextSlide = () => {
    setCurrentIndex((prev) => 
      prev + 1 >= similarProducts.length ? 0 : prev + 1
    )
  }

  const prevSlide = () => {
    setCurrentIndex((prev) => 
      prev - 1 < 0 ? similarProducts.length - 1 : prev - 1
    )
  }

  return (
    <div className="relative">
      <div className="overflow-hidden">
        <div 
          className="flex transition-transform duration-300 ease-in-out"
          style={{ transform: `translateX(-${currentIndex * 100}%)` }}
        >
          {similarProducts.map((product) => (
            <div 
              key={product.id}
              className="min-w-full md:min-w-[50%] lg:min-w-[33.333%] p-4"
            >
              <div className="border rounded-lg p-4 space-y-4">
                <div className="relative h-48 mb-4">
                  <Image
                    src={product.image}
                    alt={product.name}
                    fill
                    className="object-contain"
                  />
                </div>
                <h3 className="text-sm font-medium line-clamp-2">{product.name}</h3>
                <div className="flex items-center space-x-1">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star
                      key={i}
                      className={`w-4 h-4 ${
                        i < Math.floor(product.rating)
                          ? "fill-primary text-primary"
                          : "fill-muted stroke-muted-foreground"
                      }`}
                    />
                  ))}
                  <span className="text-sm text-muted-foreground ml-1">
                    {product.rating}
                  </span>
                </div>
                <div className="text-lg font-bold">
                  ${product.price.toFixed(2)}
                </div>
                <div className="flex items-center space-x-2">
                  <Button 
                    variant="outline" 
                    className="flex-1"
                    onClick={() => console.log('Add to cart:', product.id)}
                  >
                    Add to cart
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => console.log('Add to wishlist:', product.id)}
                  >
                    <Heart className="w-5 h-5" />
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      
      <button
        onClick={prevSlide}
        className="absolute left-0 top-1/2 -translate-y-1/2 bg-white/80 p-2 rounded-full shadow-md hover:bg-white"
      >
        <ChevronLeft className="w-6 h-6" />
      </button>
      <button
        onClick={nextSlide}
        className="absolute right-0 top-1/2 -translate-y-1/2 bg-white/80 p-2 rounded-full shadow-md hover:bg-white"
      >
        <ChevronRight className="w-6 h-6" />
      </button>

      <div className="flex justify-center mt-4 space-x-2">
        {similarProducts.map((_, index) => (
          <button
            key={index}
            className={`w-2 h-2 rounded-full ${
              index === currentIndex ? 'bg-primary' : 'bg-gray-300'
            }`}
            onClick={() => setCurrentIndex(index)}
          />
        ))}
      </div>
    </div>
  )
}

