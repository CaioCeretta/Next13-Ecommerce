'use client'

import { formatPrice } from "@/utils/formatPrice";
import { truncateText } from "@/utils/truncateText";
import { Rating } from "@mui/material";
import Image from "next/image";

interface ProductCardProps {
  product: any
}

const ProductCard = ({product}: ProductCardProps) => {
  
  const productRating = product.reviews.reduce((acc: number, item: any) => {
    return item.rating + acc},  0) / product.reviews.length

  return (
    <div className="col-span-1
    cursor-pointer
    border-[1.2px]
    border-slate-200
    bg-slate-50
    rounded-sm
    p-2
    transition
    hover:scale-105
    text-center
    text-sm">
      <div className="
      flex
      flex-col
      items-center
      width-4
      gap-1
      ">
        <div className="aspect-square overflow-hidden relative w-full">
          <Image
          fill
          className="w-full h-full object-contain"
          src={product.images[0].image}
          alt={product.name}
          />
        </div>
        <div className="mt-4">
          {truncateText(product.name)}
        </div>
        <div className="font-semibold">
          {formatPrice(product.price)}
        </div>
        <div>
          {product.reviews.length > 1 ? (
            <span>{product.reviews.length} reviews</span>
          ) : product.reviews.length === 1 ? (
            <span>1 review</span>
          ) : (
            <span>No Reviews</span>
          )}
        </div>
        <div>
          <Rating value={productRating} readOnly/>
        </div>
      </div>
    </div>
  );
}

export { ProductCard };