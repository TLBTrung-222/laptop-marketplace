"use client";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react"
import { useCreateRatings } from "@/features/products/apis/use-create-rating";
import { fetchProductDetails } from "@/features/products/apis/use-get-details";
import { useGetComments } from "@/features/products/apis/use-get-ratings";
import { ProductDetail as TProductDetail } from "@/types";
import { ChevronDown, ChevronUp, Star } from "lucide-react";
import Image from "next/image";

export default function ProductDetails({product}:{product:any}){
    const [active, setActive] = useState(1);
    const [productDetail, setProductDetail] = useState<TProductDetail>();
    useEffect(() => {
        const fetchData = async () => {
            try {
                const detail = await fetchProductDetails(product.id);
                setProductDetail(detail);
            } catch (error) {
                console.error("Error fetching product details:", error);
            }
        };

        if (product?.id) {
            // 🟢 Chỉ gọi API khi có product.id
            fetchData();
        }
    }, [product?.id]);
    return (
        <div>
            <div className="relative mt-6 flex">
                <p
                    className={`z-10 border-b-2 border-transparent pl-6 pr-6 transition-all duration-300 hover:cursor-pointer ${active === 1 ? "border-blue-400 text-blue-600" : ""}`}
                    onClick={() => setActive(1)}
                >
                    Technical Details
                </p>
                <p
                    className={`z-10 border-b-2 border-transparent pl-6 pr-6 transition-all duration-300 hover:cursor-pointer ${active === 2 ? "border-blue-400 text-blue-600" : ""}`}
                    onClick={() => setActive(2)}
                >
                    Comments
                </p>
                <div className="w-300px absolute bottom-0 z-0 border-b-2 border-gray-300 sm:w-[600px] md:w-[1000px]"></div>
            </div>
            <div>
                {active === 1 ? (
                    <TechnicalDetails productDetail={productDetail} />
                ) : (
                    <></>
                )}
                {active === 2 ? <Comment productId={product.id} /> : <></>}
            </div>
        </div>
    );
}

const TechnicalDetails = ({ productDetail }: { productDetail: any }) => {
    const [showLess, setShowLess] = useState(true);
    return (
        <>
            <h3 className="my-2 font-semibold">Technical Details</h3>
            <table className="w-300px sm:w-[600px] md:w-[1000px]">
                <tr className="bg-gray-100">
                    <td className="w-100 rounded-md p-2">Display</td>
                    <td className="rounded-md p-2">{productDetail?.display}</td>
                </tr>
                <tr className="">
                    <td className="min-w-32 rounded-md p-2">Ram</td>
                    <td className="rounded-md p-2">{productDetail?.ram}</td>
                </tr>
                <tr className="bg-gray-100">
                    <td className="w-32 rounded-md p-2">Storage</td>
                    <td className="rounded-md p-2">{productDetail?.storage}</td>
                </tr>
                <tr className="">
                    <td className="w-32 rounded-md p-2">GPU</td>
                    <td className="rounded-md p-2">{productDetail?.gpu}</td>
                </tr>
            </table>

            {!showLess && (
                <table className="w-300px sm:w-[600px] md:w-[1000px]">
                    <tr className="bg-gray-100">
                        <td className="w-32 rounded-md p-2">Keyboard</td>
                        <td className="rounded-md p-2">
                            {productDetail?.keyboard}
                        </td>
                    </tr>
                    <tr className="">
                        <td className="w-32 rounded-md p-2">Lan</td>
                        <td className="rounded-md p-2">{productDetail?.lan}</td>
                    </tr>
                    <tr className="bg-gray-100">
                        <td className="w-32 rounded-md p-2">Wifi</td>
                        <td className="rounded-md p-2">
                            {productDetail?.wifi}
                        </td>
                    </tr>
                    <tr className="">
                        <td className="w-32 rounded-md p-2">Bluetooth</td>
                        <td className="rounded-md p-2">
                            {productDetail?.bluetooth}
                        </td>
                    </tr>
                    <tr className="bg-gray-100 rounded-md">
                        <td className="w-32 p-2">Webcam</td>
                        <td className="rounded-md p-2">
                            {productDetail?.webcam}
                        </td>
                    </tr>
                    <tr>
                        <td className="rounded-md p-2">OS</td>
                        <td className="rounded-md p-2">{productDetail?.os}</td>
                    </tr>
                    <tr className="bg-gray-100">
                        <td className="w-32 rounded-md p-2">Battery</td>
                        <td className="rounded-md p-2">
                            {productDetail?.battery}
                        </td>
                    </tr>
                    <tr>
                        <td className="w-32 rounded-md p-2">Weight</td>
                        <td className="rounded-md p-2">
                            {productDetail?.weight}
                        </td>
                    </tr>
                    <tr className="">
                        <td className="w-32 rounded-md p-2">Color</td>
                        <td className="rounded-md p-2">
                            {productDetail?.color}
                        </td>
                    </tr>
                    <tr className="bg-gray-100">
                        <td className="w-32 rounded-md p-2">Dimensions</td>
                        <td className="rounded-md p-2">
                            {productDetail?.dimensions}
                        </td>
                    </tr>
                </table>
            )}

            <div>
                <div className="py-2">
                    {
                        showLess &&
                        (
                            <div
                                className="flex items-center bg-white text-xs text-blue-600 hover:cursor-pointer"
                                onClick={() => setShowLess((prev) => !prev)}
                            >
                                Show More
                                <ChevronDown size={16} strokeWidth={1} />
                            </div>
                        )
                    }
                    {
                        !showLess &&
                        (
                            <div
                                className="flex items-center bg-white text-xs text-blue-600 hover:cursor-pointer"
                                onClick={() => setShowLess((prev) => !prev)}
                            >
                                Show Less
                                <ChevronUp size={16} strokeWidth={1} />
                            </div>
                        )
                    }
                </div>
            </div>
        </>
    );
};

