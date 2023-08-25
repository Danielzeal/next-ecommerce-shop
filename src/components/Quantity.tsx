"use client";

import { Dispatch, SetStateAction } from "react";

type Props = {
  count: number;
  setCount: Dispatch<SetStateAction<number>>;
};

const Quantity = ({ count, setCount }: Props) => {
  const handleQtyInc = () => {
    if (count >= 9) return;
    setCount((prev: number) => prev + 1);
  };

  const handleQtyDec = () => {
    if (count <= 1) return;
    setCount((prev: number) => prev - 1);
  };

  return (
    <div className='flex justify-between text-2xl'>
      <h3 className='italic'>Quantity:</h3>
      <div className='flex gap-4 items-center justify-center'>
        <button
          onClick={handleQtyDec}
          className='cursor-pointer py-1 px-3 border border-red-200 hover:bg-red-200 transition hover:border-0 hover:text-white'
        >
          {"<"}
        </button>
        <span>{count}</span>
        <button
          onClick={handleQtyInc}
          className='cursor-pointer py-1 px-3 border border-green-200 hover:border-0 hover:bg-green-200 hover:text-white'
        >
          {">"}
        </button>
      </div>
    </div>
  );
};

export default Quantity;
