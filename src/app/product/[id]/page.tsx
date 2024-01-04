import Container from "@/components/Container";
import Sizes from "@/components/product/Sizes";
import Image from "next/image";
import Horizontal from "@/components/Horizontal";
import Review from "@/components/product/Review";
import getProduct from "@/actions/getProduct";

const SingleProduct = async ({ params }: { params: { id: string } }) => {
  const { id } = params;
  const product = await getProduct(id);

  return (
    <Container>
      {product && (
        <>
          <div className='flex flex-col md:flex-row gap-12 w-full my-6 bg-white sm:p-8 p-4 rounded-md'>
            <div className='w-full md:w-1/2 lg:w-1/3'>
              <div className='relative w-full md:h-[550px] sm:h-[400px] h-[300px] '>
                {product.img && (
                  <Image
                    src={product.img}
                    alt={product.title}
                    className='object-cover'
                    fill
                    sizes='100vw'
                  />
                )}
              </div>
            </div>
            <div className='w-full md:w-1/2 lg:w-2/3'>
              <div className='flex lg:gap-12 gap-6 flex-col lg:flex-row'>
                <div className='lg:w-1/2'>
                  <h1
                    className={`font-semibold md:text-4xl text-3xl uppercase font-lora`}
                  >
                    {product.title}
                  </h1>
                  <Horizontal />
                  <Sizes product={product} />
                </div>
                <div className='lg:w-1/2'>
                  <p className='md:text-xl mb-3 text-lg font-lora'>
                    Description
                  </p>
                  <p className='text-justify md:text-base text-sm'>
                    {product.description}
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div className='flex flex-col md:flex-row gap-12 w-full mb-6 bg-white sm:p-8 p-4 rounded-md'>
            <Review id={product.id} />
          </div>
        </>
      )}
    </Container>
  );
};

export default SingleProduct;
