'use client'

import { Star } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { RadioGroup, RadioGroupItem } from "../../../components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { useState } from "react"

interface ProductInfoProps {
  title: string
  rating: number
  reviews: number
  price: number
  originalPrice: number
  discount: number
}

export function ProductInfo({
  title,
  rating,
  reviews,
  price,
  originalPrice,
  discount,
}: ProductInfoProps) {
  const [paymentOption, setPaymentOption] = useState("pay-now")
  const [selectedMonth, setSelectedMonth] = useState("3")

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">{title}</h1>
        <div className="flex items-center mt-2">
          <div className="flex items-center">
            {Array.from({ length: 5 }).map((_, i) => (
              <Star
                key={i}
                className={`w-4 h-4 ${
                  i < Math.floor(rating)
                    ? "fill-primary text-primary"
                    : "fill-muted text-muted-foreground"
                }`}
              />
            ))}
          </div>
          <span className="ml-2 text-sm text-muted-foreground">
            {rating} ({reviews} reviews)
          </span>
        </div>
      </div>

      <div className="space-y-2">
        <div className="flex items-baseline space-x-2">
          <span className="text-3xl font-bold">${price}</span>
          <span className="text-sm text-muted-foreground line-through">
            ${originalPrice}
          </span>
          <span className="text-sm font-medium text-red-600">
            -{discount}%
          </span>
        </div>

        <RadioGroup
          value={paymentOption}
          onValueChange={setPaymentOption}
          className="space-y-4"
        >
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="pay-now" id="pay-now" />
            <Label htmlFor="pay-now">Pay Now</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="installments" id="installments" />
            <Label htmlFor="installments">Buy in installments</Label>
          </div>
        </RadioGroup>

        {paymentOption === "installments" && (
          <div className="grid grid-cols-4 gap-2 mt-2">
            {["3", "6", "12", "18"].map((months) => (
              <button
                key={months}
                onClick={() => setSelectedMonth(months)}
                className={`p-2 text-center rounded-md border ${
                  selectedMonth === months
                    ? "border-primary bg-primary/10"
                    : "border-border"
                }`}
              >
                <div className="text-sm font-medium">{months}</div>
                <div className="text-xs text-muted-foreground">Months</div>
              </button>
            ))}
          </div>
        )}
      </div>

      <div className="space-y-4">
        <Button className="w-full" size="lg">
          Buy Now
        </Button>
        <Button variant="outline" className="w-full" size="lg">
          Add to cart
        </Button>
      </div>
    </div>
  )
}

