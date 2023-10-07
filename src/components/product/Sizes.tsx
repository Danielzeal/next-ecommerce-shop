"use client";

import { useEffect, useState } from "react";
import Rating from "../Rating";
import Horizontal from "../Horizontal";
import Quantity from "../cart/Quantity";
import { useRouter } from "next/navigation";
import { useCartStore } from "@/store/store";
import Button from "../Button";
import { toast } from "react-toastify";
import Link from "next/link";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";

type Props = {
  product: Product;
};

const Sizes = ({ product }: Props) => {
  const [selected, setSelected] = useState(0);
  const [count, setCount] = useState(1);

  const { addToCart } = useCartStore();

  useEffect(() => {
    useCartStore.persist.rehydrate();
  }, []);

  const router = useRouter();

  const handleChange = (index: number) => {
    setSelected(index);
  };

  const handleSubmit = () => {
    addToCart({
      id: `${product.id}${product.sizes[selected]}`,
      size: product.sizes[selected],
      img: product.img,
      quantity: count,
      price: product.price,
      name: product.title,
      productId: product.id,
    });
    toast.success("Product added to cart!");
  };

  return (
    <>
      <div className='flex flex-col gap-3'>
        <h3 className='md:text-2xl text-lg text-green-400 font-lora'>
          ${product.price}
        </h3>
        <div className='flex flex-col gap-4'>
          <div className='flex gap-3 items-center md:text-xl font-semibold'>
            {product.sizes?.map((size, index) => (
              <button
                key={size}
                className={`bg-white rounded-md h-8 w-8 text-base uppercase font-semibold transition-all duration-200 ease-in-out ${
                  selected === index
                    ? "border border-green-400 text-green-300"
                    : "text-red-400"
                }`}
                onClick={() => handleChange(index)}
              >
                {size}
              </button>
            ))}
          </div>
          <h3 className='md:text-xl font-semibold capitalize font-lora'>
            {product.catName}
          </h3>
          <div className='flex flex-col gap-2'>
            <Rating value={product.rating} />{" "}
            {product.numReview >= 1 && (
              <p>
                {product.numReview}{" "}
                {product.numReview > 1 ? "Reviews" : "Review"}
              </p>
            )}
          </div>
        </div>
      </div>
      <Horizontal />
      <div className='flex flex-col gap-3'>
        <Quantity count={count} setCount={setCount} />
        <Button onClick={handleSubmit} text='add to cart' className='w-full' />
      </div>
      <Horizontal />
      <div className='flex justify-between items-center'>
        <Link
          href={"/"}
          className='p-2 rounded-md hover:bg-slate-400 transition-colors duration-200 ease-in'
        >
          <FaArrowLeft /> Continue Shopping
        </Link>
        <Link
          href={"/cart"}
          className='p-2 rounded-md hover:bg-slate-400 transition-colors duration-200 ease-in'
        >
          Visit Cart <FaArrowRight />
        </Link>
      </div>
    </>
  );
};

export default Sizes;
