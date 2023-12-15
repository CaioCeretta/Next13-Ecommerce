import { CartProductType } from '@/app/product/[productId]/ProductDetails'
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from 'react'

type CartContextType = {
  cartTotalQty: number
  cartProducts?: CartProductType[] | null
  handleAddProductToCart: (product: CartProductType) => void
}

export const CartContext = createContext<CartContextType | null>(null)

interface ContextProps {
  [propName: string]: any
}

export const CartContextProvider = (props: ContextProps) => {
  const [cartTotalQty, setCartTotalQty] = useState(0)
  const [cartProducts, setCartProducts] = useState<CartProductType[] | null>(
    null,
  )

  useEffect(() => {
    const cartItems: any = localStorage.getItem('eShopCartItems')

    const productsInCart: CartProductType[] | null = JSON.parse(cartItems)

    setCartProducts(productsInCart)
  }, [])

  const handleAddProductToCart = useCallback((product: CartProductType) => {
    let updatedCart

    setCartProducts((prev) => {
      if (product && prev !== null) {
        updatedCart = [...prev, product]
      } else {
        updatedCart = [product]
      }

      localStorage.setItem('eShopCartItems', JSON.stringify(updatedCart))

      return updatedCart
    })
  }, [])

  const value = {
    cartTotalQty,
    cartProducts,
    handleAddProductToCart,
  }

  return <CartContext.Provider value={value} {...props} />
}

export const useCart = () => {
  const context = useContext(CartContext)

  if (!context) {
    throw new Error('useCart must be used inside a CartContextProvider')
  }

  return context
}
