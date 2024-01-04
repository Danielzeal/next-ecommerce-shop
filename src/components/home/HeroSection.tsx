import getSliderProducts from "@/actions/getSliderProducts";
import HeroSlider from "./HeroSlider";

const HeroSection = async () => {
  const products = await getSliderProducts();

  return (
    <div className='h-[calc(100vh-160px)] w-full overflow-hidden relative'>
      {products && <HeroSlider products={products} />}
    </div>
  );
};

export default HeroSection;
