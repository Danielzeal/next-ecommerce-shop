"use client";

import { useEffect, useState } from "react";
import Rating from "../Rating";
import Horizontal from "../Horizontal";
import Quantity from "../cart/Quantity";
import { useRouter } from "next/navigation";
import { useCartStore } from "@/store/store";
import Button from "../Button";

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
    router.push("/cart");
  };

  return (
    <>
      <div className='flex flex-col gap-3'>
        <h3 className='text-2xl text-green-400'>${product.price}</h3>
        <div className='flex flex-col gap-4'>
          <div className='flex gap-3 items-center text-xl'>
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
          <h3 className='text-xl capitalize'>{product.catName}</h3>
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
    </>
  );
};

export default Sizes;