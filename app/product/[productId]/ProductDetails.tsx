/* Everytime we are going to use a hook, we need to define this as a client component, because client components are
interactive, and they will be rendered in the browser' */
'use client'

import SetColor from "@/app/components/products/SetColor";
import { Rating } from "@mui/material";
import { useCallback, useState } from "react";

interface ProductDetailsProps {
  product: any
}

export type CartProductType = {
  id: string,
  name: string,
  description: string,
  category: string,
  brand: string,
  selectedImg: SelectedImgType,
  quantity: number,
  price: number
}

export type SelectedImgType = {
  color: string,
  colorCode: string,
  image: string
}

const Horizontal = () => {
  return <hr className="w-[30%] my-2"></hr>
}


const ProductDetails = ({ product }: ProductDetailsProps) => {
  const [cartProduct, setCartProduct] = useState<CartProductType>({
    id: product.id,
    name: product.name,
    description: product.description,
    category: product.category,
    brand: product.brand,
    selectedImg: {...product.images[0]},
    quantity: 1,
    price: product.price
  })

  const productRating = product.reviews.reduce((acc: number, item: any) => {
    return item.rating + acc
  }, 0) / product.reviews.length

  const handleColorSelect = useCallback((value: SelectedImgType) => {
      setCartProduct((prevCart) => {
        return {...prevCart, selectedImg: value}
      })
  }, [])


  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
      <div>
        Images
      </div>
      <div className="flex flex-col gap-2 text-slate-500 text-sm">
        <h2 className="text-3xl font-medium text-slate-700">{product.name}</h2>
        <Horizontal />
        <div className="flex items-center gap-2">
          <Rating value={productRating} readOnly />
          {product.reviews.length > 1 || product.reviews.length == 0 ? (
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
        <div className={`${product.inStock ? 'text-teal-500' : 'text-rose-400'}`}>{product.inStock ?
          'In Stock' : 
          'Out of Stock' }
        </div>
        <Horizontal />
        <SetColor
        cartProduct={cartProduct}
        images={product.images}
        handleColorSelect={handleColorSelect}
        />
        <Horizontal />
        <div>Quantity</div>
        <Horizontal />
        <div>Add to Cart</div>
      </div>
    </div>
  );
}

export default ProductDetails;