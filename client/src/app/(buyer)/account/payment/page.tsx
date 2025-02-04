"use client"
import { Button } from "@/components/ui/button";
import dynamic from "next/dynamic";
import Image from "next/image";
import { useEffect, useState } from "react";

const Payment=()=>{
    const [isShowEdit, setIsShowEdit] = useState(false);
    const [isHaveCard, setIsShowCard] = useState(false);

     const [mounted, setMounted] = useState(false);

    // Đảm bảo chỉ render khi ở client
    useEffect(() => {
        setMounted(true);
    }, []);

    if (!mounted) {
        return null; // Không render gì trong lúc server-side
    }

    const handleEditCard=()=>{
        setIsShowEdit(true);
    }

    return (
        <div>
            <h1 className="mb-1 font-bold">Cards</h1>
            <p className="mb-1 text-xs text-gray-400">manage pay methods</p>
            <div className="relative mt-8">
                <label className="absolute top-0 left-3 transform -translate-y-5 text-gray-400 text-[14px]">Email</label>
                <div>
                    <div className="relative">
                        <img
                            src='/sms.ico'
                            width={24}
                            height={24}
                            alt='SMS'
                            className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5"
                        />
                        <input type="text" placeholder="Enter your text"
                            className="pl-10 pr-4 py-2 w-full border border-gray-300 rounded-md"
                        />
                        <img
                            src='/edit.png'
                            width={24}
                            height={24}
                            alt='SMS'
                            className="absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5 hover:cursor-pointer"
                            onClick={()=>setIsShowEdit(true)}
                        />
                    </div>
                </div>
            </div>

            {isShowEdit && <EditPayment onClose={()=>setIsShowEdit(false)}/>}
        </div>
    )
}

const EditPayment=({onClose}:{onClose:()=>void})=>{
    return(
        <div 
          className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50"
          onClick={onClose}
          >
            <div
              className="bg-white p-6 rounded-lg shadow-lg w-fit lg:w-1/3 relative"
              onClick={(e) => e.stopPropagation()}
            >
                <h3 className="mt-1 mb-1 font-bold text-md">Add Your Card</h3>
                <div>x</div>
                <p className="mb-1">Tech Heim accept VNPAY method.</p>
                <div className="relative w-full max-w-xs">
                    <input
                    type="text"
                    placeholder="Card number"
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">
                        <Image
                            src="/sms.ico"
                            alt="Email"
                            width={20}
                            height={20}
                        />
                    </div>
                </div>
                <div className="relative w-full max-w-xs mt-1">
                    <input
                    type="text"
                    placeholder="Name on card"
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">
                        <Image
                            src="/sms.ico"
                            alt="Email"
                            width={20}
                            height={20}
                        />
                    </div>
                </div>
                <div className="flex gap-1">
                    <div className="relative w-full max-w-xs mt-1">
                        <input
                        type="text"
                        placeholder="Email"
                        className="w-56 pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                        <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">
                            <Image
                                src="/sms.ico"
                                alt="Email"
                                width={20}
                                height={20}
                            />
                        </div>
                    </div>
                    <div className="relative w-full max-w-xs mt-1">
                        <input
                        type="text"
                        placeholder="Email"
                        className="w-56 pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                        <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">
                            <Image
                                src="/sms.ico"
                                alt="Email"
                                width={20}
                                height={20}
                            />
                        </div>
                    </div>
                </div>
              <div className="flex mt-2">
                <Button className="bg-gray-white w-full text-blue-600 border-2 border-blue-600 hover:border-0 hover:text-white">Cancel</Button>
                <Button className="ml-2 bg-blue-600 w-full">Add Card</Button>
              </div>
            </div>
        </div>
    )
}

const PaymentDynamic = dynamic(()=>Promise.resolve(Payment),{ssr:false})
export default PaymentDynamic;