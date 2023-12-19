import { formatPrice } from '@/utils/formatPrice'
import { product } from '@/utils/product'
import { truncateText } from '@/utils/truncateText'
import Image from 'next/image'
import Link from 'next/link'
import { SelectedImgType } from '../product/[productId]/ProductDetails'

import SetQuantity from '../components/products/SetQuantity'
import { useCart } from '@/hooks/useCart'

interface ProductProps {
  id: string
  name: string
  description: string
  price: number
  quantity: number
  category: string
  brand: string
  selectedImg: SelectedImgType
}

interface ItemContentProps {
  product: ProductProps
}

const ItemContent = ({ product }: ItemContentProps) => {
  const { id, selectedImg, description, name, price, quantity } = product

  const {
    handleRemoveItemFromCart,
    handleCartQtyIncrease,
    handleCartQtyDecrease,
  } = useCart()

  return (
    <div
      className="
    grid grid-cols-5
    items-center gap-4 border-t-[1.5px]
    border-slate-200 py-4 text-xs md:text-sm"
    >
      <div
        className="
      col-span-2
      flex
      gap-2
      justify-self-start
      md:gap-4
      "
      >
        <Link href={`/product/${product.id}`}>
          <div className="relative aspect-square w-[70px]">
            <Image
              src={selectedImg.image}
              alt={name}
              fill
              className="object-contain"
            />
          </div>
        </Link>
        <div className="flex flex-col justify-between">
          <Link href={`/product/${product.id}`}>{truncateText(name)}</Link>
          <div>{selectedImg.color}</div>
          <div className="w-[70px]">
            <button
              className="text-slate-500
            underline"
              onClick={() => handleRemoveItemFromCart(product)}
            >
              Remove
            </button>
          </div>
        </div>
      </div>
      <div>{formatPrice(price)}</div>
      <div className="">
        <SetQuantity
          cartCounter={true}
          cartProduct={product}
          handleQtyIncrease={() => handleCartQtyIncrease(product)}
          handleQtyDecrease={() => handleCartQtyDecrease(product)}
        />
      </div>
      <div className="justify-self-end">{formatPrice(price * quantity)}</div>
    </div>
  )
}

export default ItemContent
