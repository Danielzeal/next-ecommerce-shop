import Container from "@/components/Container";
import Products from "@/components/home/Products";
import { FC } from "react";

type Props = {
  searchParams: {
    [key: string]: string | string[] | undefined;
  };
  params: {
    category: string;
  };
};

const ProductsPage: FC<Props> = ({ searchParams, params }) => {
  const pageNumber: number = Number(searchParams.page) || 1;
  const { category } = params;

  return (
    <Container>
      <Products pageNumber={pageNumber} category={category} />
    </Container>
  );
};

export default ProductsPage;
