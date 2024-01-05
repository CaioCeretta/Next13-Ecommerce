import FormWrap from '@/app/FormWrap'
import { Container } from '@/app/components/Container'
import AddProductForm from './AddProductForm'
import getCurrentUser from '@/app/actions/getCurrentUser'
import NullData from '@/app/NullData'

const AddProducts = async () => {
  const currentUser = await getCurrentUser()

  if (!currentUser || currentUser.role !== 'ADMIN') {
    return <NullData title="Oops, access denied" />
  }
  return (
    <div className="p-8">
      <Container>
        <FormWrap>
          <AddProductForm />
        </FormWrap>
      </Container>
    </div>
  )
}

export default AddProducts
