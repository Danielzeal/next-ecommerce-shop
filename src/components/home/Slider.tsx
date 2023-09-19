"use client";

import Image from "next/image";
import Button from "../Button";
import { useRouter } from "next/navigation";

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
  const router = useRouter();
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
        <div className='absolute top-0 left-0 w-full h-full flex items-center justify-center flex-col text-white text-xl'>
          <div className='flex flex-col gap-6 max-w-xl mx-auto items-center p-4 rounded-md shadow-md text-center'>
            <h1 className='text-3xl uppercase font-semibold'>
              {product.title}
            </h1>
            <p>{product.description}</p>
            <div className='flex gap-6 items-center justify-center'>
              <h2 className='text-green-500 italic'>$ {product.price}</h2>
              <Button
                text='buy now'
                heroBtn={true}
                className=''
                onClick={() => router.push(`/product/${product.id}`)}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Slider;
