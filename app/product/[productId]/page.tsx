interface IParams {
  productId?: string
}

const Product = ({ params: {productId} }: { params: IParams}) => {
  console.log(productId)

  return (
    <div>
      This is the product page
    </div>
  );
}

export default Product;