import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Product } from "@/types";
import Image from "next/image";
import { useCart } from "./cart-context";
import { toast } from "sonner";

type ProductCart ={
    id: string;
    name: string;
    price: number;
    images: string[];
    category: string;
    quantity: number;
    stockquantity: number;
}

export default function ProductList({data}:{data:Product[]|undefined}){
    const {addToCart} = useCart();
    return(
        <div>
        <div className="gap-1 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 items-center justify-between">
            {
            data?.map((product:Product, index:number)=>(
                <Card key={index} className="w-64 h-72 overflow-hidden mb-1 md:w-full"> 
                <div className="relative">
                    <Image 
                    src={"https://laptop-marketplace-se347.s3.ap-southeast-2.amazonaws.com/"+product.images[0].image||"/product.png"}
                    alt="Card Image" 
                    width={600} height={600}
                    className="w-full h-56 object-cover hover:cursor-pointer"
                />
                <Image
                    src='/basket.png'                
                    alt="Add to Cart"
                    width={30}
                    height={30}
                    onClick={()=>addToCart({...product, quantity:1})}
                    className="absolute top-1 right-1 hover:cursor-pointer"
                />
                </div>
                <hr className=""/>
                <div className="flex justify-between relative">
                    <div>
                    <h1 className="p-1 text-gray-600">{product.name}</h1>
                    <CardContent className="p-1 justify-center items-center">
                        <p className="text-sm text-gray-800 font-bold">
                        ${formatCurrency(product.price)}₫
                        </p>
                    </CardContent>
                    </div>
                    <div className="pr-1 text-[#063A88] absolute right-1 bottom-1 flex">
                    <Image
                        src={"/Star.png"}
                        alt="star-rating"
                        width={20}
                        height={20}
                        className="mr-1 mb-1"
                    />
                    {getproductRatings(product.ratings)}
                    </div>
                </div> 
            </Card>
            ))
            }
        </div>
        </div>
    )
}

const formatCurrency = (amount:number) => {
  return new Intl.NumberFormat('vi-VN').format(amount);
};

const getproductRatings=(ratings:any)=>{
  if (!ratings || ratings.length === 0) return 0;

  const total = (ratings.reduce((sum:number, rating:any) => sum + (rating.price || 0), 0)).toFixed(1);
  return total / ratings.length;
}