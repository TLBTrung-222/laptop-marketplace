import { Breadcrumb } from "@/components/ui/breadcrumb"
import { ProductGallery } from "@/features/products/components/product-gallery"
import { ProductInfo } from "@/features/products/components/product-info"
import { ProductTabs } from "@/features/products/components/product-tabs"
import { Separator } from "@/components/ui/separator"

export default function ProductPage() {
  return (
    <div className="container mx-auto px-4 py-6">
      <Breadcrumb
        items={[
          { label: "Home", href: "/" },
          { label: "Products", href: "/products" },
          { label: "Laptops", href: "/products/category/laptops" },
        ]}
      />
      
      <div className="grid gap-8 md:grid-cols-2 lg:gap-12 mt-6">
        <ProductGallery
          images={[
            "/placeholder.svg?height=400&width=600",
            "/placeholder.svg?height=400&width=600",
            "/placeholder.svg?height=400&width=600",
          ]}
        />
        <ProductInfo
          title="MacBook Pro M2 MNEJ3 2022 LLA 13.3 inch"
          rating={4.3}
          reviews={125}
          price={1299.00}
          originalPrice={1419.87}
          discount={12}
        />
      </div>

      <Separator className="my-8" />
      
      <ProductTabs />
    </div>
  )
}

