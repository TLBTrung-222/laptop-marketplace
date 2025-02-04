"use client"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useGetProducts } from "@/features/products/apis/use-get-products";
import Image from "next/image";
import { Fragment, useEffect, useState } from "react";
import { Product } from "@/types";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { Pagination, PaginationContent, PaginationEllipsis, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from "@/components/ui/pagination";
import ProductList from "./component/productList";
import Header from "./component/header";

export default function Home() {
  var {data, isLoading, error}= useGetProducts();
  const [isSignIn, setIsSignIn] = useState(true);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  return (
    <div className="min-h-screen flex flex-col">  
      <Header data={data}/>
      <main className="pl-8 pt-1 pb-1 pr-8">
        <PaginatedProducts products={data} perPage={12}/>
      </main>
      <Footer/>
    </div>
  );
}

const Footer = ()=>{
  return(
    <footer className="row-start-3 gap-6 items-center justify-center bg-[#253B80] p-4 mt-4 ml-0 mr-0 w-full text-[#CBCBCB]">
      <div className="flex justify-between">
        <div>
          <h1 className="text-white">Company</h1>
          <p>about us</p>
          <p>blog</p>
          <p>returns</p>
          <p>order status</p>
        </div>
        <div>
          <h1 className="text-white">Info</h1>
          <p>How it works?</p>
          <p>FAQ</p>
        </div>
        <div>
          <h1 className="text-white">Contact us</h1>
          <div className="flex">
            <Image
              src="/location.ico"
              width={24}
              height={24}
              alt="location"
            />
            <p>123 Main Street, Any Town, VN</p>
          </div>
          <div className="flex">
            <Image
              src="/call-calling.ico"
              width={24}
              height={24}
              alt="call-calling"
            />
            <p>+84 (012) 34-4567</p>
          </div>
          <div className="flex">
            <Image
              src="/sms.ico"
              width={24}
              height={24}
              alt="sms"
            />
            <p>TechHeimSupport@gmail.com</p>
          </div>
        </div> 
        <div>
          <h1 className="text-white">Sign up for News and updates</h1>
          <div className="flex gap-1">
            <Image
              src="/facebook.ico"
              width={30}
              height={30}
              alt="sms"
            />
            <Image
              src="/twitter.ico"
              width={30}
              height={30}
              alt="sms"
            />
            <Image
              src="/Instagram.ico"
              width={30}
              height={30}
              alt="sms"
            />
            <Image
              src="/Youtube.ico"
              width={30}
              height={30}
              alt="sms"
            />
          </div>
        </div>
        <div className="flex flex-col justify-between">
          <Image
              src="/online-chat.png"
              width={30}
              height={30}
              alt="sms"
            />
          <Image
              src="/back-to-up.png"
              width={30}
              height={30}
              alt="sms"
              className="hover:cursor-pointer"
            />
        </div>
      </div>
      <div className="copy right"></div>
    </footer>
  )
}

const PaginatedProducts=({products, perPage}:{products:Product[]|undefined; perPage:number})=>{
  const [currentPage, setCurrentPage] = useState(1);
  const startIndex = (currentPage-1) * perPage;
  const endIndex = startIndex + perPage;
  const currentProducts = products?.slice(startIndex, endIndex);
  const totalPages = products?Math.ceil(products.length/perPage):0;

  return (
    <Fragment>
      <ProductList data={currentProducts}/>
      <div className="mt-4 flex gap-2">
        <Pagination>
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious href="#"
                onClick={()=> setCurrentPage((prev)=>Math.max(prev-1,1))}
                className={`${currentPage === 1 ? "opacity-50 cursor-not-allowed" : ""}`}
              />
            </PaginationItem>
            {/* Render số trang */}
            {Array.from({ length: totalPages }).map((_, index) => (
              <PaginationItem key={index}>
                <PaginationLink
                  href="#"
                  isActive={currentPage === index + 1}
                  onClick={() => setCurrentPage(index + 1)}
                >
                  {index + 1}
                </PaginationLink>
              </PaginationItem>
            ))}

            {totalPages>5&&
            <PaginationItem>
              <PaginationEllipsis />
            </PaginationItem>}

            <PaginationItem>
              <PaginationNext href="#" 
                onClick={()=>setCurrentPage((prev)=>Math.min(prev+1,totalPages))}
                className={`${currentPage === totalPages ? "opacity-50 cursor-not-allowed" : ""}`}
              />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      </div>
    </Fragment>
  );
}