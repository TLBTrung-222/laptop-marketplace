"use client"
import { useGetProduct } from "@/features/products/apis/use-get-product";
import Image from "next/image";
import { formatCurrency } from "./format-currency";
import { Minus, Plus, Trash2 } from "lucide-react";
import React, { useEffect, useMemo, useState } from "react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
export default function OrderList({ id, quantities, setData, active }: { id: number[], quantities: number[], setData:React.Dispatch<React.SetStateAction<any>>, active: ()=>void }) {
    const [productIds, setProductIds] = useState(id);
    const products = productIds.map((productId) => useGetProduct(productId).data).filter(Boolean);
    const mergeProducts = products?.map((product, index) => ({...product, quantity:quantities[index]||1}))
    var productsBuy = mergeProducts
    const [mounted, setMounted] = useState(false)
    const [updateProducts, settUpdateProducts] = useState<any[]>()
    const [total, setToatal] = useState<number>()

    const removeItem=(id:number)=>{
        var removeList = productsBuy?.filter((product:any)=>(
            product.id!==id
        ))
        productsBuy=removeList
        setMounted((prev) => !prev)
    }

    useEffect(()=>{
        setToatal(productsBuy.reduce((sum:any, product:any)=>sum+(product.price?product.price:0)*product.quantity,0))
    }, [mounted])

    const handleNext = () => {
        const newOrderData = productsBuy.map((product) => ({
            productId: product.id,
            quantity: product.quantity,
        }));

        setData((prevData:any) => {
            const updatedData = [...prevData, ...newOrderData];
            return updatedData;
        });

        active();
    };
    return (
        <div className="w-fit sm:flex sm:gap-28 bg-gray-50 p-4">
            <div>
                <h1 className="font-semibold">Your Order</h1>
                {
                    mergeProducts?.map((item: any, index: number) => 
                        <div key={index}>
                            <OrderItem item={item} index={index} removeItem={removeItem}/>
                        </div>
                    )
                }
            </div>
            <div className="w-fit p-2 h-fit shadow-md">
                <p className="font-semibold">Grand Price</p>
                <p className="mb-2">${formatCurrency(total||0)} VND</p>
                <Button onClick={()=>handleNext()}>Proceed to Next</Button>
            </div>
        </div>
    )
}

const OrderItem=({ item, index, removeItem }: { item: any; index: number, removeItem:(id:number)=>void })=>{
    const [remove, setIsRemoved] = useState(false)
    const handleRemove=(id:number)=>{
        setIsRemoved(true)
        removeItem(id)
    }

    return(
        <>
            <div key={index} className={
                `flex items-center shadow-md p-2 sm:w-[400px]
                ${remove ? "hidden":""}`
            }
            >
                <Image
                    alt='Product'
                    height={120}
                    width={120}
                    src={`${item.images[item.images.length-1].image}`}
                />
                <div className="flex flex-col justify-between">
                    <div>
                        <p className="font-semibold">{item.name}</p>
                        <p>Stock Quantity: {item.stockQuantity-1}</p>
                        <p className="text-blue-600">${formatCurrency(item.price * item.quantity)} VND</p>
                    </div>
                </div>
            </div>
        </>
    )
}