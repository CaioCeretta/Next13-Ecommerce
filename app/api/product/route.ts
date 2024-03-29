import { NextResponse } from 'next/server'
import prisma from '@/libs/prismadb'
import getCurrentUser from '@/app/actions/getCurrentUser'

export async function POST(req: Request) {
  const currentUser = await getCurrentUser()

  if (!currentUser || currentUser.role !== 'ADMIN') {
    return NextResponse.error()
  }

  const body = await req.json()

  const { name, description, price, brand, category, inStock, images } = body

  const product = await prisma.product.create({
    data: {
      name,
      description,
      price: parseFloat(price),
      brand,
      category,
      inStock,
      images,
    },
  })
}
