import Container from "@/components/Container";
import Products from "@/components/home/Products";
import HeroSection from "@/components/home/HeroSection";
import { FC } from "react";

type Props = {
  searchParams: {
    [keys: string]: string | string[] | undefined;
  };
};

const Home: FC<Props> = ({ searchParams }) => {
  const category =
    typeof searchParams.category === "string"
      ? searchParams.category
      : undefined;
  const page =
    typeof searchParams.page === "string" ? Number(searchParams.page) : 1;

  return (
    <div className='min-h-[calc(100vh-160px)] mb-6 overflow-hidden'>
      <HeroSection />
      <Container>
        <Products page={page} category={category} />
      </Container>
    </div>
  );
};

export default Home;
