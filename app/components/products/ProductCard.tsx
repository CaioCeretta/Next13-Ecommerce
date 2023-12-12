'use client'

import { formatPrice } from '@/utils/formatPrice'
import { truncateText } from '@/utils/truncateText'
import { Rating } from '@mui/material'
import Image from 'next/image'
import { useRouter } from 'next/navigation'

interface ImageProps {
  image: string
}

interface ReviewsProps {
  rating: number
}

interface ProductCardProps {
  id: string
  name: string
  price: number
  images: ImageProps[]
  reviews: ReviewsProps[]
}

const ProductCard = ({ product }: { product: ProductCardProps }) => {
  const router = useRouter()

  const { id, name, price, images, reviews } = product

  const productRating =
    reviews.reduce((acc: number, item: any) => {
      return item.rating + acc
    }, 0) / reviews.length

  return (
    <div
      onClick={() => router.push(`/product/${id}`)}
      className="col-span-1
    cursor-pointer
    rounded-sm
    border-[1.2px]
    border-slate-200
    bg-slate-50
    p-2
    text-center
    text-sm
    transition
    hover:scale-105"
    >
      <div
        className="
      width-4
      flex
      flex-col
      items-center
      gap-1
      "
      >
        <div className="relative aspect-square w-full overflow-hidden">
          <Image
            fill
            className="h-full w-full object-contain"
            src={images[0].image}
            alt={name}
          />
        </div>
        <div className="mt-4">{truncateText(name)}</div>
        <div className="font-semibold">{formatPrice(price)}</div>
        <div>
          {reviews.length > 1 ? (
            <span>{reviews.length} reviews</span>
          ) : reviews.length === 1 ? (
            <span>1 review</span>
          ) : (
            <span>No Reviews</span>
          )}
        </div>
        <div>
          <Rating value={productRating} readOnly />
        </div>
      </div>
    </div>
  )
}

export { ProductCard }
