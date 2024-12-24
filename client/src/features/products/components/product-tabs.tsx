'use client'

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { SimilarProducts } from "./similar-products"
import { Comments } from "./comments"

export function ProductTabs() {
  return (
    <Tabs defaultValue="details" className="space-y-4">
      <TabsList>
        <TabsTrigger value="details">Technical Details</TabsTrigger>
        <TabsTrigger value="similar">Similar Products</TabsTrigger>
        <TabsTrigger value="comments">Comments</TabsTrigger>
      </TabsList>
      
      <TabsContent value="details" className="space-y-4">
        <div className="grid grid-cols-[200px_1fr] gap-4 items-center">
          <div className="font-medium">Display</div>
          <div>13.3-inch (diagonal) LED-backlit display with IPS technology</div>
          
          <div className="font-medium">Graphics</div>
          <div>Apple 10-core GPU</div>
          
          <div className="font-medium">Processor</div>
          <div>Apple M2 chip</div>
          
          <div className="font-medium">In the box</div>
          <div>67W USB-C Power Adapter, USB-C Charge Cable (2 m)</div>
          
          <div className="font-medium">Height</div>
          <div>0.61 inch (1.56 cm)</div>
          
          <div className="font-medium">Width</div>
          <div>11.97 inches (30.41 cm)</div>
        </div>
      </TabsContent>
      
      <TabsContent value="similar">
        <SimilarProducts />
      </TabsContent>
      
      <TabsContent value="comments">
        <Comments />
      </TabsContent>
    </Tabs>
  )
}

