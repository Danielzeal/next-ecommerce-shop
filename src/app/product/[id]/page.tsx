import Container from "@/components/Container";
import Sizes from "@/components/Sizes";
import { AllProducts } from "@/data";
import Image from "next/image";
import { Lora } from "next/font/google";
import Horizontal from "@/components/Horizontal";

const lora = Lora({
  subsets: ["latin"],
  weight: ["400", "500"],
  style: ["italic", "normal"],
});

const SingleProduct = ({ params }: { params: { id: string } }) => {
  const { id } = params;

  const product = AllProducts.find((pro) => pro.id === id);

  return (
    <Container>
      {product && (
        <div className='flex flex-col md:flex-row gap-16 w-full my-6'>
          <div className='w-full md:w-1/2'>
            <div className='relative w-full h-[550px] '>
              <Image
                src={product.img}
                alt={product.name}
                className='object-cover'
                fill
                sizes='100vw'
              />
            </div>
          </div>
          <div className='w-full md:w-1/2'>
            <h1 className={`${lora.className} font-semibold italic text-5xl`}>
              {product.name}
            </h1>
            <Horizontal />
            <Sizes product={product} />
            <div>
              <div>
                <h3 className='text-2xl italic mb-2'>Description</h3>
                <p className='text-justify text-lg'>{product.desc}</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </Container>
  );
};

export default SingleProduct;
