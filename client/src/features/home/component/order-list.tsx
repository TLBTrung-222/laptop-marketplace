"use client"
import { getProduct, useGetProduct } from "@/features/products/apis/use-get-product";
import Image from "next/image";
import { formatCurrency } from "./format-currency";
import React, { useEffect, useMemo, useState } from "react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
export default function OrderList({ id, quantities, setData, active }: { id: number[], quantities: number[], setData:React.Dispatch<React.SetStateAction<any>>, active: ()=>void }) {
    const mergeProducts = useFetchProducts(id, quantities)
    var productsBuy = mergeProducts
    const [mounted, setMounted] = useState(false)
    const [total, setToatal] = useState<number>()

    useEffect(()=>{
        setToatal(productsBuy.reduce((sum:any, product:any)=>sum+(product.price?product.price:0)*product.quantity,0))
    }, [productsBuy])

    const handleNext = () => {
        const newOrderData = productsBuy.map((product) => ({
            productId: product?.id,
            quantity: product?.quantity,
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
                                    <OrderItem item={item} index={index} quantity={item.quantity}/>
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

const OrderItem=({ item, index, quantity }: { item: any; index: number, quantity: any })=>{
    const [remove] = useState(false)
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
                        <p className="font-semibold">{item.name} x {quantity}</p>
                        <p>Stock Quantity: {item.stockQuantity-1}</p>
                        <p className="text-blue-600">${formatCurrency(item.price)} VND</p>
                    </div>
                </div>
            </div>
        </>
    )
}

const useFetchProducts = (productIds: number[], quantities: number[]) => {
    const [products, setProducts] = useState<any[]>([]);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const fetchedProducts = await Promise.all(
                    productIds.map(async (productId) => {
                        try {
                            const response = await getProduct(productId);
                            return response;
                        } catch (error) {
                            console.error(`Error fetching product ${productId}:`, error);
                            return null;
                        }
                    })
                );

                setProducts(fetchedProducts.filter(Boolean)); // Loại bỏ giá trị null
            } catch (error) {
                console.error("Error fetching products:", error);
            }
        };

        if (productIds.length > 0) {
            fetchProducts();
        }
    }, [productIds, quantities]);

    return useMemo(() => 
        products.map((product, index) => ({
            ...product,
            quantity: quantities[index] || 1
        })), 
    [products, quantities]);
};
