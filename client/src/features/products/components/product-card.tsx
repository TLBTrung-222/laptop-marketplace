import Image from 'next/image'

interface ProductCardProps {
  name: string
  price: number
  image: string
}

export function ProductCard({ name, price, image }: ProductCardProps) {
  return (
    <div className="border rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow">
      <div className="relative h-48">
        <Image
          src={image}
          alt={name}
          fill
          className="object-cover"
        />
      </div>
      <div className="p-4">
        <h2 className="font-semibold text-lg mb-2">{name}</h2>
        <p className="text-gray-600">${price.toFixed(2)}</p>
      </div>
    </div>
  )
}

