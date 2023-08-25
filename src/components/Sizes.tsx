"use client";

import { useEffect, useState } from "react";
import Rating from "./Rating";
import Horizontal from "./Horizontal";
import Quantity from "./Quantity";
import { useRouter } from "next/navigation";
import { useCartStore } from "@/store/store";

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
      name: product.name,
    });
    router.push("/cart");
  };

  return (
    <>
      <div className='flex flex-col gap-3'>
        <h3 className='text-2xl italic'>
          Price:{" "}
          <span className='text-xl text-green-400'>${product.price}</span>
        </h3>
        <div>
          <div className='flex gap-3 items-center'>
            <h3 className='text-2xl italic'>Size:</h3>
            {product.sizes?.map((size, index) => (
              <button
                key={size}
                className={`bg-white rounded-full h-8 w-8 gap-2 text-lg uppercase font-semibold ${
                  selected === index ? "border border-red-300 text-red-200" : ""
                }`}
                onClick={() => handleChange(index)}
              >
                {size}
              </button>
            ))}
          </div>
          <h3 className='text-2xl italic'>Category: {product.category}</h3>
          <div className='flex items-center gap-2'>
            <h3 className='text-2xl italic'>Rating:</h3>
            <Rating value={product.rating} />{" "}
            <span className='text-lg'>({product.numReviews}) Reviews</span>
          </div>
        </div>
      </div>
      <Horizontal />
      <div className='flex flex-col gap-3'>
        <Quantity count={count} setCount={setCount} />
        <button
          className='uppercase font-semibold bg-black text-white py-4 rounded-lg w-full'
          onClick={handleSubmit}
        >
          add to cart
        </button>
      </div>
      <Horizontal />
    </>
  );
};

export default Sizes;
