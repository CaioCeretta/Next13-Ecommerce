/* If the parent component is a client component, the childs are also going to be, so it is optional to set it like this */
'use client'

import {
  CartProductType,
  SelectedImgType,
} from '@/app/product/[productId]/ProductDetails'
import Image from 'next/image'

interface ProductImageProps {
  cartProduct: CartProductType
  product: any
  handleColorSelect: (value: SelectedImgType) => void
}

const ProductImage = ({
  cartProduct,
  product,
  handleColorSelect,
}: ProductImageProps) => {
  return (
    <div
      className="
        grid
        h-full
        max-h-[500px]
        min-h-[300px]
        grid-cols-6
        gap-2
        
        sm:min-h-[400px]"
    >
      <div
        className="relative
        flex
        h-full
        max-h-[500px]
        min-h-[300px]
        cursor-pointer
        flex-col
        items-center
        justify-center
        gap-4
        overflow-visible
        border
        sm:min-h-[400px]
        "
      >
        {product.images.map((image: SelectedImgType) => {
          return (
            <div
              key={image.color}
              onClick={() => handleColorSelect(image)}
              className={`relative aspect-square w-[80%] rounded border-teal-300
            ${
              cartProduct.selectedImg.color === image.color
                ? 'border-[1.5px]'
                : 'border-none'
            }
              `}
            >
              <Image
                src={image.image}
                alt={image.color}
                fill
                className="object-contain"
              />
            </div>
          )
        })}
      </div>
      <div className="relative col-span-5 aspect-square">
        <Image
          fill
          className="
          h-full
          max-h-[500px]
          min-h-[300px]
          w-full
          object-contain"
          src={cartProduct.selectedImg.image}
          alt={cartProduct.selectedImg.color}
        />
      </div>
    </div>
  )
}
export default ProductImage
