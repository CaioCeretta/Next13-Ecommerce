import FormWrap from '../FormWrap'
import { Container } from '../components/Container'
import CheckoutClient from './CheckoutClient'

const Cart = () => {
  return (
    <div className="p-8">
      <Container>
        <FormWrap>
          <CheckoutClient />
        </FormWrap>
      </Container>
    </div>
  )
}

export default Cart
