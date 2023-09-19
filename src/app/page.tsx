import Container from "@/components/Container";
import Products from "@/components/home/Products";
import HeroSection from "@/components/home/HeroSection";

type Props = {
  searchParams: {
    page: string;
  };
};

export default function Home({ searchParams }: Props) {
  const pageNumber: number = Number(searchParams.page) || 1;

  return (
    <div className='min-h-[calc(100vh-160px)] mb-6'>
      <HeroSection />
      <Container>
        <Products pageNumber={pageNumber} />
      </Container>
    </div>
  );
}
