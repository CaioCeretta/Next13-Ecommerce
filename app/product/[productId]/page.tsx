import { Container } from '@/app/components/Container'
import ProductDetails from './ProductDetails'
import { products } from '@/utils/products'

interface IParams {
  productId?: string
}

const Product = ({ params: { productId } }: { params: IParams }) => {
  const product = products.find((id) => productId === id.id)

  return (
    <div className="p-8">
      <Container>
        <ProductDetails product={product} />
      </Container>
    </div>
  )
}

export default Product
