"use client"
import { Button } from "@/components/ui/button";
import { formatCurrency } from "./format-currency";
import { Product } from "@/types";
import { Dot, Star } from "lucide-react";
import { useRouter } from "next/navigation";
import { getproductRatings } from "./get-rating-result";
import { useGetComments } from "@/features/products/apis/use-get-ratings";

export default function ProductReview({product}:{product:any}){
    const router = useRouter();
    const queryString = new URLSearchParams({
        id: [product.id].join(""), 
        quantity: [1].join(""),
        }).toString();
        const handleBuyClick=(id:number)=>{
            router.push(`/order?${queryString}`);
    }
    const { data } = useGetComments(product.id);
    return(
        <div className="md:flex ml-6 gap-10">
            <div className="mt-4 sm:max-w-100">
                <h3 className="font-bold">{product.name}</h3>
                <p className="text-sm">{product.description}</p>
                <div className="flex items-center">
                    <div className="flex bg-blue-400 w-fit px-2 py-1 rounded-xl mt-1">
                        <Star color="white"/>
                        <p className="ml-2 text-white font-bold">{getproductRatings(data)}</p>
                    </div>
                    <div className="ml-4 text-blue-400 text-xs">
                        {data.length} review
                    </div>
                </div>

                <table className="mt-2">
                    <tr className="flex flex-row">
                        <td className="flex w-40 text-gray-400"><Dot/> brand</td>
                        <td>{product.brand.name}</td>
                    </tr>
                    <tr className="flex flex-row">
                        <td className="flex w-40 text-gray-400"><Dot/> Model name</td>
                        <td>{product.category.type}</td>
                    </tr>
                    <tr className="flex flex-row">
                        <td className="flex w-40 text-gray-400"><Dot/> Stock Quantity</td>
                        <td>{product.stockQuantity}</td>
                    </tr>
                </table>
            </div>
            <div className="mt-12 w-full max-sm:flex max-sm:flex-col max-sm:items-center max-sm:justify-center">
                <p className="">${formatCurrency(product.price)}</p>
                <Button className="w-40 bg-blue-600"
                    onClick={()=>handleBuyClick(product.id)}
                >Buy Now</Button>
            </div>
        </div>
    )
}