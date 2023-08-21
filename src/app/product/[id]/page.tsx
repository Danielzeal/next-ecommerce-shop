import { AllProducts } from "@/data";

const SingleProduct = ({ params }: { params: { id: string } }) => {
  const { id } = params;

  const product = AllProducts.find((pro) => pro.id === id);
  

  return <div>{id}</div>;
};

export default SingleProduct;
