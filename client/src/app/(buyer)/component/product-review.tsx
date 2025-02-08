"use client"
import { Button } from "@/components/ui/button";
import { formatCurrency } from "./format-currency";
import { Product } from "@/types";
import { Dot } from "lucide-react";
import { fetchProductDetails, useGetDetails } from "@/features/products/apis/use-get-details";
import { useRouter } from "next/navigation";
import { number } from "zod";

export default function ProductReview({product}:{product:Product}){
    const router = useRouter();
    const queryString = new URLSearchParams({
        id: [product.id].join(""), 
        quantity: [1].join(""),
        }).toString();
        const handleBuyClick=(id:number)=>{
            router.push(`/order?${queryString}`);
    }
    return(
        <div className="md:flex ml-6 gap-10">
            <div className="mt-4 sm:max-w-100">
                <h3 className="font-bold">{product.name}</h3>
                <p className="text-sm">{product.description}</p>
                <table className="mt-2">
                    <tr className="flex flex-row">
                        <td className="flex w-40 text-gray-400"><Dot/> brand</td>
                        <td>{product.brand.name}</td>
                    </tr>
                    <tr className="flex flex-row">
                        <td className="flex w-40 text-gray-400"><Dot/> Model name</td>
                        <td>{product.category.type}</td>
                    </tr>
                </table>
            </div>
            <div className="mt-12 w-full">
                <p className="">${formatCurrency(product.price)}</p>
                <Button className="w-40 bg-blue-600"
                    onClick={()=>handleBuyClick(product.id)}
                >Buy Now</Button>
            </div>
        </div>
    )
}