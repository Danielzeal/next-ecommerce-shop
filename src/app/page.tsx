import Container from "@/components/Container";
import Products from "@/components/Products";

export default function Home() {
  return (
    <div className='min-h-[calc(100vh-160px)]'>
      <Container>
        <Products />
      </Container>
    </div>
  );
}
