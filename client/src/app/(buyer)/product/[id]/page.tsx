import { notFound } from "next/navigation";
import ProductImages from "../../../../features/home/component/product-image";
import ProductReview from "../../../../features/home/component/product-review";
import { getProducts } from "@/features/products/apis/use-get-product";
import ProductDetails from "../../../../features/home/component/product-detail";
import { toast } from "sonner";


export async function generateStaticParams() {
  const data = await getProducts()
  if (!data) return []
  const paths = data?.map((product:any) => ({
    id: product.id.toString(),
  }));

  return paths?.map((path:any) => ({ params: path }));
}

export default async function ProductPage({ params }: { params: { id: string } }) {
  const data = await getProducts();
  // return(<p>{data.length}</p>)
  const id = Number(params.id); // Convert id to number
  const product = data?.find((p:any) => p.id === id);
  if (!product) {
    return notFound();
  }

  return (
    <div className="sm:ml-6 sm:mr-6 flex items-center justify-center flex-col">
      <div className="sm:flex">
        <ProductImages product={product}/>
        <ProductReview product={product}/>
      </div>
      <ProductDetails product={product}/>
    </div>
  );
}
