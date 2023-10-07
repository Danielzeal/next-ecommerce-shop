"use client";

import { useCartStore } from "@/store/store";
import { useEffect, useState } from "react";
import Container from "@/components/Container";
import Image from "next/image";
import { FaTrash } from "react-icons/fa";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Button from "@/components/Button";
import { toast } from "react-toastify";

const CartPage = () => {
  const [total, setTotal] = useState(0);
  const router = useRouter();

  const { products, incQtyInCart, decQtyInCart, removeFromCart, clearCart } =
    useCartStore();

  useEffect(() => {
    useCartStore.persist.rehydrate();
  }, []);

  useEffect(() => {
    const getTotal = () => {
      if (products) {
        const total = products.reduce((acc, curr) => {
          const item = curr.quantity * curr.price;
          acc += item;
          return acc;
        }, 0);
        setTotal(total);
      }
    };

    getTotal();
  }, [products]);

  const handleCheckOut = () => {
    router.push("/checkout");
  };

  return (
    <Container>
      <div className=' bg-white my-6 p-8 rounded-md shadow-md overflow-x-scroll no-scrollbar'>
        <h1 className='text-center md:text-2xl text-lg font-bold mb-6 font-lora'>
          Collected Items
        </h1>
        {products.length ? (
          <>
            <table className='w-full table-fixed border-b-2 border-gray-200'>
              <thead>
                <tr className='text-center md:text-xl font-semibold font-lora'>
                  <td className='text-start w-[300px] xl:w-full'>Product</td>
                  <td className='w-[150px]'>Size</td>
                  <td className='w-[150px]'>Price</td>
                  <td className='w-[200px]'>Quantity</td>
                  <td className='w-[150px]'>Total</td>
                  <td className='w-[150px]'></td>
                </tr>
              </thead>
              <tbody className=''>
                {products.map((product) => (
                  <tr
                    key={product.id}
                    className='border-t-2 border-gray-300 text-center'
                  >
                    <td>
                      <Link
                        href={`/product/${product.productId}`}
                        className='flex items-center gap-3 text-start cursor-pointer'
                      >
                        <div className='w-24 h-24 relative'>
                          <Image
                            src={product.img}
                            alt={"testing"}
                            fill
                            sizes='100%'
                            className='object-contain'
                          />
                        </div>
                        <p className='font-semibold text-lg'>{product.name}</p>
                      </Link>
                    </td>
                    <td className='uppercase font-semibold text-lg'>
                      {product.size}
                    </td>
                    <td>{product.price}</td>
                    <td>
                      <div className='flex gap-4 items-center justify-between'>
                        <button
                          className='cursor-pointer py-1 px-3 border border-red-200 hover:bg-red-200 transition hover:border-0 hover:text-white'
                          onClick={() => decQtyInCart({ ...product })}
                        >
                          {"<"}
                        </button>
                        <span>{product.quantity}</span>
                        <button
                          onClick={() => incQtyInCart({ ...product })}
                          className='cursor-pointer py-1 px-3 border border-green-200 hover:border-0 hover:bg-green-200 hover:text-white'
                        >
                          {">"}
                        </button>
                      </div>
                    </td>
                    <td>$ {(product.quantity * product.price).toFixed(2)}</td>
                    <td>
                      <button
                        onClick={() => {
                          removeFromCart({ ...product });
                          toast.info("Product removed from cart!");
                        }}
                      >
                        <FaTrash className='text-red-500' />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            <button
              className='bg-red-500 text-white py-2 px-6 rounded-md my-8 hover:bg-red-300 hover:text-gray-200 transition-colors ease-in duration-200'
              onClick={() => clearCart()}
            >
              Clear
            </button>
            <div className='flex w-[200px] flex-col py-2 border-t-2 border-gray-200 gap-3'>
              <div className='flex justify-between items-center font-bold font-lora'>
                <p>Total</p>
                <p>$ {total.toFixed(2)}</p>
              </div>
              <Button onClick={handleCheckOut} text='pay' className='w-full' />
            </div>
          </>
        ) : (
          <h2 className='font-bold text-center capitalize md:text-xl text-lg'>
            Shopping cart is Empty...
          </h2>
        )}
      </div>
    </Container>
  );
};

export default CartPage;
