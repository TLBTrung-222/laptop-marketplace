import { Button } from "@/components/ui/button";
import { formatCurrency } from "./format-currency";
import { Product } from "@/types";

export default function ProductReview({product}:{product:Product}){
    return(
        <div className="md:flex ml-2 gap-10">
            <div className="mt-10 sm:max-w-100">
                <h3 className="font-bold">{product.name}</h3>
                <p>{product.description}</p>
                {/* <p>{product.brand}</p> */}    
            </div>
            <div className="mt-12">
                <p className="">${formatCurrency(product.price)}</p>
                <Button className="w-40 bg-blue-600">Buy Now</Button>
            </div>
        </div>
    )
}