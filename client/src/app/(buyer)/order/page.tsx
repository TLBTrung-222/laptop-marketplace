"use client"
import { ShoppingCart, Truck } from "lucide-react";
import OrderList from "../../../features/home/component/order-list";
import { useEffect, useRef, useState } from "react";
import { useSearchParams } from "next/navigation";
import AddressOrder from "../../../features/home/component/address-order";
import { useCreateOrder } from "@/features/order/apis/use-create-order";
import { toast } from "sonner";

type ShippingInfors = {
    city: string;
    district: string;
    street: string;
};

export default function OrderPage(){
    const [data, setData] = useState<any[]>([]);
    const [mounted, setMounted] = useState(false);
    const searchParams = useSearchParams();
    const [active, setActive] = useState("order");
    const [address, setAddress] = useState<any>({});
    const {mutateAsync, isError} = useCreateOrder()
    const [pendingOrder, setPendingOrder] = useState(false);
    useEffect(() => {
        setMounted(true);
    }, []);

    useEffect(() => {
        if (pendingOrder) {
            mutateAsync({ orderItems: data, shippingInfors: address.shippingInfors, paymentMethod: address.paymentMethod });
            setPendingOrder(false); // Xử lý xong thì tắt cờ
        }
    }, [pendingOrder]);

    if (!mounted) {
        return null;
    }

    const changeToAddress =()=>{
        setActive("address");
    }

    const changeToCheckout =()=>{
        setAddress((prev:any) => {
            console.log("Final Address:", prev);   
            setPendingOrder(true);
            return prev;
        });
    }

    const updateAddress = (newData:any)=>{
        setAddress((prev:any)=>({...prev,...newData}))
    }

    const ids = searchParams.get("id")?.split(",").map(Number) || [];
    const quantities = searchParams.get("quantity")?.split(",").map(Number) || [];
    

    return(
        <div className="mt-10">
            <div className={`${active==='order'?"":"hidden"}`}>
                <div className="flex items-center justify-center">
                    <div className="rounded-full border-2 border-blue-400 p-2">
                        <ShoppingCart
                            className=""
                            size={40}
                            color="blue"
                        />
                    </div>
                    <div className="w-20 h-[1px] bg-gray-400"></div>
                    <div className="rounded-full border-2 border-gray-400 p-2">
                        <Truck
                            className=""
                            size={40}
                            color="gray"
                        />
                    </div>
                    <div className="w-20 h-[1px] bg-gray-400"></div>
                    <div className="rounded-full border-2 border-gray-400 p-2">
                        <ShoppingCart
                            className=""
                            size={40}
                            color="gray"
                        />
                    </div>
                </div>
                <div className="flex flex-col mt-10 mx-2 justify-center items-center
                    "
                >
                    <OrderList id={ids} quantities={quantities} setData={setData} active={()=>changeToAddress()}/>
                </div>
            </div>
            {
                <div className={`${active === "address"?"":"hidden"}`}>
                    <AddressOrder next={changeToCheckout} address={address} updateAddress={updateAddress}/>
                </div>
            }
            
        </div>
    )
}