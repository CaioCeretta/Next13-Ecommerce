import { CartProductType } from '@/app/product/[productId]/ProductDetails'
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from 'react'

import { toast } from 'react-hot-toast'

type CartContextType = {
  cartTotalQty: number
  cartTotalAmount: number
  cartProducts?: CartProductType[] | null
  handleAddProductToCart: (product: CartProductType) => void
  handleRemoveItemFromCart: (product: CartProductType) => void
  handleCartQtyIncrease: (product: CartProductType) => void
  handleCartQtyDecrease: (product: CartProductType) => void
  handleClearCart: () => void
  paymentIntent: string | null
  handleSetPaymentIntent: (val: string | null) => void
  // subtotal: () => number
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
  const [cartTotalAmount, setCartTotalAmount] = useState(0)

  const [paymentIntent, setPaymentIntent] = useState<string | null>(null)

  useEffect(() => {
    const cartItems: any = localStorage.getItem('eShopCartItems')
    const productsInCart: CartProductType[] | null = JSON.parse(cartItems)
    const eShopPaymentIntent: any = localStorage.getItem('eShopPaymentIntent')

    const paymentIntent: string | null = JSON.parse(eShopPaymentIntent)

    setCartProducts(productsInCart)
    setPaymentIntent(paymentIntent)
  }, [])

  useEffect(() => {
    const getTotals = () => {
      if (cartProducts) {
        const { total, qty } = cartProducts.reduce(
          (acc, item) => {
            const itemTotal = item.price * item.quantity

            acc.total += itemTotal
            acc.qty += item.quantity

            return acc
          },
          {
            total: 0,
            qty: 0,
          },
        )
        setCartTotalQty(qty)
        setCartTotalAmount(total)
      }
    }

    getTotals()
  }, [cartProducts])

  const handleAddProductToCart = useCallback((product: CartProductType) => {
    let updatedCart

    setCartProducts((prev) => {
      if (product && prev !== null) {
        updatedCart = [...prev, product]
      } else {
        updatedCart = [product]
      }

      toast.success('Product added to cart')
      localStorage.setItem('eShopCartItems', JSON.stringify(updatedCart))

      return updatedCart
    })
  }, [])

  const handleRemoveItemFromCart = useCallback(
    (product: CartProductType) => {
      if (cartProducts) {
        const filteredProducts = cartProducts.filter(
          (cartProduct) => cartProduct.id !== product.id,
        )
        setCartProducts(filteredProducts)
        toast.success('Product removed')
        localStorage.setItem('eShopCartItems', JSON.stringify(filteredProducts))
      }
    },
    [cartProducts],
  )

  const handleCartQtyIncrease = useCallback(
    (product: CartProductType) => {
      let updatedCart
      if (product.quantity === 99) {
        return toast.error('Maximum amount reached')
      }

      if (cartProducts) {
        updatedCart = [...cartProducts]

        updatedCart = cartProducts.map((item) =>
          item.id === product.id
            ? { ...item, quantity: ++item.quantity }
            : item,
        )

        console.log(updatedCart)

        setCartProducts(updatedCart)

        localStorage.setItem('eShopCartItems', JSON.stringify(updatedCart))
      }
      /* or 
      const existingIndex = cartProducts.findIndex(
        (item) => item.id === product.id,
      )

      if (existingIndex > -1) {
        updatedCart[existingIndex].quantity = ++updatedCart[existingIndex]
          .quantity
      }
    }
    */
    },
    [cartProducts],
  )

  const handleCartQtyDecrease = useCallback(
    (product: CartProductType) => {
      let updatedCart
      if (product.quantity === 0) {
        return toast.error('Minimum amount reached')
      }

      if (cartProducts) {
        updatedCart = [...cartProducts]

        updatedCart = cartProducts.map((item) =>
          item.id === product.id
            ? { ...item, quantity: --item.quantity }
            : item,
        )

        console.log(updatedCart)

        setCartProducts(updatedCart)

        localStorage.setItem('eShopCartItems', JSON.stringify(updatedCart))
      }
    },
    [cartProducts],
  )

  const handleClearCart = useCallback(() => {
    setCartProducts(null)
    setCartTotalQty(0)
    localStorage.setItem('eShopCartItems', JSON.stringify(null))
  }, [cartProducts])

  // const subtotal = () => {
  //   // cartProducts.reduce((acc, val) => {
  //   //   acc += val.quantity * val.price

  //   //   return acc
  //   // }, 0)
  //   if (cartProducts) {
  //     const subTotal = cartProducts.reduce(
  //       (acc, val) => acc + val.quantity * val.price,
  //       0,
  //     )

  //     return subTotal
  //   }

  //   /* or
  //     cartProducts.reduce((acc, val) => acc + val.quantity * val,price, 0)
  //   */

  //   return null
  // }

  const handleSetPaymentIntent = useCallback(
    (val: string | null) => {
      setPaymentIntent(val)
      localStorage.setItem('eShopPaymentIntent', JSON.stringify(val))
    },
    [paymentIntent],
  )

  const value = {
    cartTotalQty,
    cartProducts,
    handleAddProductToCart,
    handleRemoveItemFromCart,
    handleCartQtyIncrease,
    handleCartQtyDecrease,
    handleClearCart,
    cartTotalAmount,
    paymentIntent,
    handleSetPaymentIntent,
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
