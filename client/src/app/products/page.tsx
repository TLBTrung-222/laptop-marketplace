import Link from 'next/link'
import { ProductCard } from '../../features/products/components/product-card'

// Giả lập dữ liệu sản phẩm - trong thực tế, bạn sẽ fetch dữ liệu từ API
const products = [
  { id: '1', name: 'MacBook Pro M2', price: 1299, image: '/placeholder.svg?height=200&width=300' },
  { id: '2', name: 'Dell XPS 13', price: 999, image: '/placeholder.svg?height=200&width=300' },
  { id: '3', name: 'HP Spectre x360', price: 1099, image: '/placeholder.svg?height=200&width=300' },
  { id: '4', name: 'Lenovo ThinkPad X1', price: 1199, image: '/placeholder.svg?height=200&width=300' },
]

export default function ProductsPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6">Our Products</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {products.map((product) => (
          <Link key={product.id} href={`/products/${product.id}`}>
            <ProductCard
              name={product.name}
              price={product.price}
              image={product.image}
            />
          </Link>
        ))}
      </div>
    </div>
  )
}

