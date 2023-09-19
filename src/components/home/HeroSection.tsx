import { getSliderProducts } from "@/services";
import HeroSlider from "./HeroSlider";

type Products = {
  id: string;
  title: string;
  img: string;
  price: number;
  description: string;
}[];

const HeroSection = async () => {
  const products: Products = await getSliderProducts();

  return (
    <div className='h-[calc(100vh-160px)] w-full overflow-hidden relative'>
      <HeroSlider products={products} />
    </div>
  );
};

export default HeroSection;
