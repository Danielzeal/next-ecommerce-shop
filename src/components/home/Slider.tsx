"use client";

import Image from "next/image";
import Link from "next/link";

type Props = {
  product: {
    id: string;
    title: string;
    img: string;
    price: number;
    description: string;
  };
  idx: number;
  currentSlide: number;
};

const Slider = ({ product, idx, currentSlide }: Props) => {
  return (
    <div className={`w-full h-full absolute top-0 left-0`}>
      <div
        className={`w-full h-full relative transition-all duration-150 ease-in ${
          currentSlide === idx
            ? "opacity-100 translate-x-0 z-10"
            : "opacity-0 -translate-x-[50%]"
        }`}
      >
        <Image
          fill
          src={product.img}
          alt={product.title}
          className='font-semibold object-cover filter grayscale brightness-50'
        />
        <div className='absolute top-0 left-0 w-full h-full flex items-center justify-center flex-col text-white'>
          <Link
            href={`/product/${product.id}`}
            className='flex flex-col gap-4 md:max-w-xl w-full mx-auto items-center p-4 md:rounded-md md:shadow-md text-center bg-opacity-black cursor-pointer'
          >
            <h1 className='md:text-2xl text-xl uppercase font-semibold font-lora'>
              {product.title}
            </h1>
            <p className='text-sm md:text-base'>{product.description}</p>

            <h2 className='text-green-500 font-lora text-xl italic'>
              $ {product.price}
            </h2>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Slider;
