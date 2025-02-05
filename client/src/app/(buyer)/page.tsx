"use client"
import { useGetProducts } from "@/features/products/apis/use-get-products";
import { Fragment, useEffect, useState } from "react";
import { Product } from "@/types";
import { Pagination, PaginationContent, PaginationEllipsis, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from "@/components/ui/pagination";
import ProductList from "./component/productList";
import Header from "./component/header";
import Footer from "./component/footer";
import { productListExample } from "./component/product-ex";

export default function Home() {
  var {data, isLoading, error}= useGetProducts();
  const [mounted, setMounted] = useState(false);
  data=productListExample;
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
        {/* <PaginatedProducts products={data} perPage={1}/> */}
        <PaginatedProducts products={productListExample} perPage={1}/>
      </main>
      <Footer/>
    </div>
  );
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