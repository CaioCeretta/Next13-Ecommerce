/* Everytime we are going to use a hook, we need to define this as a client component, because client components are
interactive, and they will be rendered in the browser' */
'use client'

import Button from '@/app/components/Button'
import ProductImage from '@/app/components/products/ProductImage'
import SetColor from '@/app/components/products/SetColor'
import SetQuantity from '@/app/components/products/SetQuantity'
import { useCart } from '@/hooks/useCart'
import { Rating } from '@mui/material'
import { useRouter } from 'next/navigation'
import { useCallback, useEffect, useState } from 'react'
import { MdCheckCircle } from 'react-icons/md'

interface ProductDetailsProps {
  product: any
}

export type SelectedImgType = {
  color: string
  colorCode: string
  image: string
}

export type CartProductType = {
  id: string
  name: string
  description: string
  category: string
  brand: string
  selectedImg: SelectedImgType
  quantity: number
  price: number
}

const Horizontal = () => {
  return <hr className="my-2 w-[30%]"></hr>
}

const ProductDetails = ({ product }: ProductDetailsProps) => {
  const { cartProducts, handleAddProductToCart } = useCart()
  const [isProductInCart, setIsProductInCart] = useState(false)

  const [cartProduct, setCartProduct] = useState<CartProductType>({
    id: product.id,
    name: product.name,
    description: product.description,
    category: product.category,
    brand: product.brand,
    selectedImg: { ...product.images[0] },
    quantity: 1,
    price: product.price,
  })

  const router = useRouter()

  useEffect(() => {
    setIsProductInCart(false)

    if (cartProducts) {
      const existentIdx = cartProducts.findIndex(
        (item) => product.id === item.id,
      )

      if (existentIdx > -1) {
        setIsProductInCart(true)
      }
    }
  }, [cartProducts])

  const productRating =
    product.reviews.reduce((acc: number, item: any) => {
      return item.rating + acc
    }, 0) / product.reviews.length

  const handleColorSelect = useCallback((value: SelectedImgType) => {
    setCartProduct((prevCart) => {
      return { ...prevCart, selectedImg: value }
    })
  }, [])

  const handleQtyIncrease = useCallback(() => {
    setCartProduct((prev) => {
      return {
        ...prev,
        quantity: prev.quantity < 99 ? prev.quantity + 1 : prev.quantity,
      }
    })
  }, [])

  const handleQtyDecrease = useCallback(() => {
    setCartProduct((prev) => {
      return {
        ...prev,
        quantity: prev.quantity > 0 ? prev.quantity - 1 : prev.quantity,
      }
    })
  }, [])

  return (
    <div className="grid grid-cols-1 gap-12 md:grid-cols-2">
      <div>
        <ProductImage
          cartProduct={cartProduct}
          handleColorSelect={handleColorSelect}
          product={product}
        />
      </div>
      <div className="flex flex-col gap-2 text-sm text-slate-500">
        <h2 className="text-3xl font-medium text-slate-700">{product.name}</h2>
        <Horizontal />
        <div className="flex items-center gap-2">
          <Rating value={productRating} readOnly />
          {product.reviews.length > 1 || product.reviews.length === 0 ? (
            <p>{product.reviews.length} reviews</p>
          ) : (
            <p>1 review</p>
          )}
        </div>
        <div>{product.description}</div>
        <Horizontal />
        <div>
          <span className="font-semibold">CATEGORY: </span>
          {product.category}
        </div>
        <div>
          <span className="font-semibold">BRAND: </span>
          {product.brand}
        </div>
        <div
          className={`${product.inStock ? 'text-teal-500' : 'text-rose-400'}`}
        >
          {product.inStock ? 'In Stock' : 'Out of Stock'}
        </div>
        <Horizontal />
        {isProductInCart ? (
          <>
            <p className="item-center mb-2 flex gap-1 text-slate-500">
              <MdCheckCircle size={20} className="text-teal-200" />
              <span>Product added to cart</span>
            </p>
            <div className="max-w-[300px]">
              <Button
                label="View Cart"
                outline
                onClick={() => router.push('/cart')}
              />
            </div>
          </>
        ) : (
          <div>
            <SetColor
              cartProduct={cartProduct}
              images={product.images}
              handleColorSelect={handleColorSelect}
            />
            <Horizontal />
            <SetQuantity
              cartProduct={cartProduct}
              handleQtyIncrease={handleQtyIncrease}
              handleQtyDecrease={handleQtyDecrease}
            />
            <Horizontal />
            <div className="max-w-[300px]">
              <Button
                label="Add to Cart"
                onClick={(product) => handleAddProductToCart(cartProduct)}
              />
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default ProductDetails
