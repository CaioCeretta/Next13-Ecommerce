'use client'

import { useCart } from '@/hooks/useCart'
import Link from 'next/link'
import { MdArrowBack } from 'react-icons/md'
import Heading from '../components/Heading'
import Button from '../components/Button'
import ItemContent from './ItemContent'
import { formatPrice } from '@/utils/formatPrice'
import { SafeUser } from '@/types'
import { useRouter } from 'next/navigation'

interface CartClientProps {
  currentUser: SafeUser | null
}

const CartClient = ({ currentUser }: CartClientProps) => {
  const { cartProducts, handleClearCart, cartTotalAmount } = useCart()

  const router = useRouter()

  if (!cartProducts || cartProducts.length === 0) {
    return (
      <div className="flex flex-col items-center">
        <div className="text-2xl">Your cart is empty</div>
        <div>
          <Link
            href={'/'}
            className="
            flex items-center text-slate-500
          "
          >
            <MdArrowBack size={24} />
            <span>Start Shopping</span>
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div>
      <Heading title="Shopping Cart" center />
      <div className="mt-8 grid grid-cols-5 items-center gap-4 pb-2 text-xs">
        <div className="col-span-2 justify-self-start">PRODUCT</div>
        <div className="justify-self-start">PRICE</div>
        <div className="justify-self-start">QUANTITY</div>
        <div className="justify-self-end">TOTAL</div>
      </div>
      <div>
        {cartProducts &&
          cartProducts.map((item) => {
            return <ItemContent product={item} key={item.id} />
          })}
      </div>
      <div className="flex justify-between gap-4 border-t-[1.5px] border-slate-200 py-4">
        <div className="w-[90px]">
          <Button
            label="Clear Cart"
            onClick={() => handleClearCart()}
            small
            outline
          />
        </div>
        <div>
          <div>
            <span>Sub total: {formatPrice(cartTotalAmount)}</span>
            <p>Taxes and shipping calculated at checkout</p>
            <Button
              label={currentUser ? 'Checkout' : 'Login To Checkout'}
              outline={!currentUser}
              onClick={() => {
                currentUser ? router.push('/checkout') : router.push('/login')
              }}
            />
            <Link
              href={'/'}
              className="
            mt-2 flex items-center gap-1 text-slate-500"
            >
              <MdArrowBack />
              <span>Continue Shopping</span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CartClient
