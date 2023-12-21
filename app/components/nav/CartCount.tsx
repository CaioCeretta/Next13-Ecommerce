'use client'

import { CiShoppingCart } from 'react-icons/ci'

import { useCart } from '@/hooks/useCart'
import { useRouter } from 'next/navigation'

const CartCount = () => {
  const router = useRouter()

  const { cartTotalQty } = useCart()

  return (
    <div
      className="relative cursor-pointer"
      onClick={() => router.push('/cart')}
    >
      <div className="text-4xl">
        <CiShoppingCart />
      </div>
      <span
        className="absolute right-[-0.7rem] top-[-0.7rem]
      flex h-6 w-6 items-center justify-center rounded-full bg-slate-700 text-sm text-white"
      >
        {cartTotalQty}
      </span>
    </div>
  )
}

export default CartCount
