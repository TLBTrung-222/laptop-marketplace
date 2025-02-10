"use client";
import { Home, Settings, Inbox, Truck } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";
import Header from "../../../features/home/component/header";
import { useGetProducts } from "@/features/products/apis/use-get-products";
import Image from "next/image";

export default function AccountLayout({ children }: { children: React.ReactNode }) {
    const menuItems = [
        { label: "Personal Data", path: "/account/information", icon: Home },
        { label: "Wish list", path: "/account/wishlist", icon: Inbox },
        { label: "Orders", path: "/account/order", icon: Truck },
    ];
    const [name, setName] = useState<any>('');
    const [mounted, setMounted] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const { data } = useGetProducts();
    useEffect(() => {
        setMounted(true);
    }); // Chạy một lần khi component mount

    useEffect(() => {
        if (mounted) {
            setIsLoading(false);
        }
    }, [mounted]);

    useEffect(()=>{
        const storedName = localStorage.getItem("name")
        if (storedName){
            setName(storedName);
        }
    })
    if (!mounted) {
        return null;
    }

    return (
        <div>
            <Header data={data}/>
            <div className="flex">
                <div className="w-[250px] h-fit bg-gray-50 mt-10 ml-10 rounded-md p-2">
                    <div className="flex items-center">
                        <Image
                            src='/profile.png'
                            alt="Profile"
                            width={40}
                            height={40}
                        />
                        <h3 className="font-semibold">{name||"username"}</h3>
                    </div>
                    <div>
                        {menuItems.map((item,index)=>(
                        <div className="flex gap-4 text-gray-800 mt-4" key={item.path}>
                            <item.icon className="w-5 h-5"/>
                            <Link href={item.path}>
                                {item.label}
                            </Link>
                        </div>
                        ))}
                    </div>
                </div>
                
                {/* Nội dung của từng trang con */}
                <main className="ml-2 mt-10 p-2">{children}</main>
            </div>
        </div>
    );
}