const Comment = ({ productId }: { productId: number }) => {
    const [hover, setHover] = useState(0);
    const [rating, setRating] = useState(5);
    const [comment, setComment] = useState("");
    const { data } = useGetComments(productId);
    const { mutate } = useCreateRatings(productId);
    if (!data) return null;

    const handleClick = () => {
        setRating(rating);
        setComment(comment);
        mutate({ ratingStar: rating, comment: comment });
    };

    return (
        <div>
            <div>
                <div className="mt-2 flex space-x-1">
                    {[1, 2, 3, 4, 5].map((star) => (
                        <Star
                            key={star}
                            onClick={() => setRating(star)}
                            onMouseEnter={() => setHover(star)}
                            onMouseLeave={() => setHover(0)}
                            className={`cursor-pointer transition-all duration-200 ${
                                (hover || rating) >= star
                                    ? "text-yellow-400"
                                    : "text-gray-300"
                            }`}
                            size={24}
                        />
                    ))}
                </div>
                <input
                    type="text"
                    placeholder="Comment"
                    onChange={(e) => setComment(e.target.value)}
                    className="mb-4 mt-1 rounded-sm bg-gray-200 p-1 sm:w-[400px]"
                />
                <Button className="ml-2" onClick={() => handleClick()}>
                    Submit
                </Button>
            </div>
            <div>
                {data.map((comment: any, index: number) => (
                    <div key={index} className="flex gap-2 mt-2">
                        <div className="flex items-center">
                            <Image
                                alt="Profile"
                                width={30}
                                height={30}
                                src="/profile.png"
                                className="mr-2 rounded-full bg-blue-200"
                            />
                            <div className="text-blue-400 sm:w-[400px]">
                                {comment.comment}
                            </div>
                            <p>
                                {comment.ratingStar === 1 ? (
                                    <Star
                                        className="cursor-pointer text-yellow-400 transition-all duration-200"
                                        size={24}
                                    />
                                ) : (
                                    <></>
                                )}
                                {comment.ratingStar === 2 ? (
                                    <div className="flex">
                                        <Star
                                            className="cursor-pointer text-yellow-400 transition-all duration-200"
                                            size={24}
                                        />
                                        <Star
                                            className="cursor-pointer text-yellow-400 transition-all duration-200"
                                            size={24}
                                        />
                                    </div>
                                ) : (
                                    <></>
                                )}
                                {comment.ratingStar === 3 ? (
                                    <div className="flex">
                                        <Star
                                            className="text-yellow-400 transition-all duration-200"
                                            size={24}
                                        />
                                        <Star
                                            className="text-yellow-400 transition-all duration-200"
                                            size={24}
                                        />
                                        <Star
                                            className="text-yellow-400 transition-all duration-200"
                                            size={24}
                                        />
                                    </div>
                                ) : (
                                    <></>
                                )}
                                {comment.ratingStar === 4 ? (
                                    <div className="flex">
                                        <Star
                                            className="text-yellow-400 transition-all duration-200"
                                            size={24}
                                        />
                                        <Star
                                            className="text-yellow-400 transition-all duration-200"
                                            size={24}
                                        />
                                        <Star
                                            className="text-yellow-400 transition-all duration-200"
                                            size={24}
                                        />
                                        <Star
                                            className="text-yellow-400 transition-all duration-200"
                                            size={24}
                                        />
                                    </div>
                                ) : (
                                    <></>
                                )}
                                {comment.ratingStar === 5 ? (
                                    <>
                                        <Star
                                            className="text-yellow-400 transition-all duration-200"
                                            size={24}
                                        />
                                        <Star
                                            className="text-yellow-400 transition-all duration-200"
                                            size={24}
                                        />
                                        <Star
                                            className="text-yellow-400 transition-all duration-200"
                                            size={24}
                                        />
                                        <Star
                                            className="text-yellow-400 transition-all duration-200"
                                            size={24}
                                        />
                                        <Star
                                            className="text-yellow-400 transition-all duration-200"
                                            size={24}
                                        />
                                    </>
                                ) : (
                                    <></>
                                )}
                            </p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};
