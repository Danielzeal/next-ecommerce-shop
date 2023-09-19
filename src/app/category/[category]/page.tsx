import Container from "@/components/Container";
import Products from "@/components/home/Products";

type Props = {
  searchParams: {
    page: string;
  };
  params: {
    category: string;
  };
};

const ProductsPage = ({ searchParams, params }: Props) => {
  const pageNumber: number = Number(searchParams.page) || 1;
  const { category } = params;

  return (
    <Container>
      <Products pageNumber={pageNumber} category={category} />
    </Container>
  );
};

export default ProductsPage;
