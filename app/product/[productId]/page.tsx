import { Container } from '@/app/components/Container'
import RatingList from '@/app/components/products/RatingList'
import { products } from '@/utils/products'
import ProductDetails from './ProductDetails'

interface IParams {
  productId?: string
}

const Product = ({ params: { productId } }: { params: IParams }) => {
  const product = products.find((id) => productId === id.id)

  return (
    <div className="p-8">
      <Container>
        <ProductDetails product={product} />
        <div className="mt-20 flex flex-col gap-4">
          <div>Add Rating</div>
          <RatingList product={product} />
        </div>
      </Container>
    </div>
  )
}

export default Product
