"use client"
import { Button } from "@/components/ui/button";
import { fetchProductDetails } from "@/features/products/apis/use-get-details";
import { ProductDetail } from "@/types";
import { ChevronDown, ChevronUp } from "lucide-react";
import { useEffect, useState } from "react"

export default function ProductDetail({product}:{product:any}){
    const [active, setActive] = useState(1);
    const [productDetail, setProductDetail] = useState<ProductDetail>();
    useEffect(() => {
        const fetchData = async () => {
            try {
                const detail = await fetchProductDetails(product.id);
                setProductDetail(detail);
            } catch (error) {
                console.error("Error fetching product details:", error);
            }
        };

        if (product?.id) { // 🟢 Chỉ gọi API khi có product.id
            fetchData();
        }
    }, [product?.id]);
    return(
        <div>
            <div className="flex relative mt-6">
                <p className={`pl-6 pr-6 border-b-2 z-10 border-transparent transition-all duration-300
                    hover:cursor-pointer
                    ${active=== 1 ? "border-blue-400 text-blue-600":""}`}
                    onClick={()=>setActive(1)}
                >Technical Details</p>
                <p className={`pl-6 pr-6 border-b-2 z-10 border-transparent transition-all duration-300
                    hover:cursor-pointer
                    ${active === 2 ? "border-blue-400 text-blue-600":""}`}
                    onClick={()=>setActive(2)}
                >Comments</p>
                <div className="absolute bottom-0 border-b-2 border-gray-300 z-0 w-300px sm:w-[600px] md:w-[1000px]"></div>
            </div> 
            <div>
                {   active===1?
                    <TechnicalDetails productDetail={productDetail}/>:<></>
                }
            </div>      
        </div>
    )
}

const TechnicalDetails = ({productDetail}:{productDetail:any})=>{
    const [showLess, setShowLess] = useState(true);
    return(
        <>
            <h3 className="font-semibold my-2">Technical Details</h3>
            <table className="w-300px sm:w-[600px] md:w-[1000px]">
                <tr className="bg-gray-100">
                    <td className="min-w-20 p-2 rounded-md">Display</td>
                    <td className="p-2 rounded-md">{productDetail?.display}</td>
                </tr>
                <tr className="">
                    <td className="w-20 p-2 rounded-md">Ram</td>
                    <td className="p-2 rounded-md">{productDetail?.ram}</td>
                </tr>
                <tr className="bg-gray-100">
                    <td className="w-20 p-2 rounded-md">Storage</td>
                    <td className="p-2 rounded-md">{productDetail?.storage}</td>
                </tr>
                <tr className="">
                    <td className="w-20 p-2 rounded-md">GPU</td>
                    <td className="p-2 rounded-md">{productDetail?.gpu}</td>
                </tr>
                {
                    showLess &&
                    <tr>
                        <td colSpan={2} className="py-2">
                            <div className="bg-white text-blue-600 text-xs flex items-center hover:cursor-pointer">Show Less
                                <ChevronDown size={16} strokeWidth={1}/>
                            </div>
                        </td>
                    </tr>
                }
                
            </table>
            {
                showLess &&
                <table className="w-300px sm:w-[600px] md:w-[1000px]">
                    <tr className="bg-gray-100">
                        <td className="w-20 p-2 rounded-md">Keyboard</td>
                        <td className="p-2 rounded-md">{productDetail?.keyboard}</td>
                    </tr> 
                    <tr className="">
                        <td className="min-w-20 p-2 rounded-md">Lan</td>
                        <td className="p-2 rounded-md">{productDetail?.lan}</td>
                    </tr> 
                    <tr className="bg-gray-100">
                        <td className="w-20 p-2 rounded-md">Wifi</td>
                        <td className="p-2 rounded-md">{productDetail?.wifi}</td>
                    </tr> 
                    <tr className="">
                        <td className="w-20 p-2 rounded-md">Bluetooth</td>
                        <td className="p-2 rounded-md">{productDetail?.bluetooth}</td>
                    </tr>
                    <tr className="bg-gray-100">
                        <td className="w-20 p-2 rounded-md">Webcam</td>
                        <td className="p-2 rounded-md">{productDetail?.webcam}</td>
                    </tr>
                    <tr>
                        <td className="rounded-md p-2">OS</td>
                        <td className="p-2 rounded-md">{productDetail?.os}</td>
                    </tr>
                    <tr className="bg-gray-100">
                        <td className="w-20 p-2 rounded-md">Battery</td>
                        <td className="p-2 rounded-md">{productDetail?.battery}</td>
                    </tr>
                    <tr>
                        <td className="w-20 p-2 rounded-md">Weight</td>
                        <td className="p-2 rounded-md">{productDetail?.weight}</td>
                    </tr>
                    <tr className="">
                        <td className="w-20 p-2 rounded-md">Color</td>
                        <td className="p-2 rounded-md">{productDetail?.color}</td>
                    </tr>
                    <tr className="bg-gray-100">
                        <td className="w-20 p-2 rounded-md">Dimensions</td>
                        <td className="p-2 rounded-md">{productDetail?.dimensions}</td>
                    </tr>
                </table>
            }
        </>
    )
}