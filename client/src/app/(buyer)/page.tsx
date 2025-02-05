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
              {Array.from({ length: 4 }).map((_, index) => {
              var pageNumber: number;
              if (currentPage===1){
                pageNumber = currentPage + index;
              }
              else{
                if(currentPage>totalPages-totalPages%4){
                  pageNumber = totalPages - totalPages%4 + index
                }
                else pageNumber = currentPage + index - 1; // Hiển thị các số trang xung quanh currentPage
              }
              // Kiểm tra nếu số trang hợp lệ (lớn hơn 0 và nhỏ hơn hoặc bằng totalPages)
              if (pageNumber > 0 && pageNumber <= totalPages) {
                return (
                  <PaginationItem key={pageNumber}>
                    <PaginationLink
                      href="#"
                      isActive={currentPage === pageNumber}
                      onClick={() => setCurrentPage(pageNumber)}
                    >
                      {pageNumber}
                    </PaginationLink>
                  </PaginationItem>
                );
              }
              return null;
            })}

            {currentPage>totalPages-(totalPages%4)? undefined : 1 &&
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