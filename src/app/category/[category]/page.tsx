import Container from "@/components/Container";
import Products from "@/components/Products";
import { FC } from "react";

type Props = {
  searchParams: {
    [key: string]: string | string[] | undefined;
  };
};

const ProductsPage: FC<Props> = ({ searchParams }) => {
  const category =
    typeof searchParams.category === "string"
      ? searchParams.category
      : undefined;
  const page =
    typeof searchParams.page === "string" ? Number(searchParams.page) : 1;

  return (
    <Container>
      <Products page={page} category={category} />
    </Container>
  );
};

export default ProductsPage;
