"use client"
import { Button } from "@/components/ui/button";
import { useGetComments } from "@/features/products/apis/use-get-ratings";
import { fetchProductDetails } from "@/features/products/apis/use-get-details";
import { ProductDetail } from "@/types";
import { ChevronDown, ChevronUp, Star } from "lucide-react";
import { useEffect, useState } from "react"
import { useCreateRatings } from "@/features/products/apis/use-create-rating";
import Image from "next/image";

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
                {
                    active===2?
                    <Comment productId={product.id}/>:<></>
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

            <div>
                <div className="py-2">
                    <div className="bg-white text-blue-600 text-xs flex items-center hover:cursor-pointer"
                        onClick={()=>setShowLess((prev)=>!prev)}
                    >Show Less
                        <ChevronDown size={16} strokeWidth={1}/>
                    </div>
                </div>
            </div>
        </>
    )
}

const Comment = ({productId}:{productId:number})=>{
    const [hover, setHover] = useState(0);
    const [rating, setRating] = useState(5);
    const [comment, setComment] = useState("");
    const {data} = useGetComments(productId)
    const {mutate} = useCreateRatings(productId)
    if(!data) return null
    

    const handleClick = () => {
        setRating(rating);
        setComment(comment);
        mutate({ratingStar: rating, comment:comment})
    };

    return(
        <div>
            <div>
                <div className="flex space-x-1 mt-2">
                    {[1, 2, 3, 4, 5].map((star) => (
                        <Star
                        key={star}
                        onClick={() => setRating(star)}
                        onMouseEnter={() => setHover(star)}
                        onMouseLeave={() => setHover(0)}
                        className={`cursor-pointer transition-all duration-200 ${
                            (hover || rating) >= star ? "text-yellow-400" : "text-gray-300"
                        }`}
                        size={24}
                        />
                    ))}
                </div>
                <input type="text" placeholder="Comment" onChange={(e)=>setComment(e.target.value)}
                    className="bg-gray-200 rounded-sm p-1 mt-1 mb-4 sm:w-[400px]"
                />
                <Button className="ml-2" onClick={()=>handleClick()}>Submit</Button>
            </div>
            <div>
                {
                    data.map((comment:any, index:number)=>
                        <div key={index} className="flex gap-2">
                            <div className="flex items-center">
                                <Image
                                    alt="Profile"
                                    width={30}
                                    height={30}
                                    src='/profile.png'
                                    className="rounded-full bg-blue-200 mr-2"
                                />
                                <div className="text-blue-400 sm:w-[400px]">{comment.comment}</div>
                                <p>
                                    {comment.ratingStar === 1? <Star className="cursor-pointer transition-all duration-200 text-yellow-400 "size={24}/>:<></>}
                                    {comment.ratingStar === 2? 
                                        <div className="flex">
                                            <Star className="cursor-pointer transition-all duration-200 text-yellow-400 "size={24}/>
                                            <Star className="cursor-pointer transition-all duration-200 text-yellow-400 "size={24}/>
                                        </div>
                                        :<></>
                                    }
                                    {comment.ratingStar === 3? 
                                        <div className="flex">
                                            <Star className="transition-all duration-200 text-yellow-400 "size={24}/>
                                            <Star className="transition-all duration-200 text-yellow-400 "size={24}/>
                                            <Star className="transition-all duration-200 text-yellow-400 "size={24}/>
                                        </div>
                                        :<></>
                                    }
                                    {comment.ratingStar === 4? 
                                        <div className="flex">
                                            <Star className="transition-all duration-200 text-yellow-400 "size={24}/>
                                            <Star className="transition-all duration-200 text-yellow-400 "size={24}/>
                                            <Star className="transition-all duration-200 text-yellow-400 "size={24}/>
                                            <Star className="transition-all duration-200 text-yellow-400 "size={24}/>
                                        </div>
                                        :<></>
                                    }
                                    {comment.ratingStar === 5? 
                                        <>
                                            <Star className="transition-all duration-200 text-yellow-400 "size={24}/>
                                            <Star className="transition-all duration-200 text-yellow-400 "size={24}/>
                                            <Star className="transition-all duration-200 text-yellow-400 "size={24}/>
                                            <Star className="transition-all duration-200 text-yellow-400 "size={24}/>
                                            <Star className="transition-all duration-200 text-yellow-400 "size={24}/>
                                        </>:<></>
                                    }
                                </p>
                            </div>
                        </div>
                    )
                }
            </div>
        </div>
    )
} 