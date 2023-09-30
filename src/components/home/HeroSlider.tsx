/* eslint-disable react-hooks/exhaustive-deps */
"use client";

import Slider from "./Slider";
import { useEffect, useState, Fragment } from "react";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";

type Products = {
  id: string;
  title: string;
  img: string;
  price: number;
  description: string;
};

type Props = {
  products: Products[];
};

const HeroSlider = ({ products }: Props) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const productLength = products?.length - 1;
  const autoScroll = true;
  let startScroll: number | NodeJS.Timeout | undefined;

  const handlePrev = () => {
    setCurrentSlide((prev) => (currentSlide === 0 ? productLength : prev - 1));
  };

  const handleNext = () => {
    setCurrentSlide((prev) => (currentSlide === productLength ? 0 : prev + 1));
  };

  useEffect(() => {
    if (products && autoScroll) {
      const scroll = () => {
        startScroll = setInterval(handleNext, 10000);
      };
      scroll();
    }

    return () => clearInterval(startScroll);
  }, [products, autoScroll, handleNext]);

  return (
    <>
      {products &&
        products.map((product: Products, idx: number) => (
          <Fragment key={product.id}>
            <Slider product={product} idx={idx} currentSlide={currentSlide} />
          </Fragment>
        ))}
      <div className='w-full absolute z-20 h-full flex justify-between items-center px-6'>
        <button
          onClick={handlePrev}
          className='bg-black md:h-[48px] md:w-[48px] w-8 h-8 md:text-2xl text-lg hover:opacity-100 rounded-full text-white flex items-center justify-center hover:bg-white hover:text-black transition-all duration-200 ease-in opacity-30'
        >
          <FaArrowLeft />
        </button>
        <button
          onClick={handleNext}
          className='bg-black md:h-[48px] md:w-[48px] w-8 h-8 md:text-2xl text-lg rounded-full opacity-30 hover:opacity-100 text-white flex items-center justify-center hover:bg-white hover:text-black transition-all duration-200 ease-in'
        >
          <FaArrowRight />
        </button>
      </div>
    </>
  );
};

export default HeroSlider;
