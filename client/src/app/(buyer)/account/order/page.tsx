"use client"
import { useState } from "react"
import PendingOrderList from "./pending-order-list";
import { useGetOrders } from "@/features/order/apis/use-get-orders";
import DeliveringOrder from "./delivering-order-list";
import CompletedOrders from "./completed-order";

export default function OrderStatusPage(){
    const [active, setActive] = useState('pending')
    const data = useGetOrders();
    return(
        <div>
            <h3 className="font-bold">Order History</h3>
            <p></p>
            <div className="flex relative">
                <p className={`p-2 ${active==="pending"?"text-blue-600 border-blue-400":""} border-b-2 p-2 hover:cursor-pointer`}
                    onClick={()=>setActive('pending')}
                >Pending</p>
                <p className={`p-2 ${active==="delivering"?"text-blue-600 border-blue-400":""} border-b-2 p-2 hover:cursor-pointer`}
                    onClick={()=>setActive('delivering')}
                >Delivering</p>
                <p className={`p-2 ${active==="completed"?"text-blue-600 border-blue-400":""} border-b-2 p-2 hover:cursor-pointer`}
                    onClick={()=>setActive('completed')}
                >Completed</p>
                <div className="bg-gray-400 w-[268px] sm:w-[400px] h-[1px] absolute bottom-0"></div>
            </div>
            <div className={`${active==="pending"?"":"hidden"}`}>
                <PendingOrderList orders={data.data ?? []}/>
            </div>
            <div className={`${active==="delivering"?"":"hidden"}`}>
                <DeliveringOrder orders={data.data ?? []}/>
            </div>
            <div className={`${active==="completed"?"":"hidden"}`}>
                <CompletedOrders orders={data.data ?? []}/>
            </div>
        </div>
    )
}