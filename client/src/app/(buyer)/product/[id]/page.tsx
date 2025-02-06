import { productListExample } from "../../component/product-ex";
import { notFound } from "next/navigation";
import ProductImages from "../../component/product-image";
import ProductReview from "../../component/product-review";
import ProductDetail from "../../component/product-detail";

// Server-side function to generate the static paths (URLs for product pages)
export function generateStaticParams() {
  const paths = productListExample.map((product) => ({
    id: product.id.toString(),
  }));

  console.log("Generated Paths:", paths);
  return paths.map((path) => ({ params: path }));
}

export default function ProductPage({ params }: { params: { id: string } }) {
  const id = Number(params.id); // Convert id to number
  const product = productListExample.find((p) => p.id === id);

  if (!product) {
    return notFound(); // Return "Not Found" if the product doesn't exist
  }

  return (
    <div className="">
      <div className="sm:flex">
        <ProductImages product={product}/>
        <ProductReview product={product}/>
      </div>
      <ProductDetail product={product}/>
    </div>
  );
}
