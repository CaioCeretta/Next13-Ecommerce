import Stripe from 'stripe'
import prisma from '@/libs/prismadb'
import { NextResponse } from 'next/server'
import { CartProductType } from '@/app/product/[productId]/ProductDetails'
import { getCurrentUser } from '@/app/actions/getCurrentUser'

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY ?? '', {
  apiVersion: '2023-10-16',
})

const calculateOrderAmount = (items: CartProductType[]) => {
  const totalPrice = items.reduce((acc, item) => {
    const itemTotal = item.price * item.quantity

    return acc + itemTotal
  }, 0)

  return totalPrice
}

export async function POST(request: Request) {
  const currentUser = await getCurrentUser()

  if (!currentUser) {
    return NextResponse.json({ error: `Unauthoriezed` }, { status: 401 })
  }

  const body = await request.json()

  const { items, paymentIntentId } = body

  const total = calculateOrderAmount(items) * 100

  const orderData = {
    user: { connect: { id: currentUser.id } },
    amount: total,
    currency: 'usd',
    status: 'pending',
    deliveryStatus: 'pending',
    paymentIntentId,
    products: items,
  }

  if (paymentIntentId) {
    // update order
    const currentIntent = await stripe.paymentIntents.retrieve(paymentIntentId)

    console.log(currentIntent)

    if (currentIntent) {
      const updatedIntent = await stripe.paymentIntents.update(
        paymentIntentId,
        { amount: total },
      )
      // Update order
      const [existingOrder, updateOrder] = await Promise.all([
        prisma.order.findFirst({
          where: {
            paymentIntentId,
          },
        }),
        prisma.order.update({
          where: {
            paymentIntentId,
          },
          data: {
            amount: total,
            products: items,
          },
        }),
      ])

      if (existingOrder) {
        return NextResponse.json({
          error: 'Invalid payment intent',
          status: 400,
        })
      }
      return NextResponse.json({ paymentIntent: updatedIntent })
    }
  } else {
    // create the payment intent

    const paymentIntent = await stripe.paymentIntents.create({
      amount: total,
      currency: 'usd',
      automatic_payment_methods: { enabled: true },
    })

    // create the order
    orderData.paymentIntentId = paymentIntent.id

    await prisma.order.create({
      data: orderData,
    })

    return NextResponse.json({ paymentIntent })
  }
}
