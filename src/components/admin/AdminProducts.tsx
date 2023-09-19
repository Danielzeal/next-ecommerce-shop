"use client";

import Image from "next/image";
import { FaEdit, FaTrash } from "react-icons/fa";
import Link from "next/link";
import { useMutation, useQueryClient } from "@tanstack/react-query";

type Props = {
  products: Products;
};

const AdminProducts = ({ products }: Props) => {
  const queryClient = useQueryClient();

  const { mutate } = useMutation({
    mutationFn: async ({ id }: { id: string }) => {
      await fetch(`/api/products/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      });
    },
    onSuccess: () => {
      alert("product deleted");
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["products"] });
    },
  });

  const handleDelete = (id: string) => {
    mutate({ id });
  };

  return products.length ? (
    <>
      <table className='w-full table-fixed border-b-2 border-gray-200'>
        <thead>
          <tr className='text-center text-xl font-semibold'>
            <td className='text-start w-[300px] xl:w-full'>Product</td>
            <td className='w-[150px]'>Price</td>
            <td className='w-[300px]'>Category</td>
            <td className='w-[150px]'>Date</td>
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
                  href={`/product/${product.id}`}
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
                  <p className='font-semibold text-lg capitalize'>
                    {product.title}
                  </p>
                </Link>
              </td>
              <td>{product.price}</td>
              <td className='capitalize'>{product.catName}</td>
              <td>{product.createdAt.slice(0, 10)}</td>
              <td>
                <button onClick={() => handleDelete(product.id)}>
                  <FaTrash className='text-red-500 text-2xl' />
                </button>
                <button className='ml-4'>
                  <Link href={`/admin/product/edit/${product.id}`}>
                    <FaEdit className='text-green-500 text-2xl' />
                  </Link>
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  ) : (
    <h2 className='font-bold text-center text-xl w-full'>
      Product database is empty
    </h2>
  );
};

export default AdminProducts;
