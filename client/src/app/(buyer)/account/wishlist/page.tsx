"use client"
import Image from "next/image";
import { useCart } from "../../../../features/home/component/cart-context"
import { formatCurrency } from "../../../../features/home/component/format-currency";
import { Minus, Plus, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

export default function WishListPage(){
    const router = useRouter();
    const {cart, addToCart, removeFromCart, clearCart, increaseQuantity, decreaseQuantity} = useCart();
    const id = cart.map((product)=>product.id);
    const quantity = cart.map((product)=>product.quantity)
    const queryString = new URLSearchParams({
        id: id.join(","), 
        quantity: quantity.join(","),
    }).toString();
    const handleBuyClick=()=>{
        router.push(`/order?${queryString}`);
    }
    return(
        <div>
            <h1 className="mb-2 font-bold">Wish List</h1>
            <div>
                <div className="p-2 bg-gray-50 shadow-md">
                    {
                        cart.map((item, index) => (
                            <div key={index}
                                className="sm:flex items-center bg-gray-100 mt-2 hover:bg-blue-200 p-2"
                            >
                                <Image
                                    width={80}
                                    height={80}    
                                    src={`${process.env.NEXT_PUBLIC_AWS_S3_BUCKET_URL}/${item.images[0].image}`} 
                                    alt={item.name} 
                                />
                                <div>
                                    <div>
                                        <h2>{item.name}</h2>
                                        <p>Price: {formatCurrency(item.price)} VND</p>
                                    </div>
                                    <div className="flex gap-2 ml-10">
                                        <Trash2
                                        className="text-red-500 ml-4 size-5 hover:cursor-pointer"
                                        onClick={() => removeFromCart(item.id)}
                                        />
                                        <div className="flex gap-1 items-center">
                                        <Minus
                                            className="rounded-2xl text-black hover:bg-red-400"
                                            onClick={()=>decreaseQuantity(item.id)}
                                        >-</Minus>
                                        <span>{item.quantity}</span>
                                        <Plus
                                            className="rounded-2xl text-black hover:bg-blue-400"
                                            onClick={()=>increaseQuantity(item.id)}
                                        >+</Plus>
                                    </div>
                                </div>
                                </div>
                            </div>
                        ))
                    }
                    <Button className="mt-2 w-full" onClick={()=>handleBuyClick()}>Buy</Button>
                </div>
            </div>
        </div>
    )
}