import { notFound } from "next/navigation";
import ProductImages from "../../component/product-image";
import ProductReview from "../../component/product-review";
import ProductDetail from "../../component/product-detail";
import { getProducts } from "@/features/products/apis/use-get-product";


export async function generateStaticParams() {
  const data = await getProducts()
  const paths = data?.map((product:any) => ({
    id: product.id.toString(),
  }));

  return paths?.map((path:any) => ({ params: path }));
}

export default async function ProductPage({ params }: { params: { id: string } }) {
  const data = await getProducts();
  const id = Number(params.id); // Convert id to number
  const product = data?.find((p:any) => p.id === id);

  if (!product) {
    return notFound(); // Return "Not Found" if the product doesn't exist
  }

  return (
    <div className="sm:ml-6 sm:mr-6">
      <div className="sm:flex">
        <ProductImages product={product}/>
        <ProductReview product={product}/>
      </div>
      <ProductDetail product={product}/>
    </div>
  );
}
