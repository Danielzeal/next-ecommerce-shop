"use client";

import { Dispatch, SetStateAction } from "react";

type Props = {
  count: number;
  setCount: Dispatch<SetStateAction<number>>;
};

const Quantity = ({ count, setCount }: Props) => {
  const handleQtyInc = () => {
    if (count >= 15) return;
    setCount((prev: number) => prev + 1);
  };

  const handleQtyDec = () => {
    if (count <= 1) return;
    setCount((prev: number) => prev - 1);
  };

  return (
    <div className='flex justify-between text-xl'>
      <h3 className='font-lora font-semibold'>Quantity</h3>
      <div className='flex gap-4 items-center justify-center'>
        <button
          onClick={handleQtyDec}
          className='cursor-pointer w-8 h-8 rounded-md  bg-red-300 hover:bg-red-400 text-white transition-colors duration-200 ease-in-out'
        >
          {"-"}
        </button>
        <span>{count}</span>
        <button
          onClick={handleQtyInc}
          className='cursor-pointer w-8 h-8 rounded-md border bg-green-300 hover:bg-green-400 text-white transition-colors duration-200 ease-in-out'
        >
          {"+"}
        </button>
      </div>
    </div>
  );
};

export default Quantity;
