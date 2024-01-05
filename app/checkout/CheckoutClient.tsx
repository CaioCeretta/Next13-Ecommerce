'use client'

import { useCart } from '@/hooks/useCart'
import { useRouter } from 'next/navigation'
import { useCallback, useEffect, useState } from 'react'
import toast from 'react-hot-toast'
import { StripeElementsOptions, loadStripe } from '@stripe/stripe-js'
import { Elements } from '@stripe/react-stripe-js'
import CheckoutForm from './CheckoutForm'
import Button from '../components/Button'
import stripe from 'stripe'

const stripePromise = loadStripe(
  process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY as string,
)

const CheckoutClient = () => {
  const { cartProducts, paymentIntent, handleSetPaymentIntent } = useCart()
  const [loading, setIsLoading] = useState(false)
  const [error, setIsError] = useState(false)
  const [clientSecret, setClientSecret] = useState('')
  const [paymentSuccess, setPaymentSuccess] = useState(false)

  const router = useRouter()

  console.log('paymentIntent', paymentIntent)
  console.log('clientSecret', clientSecret)

  useEffect(() => {
    // Create a payment intent as soon as the page loads
    if (cartProducts) {
      setIsLoading(true)
      setIsError(false)

      fetch('/api/create-payment-intent', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          items: cartProducts,
          payment_intent_id: paymentIntent,
        }),
      })
        .then((res) => {
          setIsLoading(false)
          if (res.status === 401) {
            router.push('/login')
          }

          return res.json()
        })
        .then((data) => {
          setClientSecret(data.paymentIntent.client_secret)

          handleSetPaymentIntent(data.paymentIntent.id)
        })
        .catch((err) => {
          setIsError(true)
          console.log('Error: ', err)
          toast.error('Something went wrong')
        })
    }
  }, [cartProducts, handleSetPaymentIntent, paymentIntent, router])

  const options: StripeElementsOptions = {
    clientSecret,
    appearance: {
      theme: 'stripe',
      labels: 'floating',
    },
  }

  const handleSetPaymentSuccess = useCallback(
    (value: boolean) => {
      setPaymentSuccess(value)
    },
    [paymentSuccess],
  )

  return (
    <div className="w-full">
      {clientSecret.length && cartProducts && (
        <Elements stripe={stripePromise} options={options}>
          <CheckoutForm
            clientSecret={clientSecret}
            handleSetPaymentSuccess={handleSetPaymentSuccess}
          />
        </Elements>
      )}
      {loading && <div className="text-center">Loading Checkout</div>}
      {error && (
        <div className="text-center text-rose-500">
          Something went wrong: {error}
        </div>
      )}
      {paymentSuccess && (
        <div className="flex flex-col items-center gap-4">
          <div className="text-center text-teal-500">Payment Success</div>
          <div className="w-full max-w-[16rem]">
            <Button
              label="View your Orders"
              onClick={() => router.push('/order')}
            />
          </div>
        </div>
      )}
    </div>
  )
}

export default CheckoutClient
