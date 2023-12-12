'use client'

import { CartProductType } from '@/app/product/[productId]/ProductDetails'

interface SetQtyProps {
  cartCounter?: boolean
  cartProduct: CartProductType
  handleQtyIncrease: () => void
  handleQtyDecrease: () => void
}

const btnStyles = 'border-[1.2px] border-slate-300 px-2 rounded'

const SetQuantity = ({
  cartProduct,
  cartCounter,
  handleQtyDecrease,
  handleQtyIncrease,
}: SetQtyProps) => {
  return (
    <>
      <div className="flex items-center">
        {cartCounter ? 1 : <div className="font-semibold">QUANTITY</div>}
      </div>
      <div className="flex gap-4 text-base">
        <button onClick={handleQtyDecrease} className={btnStyles}>
          -
        </button>
        <div>{cartProduct.quantity}</div>
        <button onClick={handleQtyIncrease} className={btnStyles}>
          +
        </button>
      </div>
    </>
  )
}

export default SetQuantity
