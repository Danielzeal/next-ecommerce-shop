"use client";

import Container from "@/components/Container";
import Loading from "@/components/Loading";
import Pagination from "@/components/home/Pagination";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { FormEvent, useEffect, useState } from "react";

type Status = {
  id: string;
  deliveryStatus: string;
};

type Props = {
  searchParams: {
    page: string;
  };
};

const AllOrders = ({ searchParams }: Props) => {
  const { data, status } = useSession();
  const [deliveryStatus, setDeliveryStatus] = useState("");
  const router = useRouter();
  const pageNumber: number = Number(searchParams.page) || 1;

  useEffect(() => {
    if (status === "unauthenticated" || !data?.user.isAdmin) {
      router.push("/");
    }
  }, [data, router, status]);

  const { isLoading, data: ordersData } = useQuery({
    queryKey: ["orders"],
    queryFn: async () => {
      const res = await fetch(`/api/orders`);

      if (!res.ok) {
        throw new Error("Something went wrong");
      }

      return res.json();
    },
  });

  const { mutate } = useMutation({
    mutationFn: async (data: Status) => {
      await fetch("/api/orders", {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ ...data }),
      });
    },
    onSuccess: () => {
      alert("Order updated");
    },
  });

  if (isLoading) {
    return <Loading />;
  }

  const handleSubmit = (e: FormEvent<HTMLFormElement>, id: string) => {
    e.preventDefault();

    if (!deliveryStatus && deliveryStatus === "pending") return;

    mutate({ deliveryStatus, id });
  };

  return (
    <Container>
      <div className=' bg-white my-6 p-8 rounded-md shadow-md overflow-x-auto no-scrollbar'>
        <h1 className='text-center md:text-2xl text-lg font-lora font-bold mb-6'>
          Orders
        </h1>
        {ordersData.length ? (
          <>
            <table className='w-full table-fixed border-b-2 border-gray-200'>
              <thead>
                <tr className='text-center md:text-xl text-lora font-semibold'>
                  <td className='text-start w-[300px] lg:w-full'>ID</td>
                  <td className='w-[300px]'>DILIVERY STATUS</td>
                  <td className='w-[150px]'>DATE</td>
                  <td className='w-[150px]'>AMOUNT</td>
                  <td className='w-[200px]'></td>
                </tr>
              </thead>
              <tbody className=''>
                {ordersData.map((order: Orders) => (
                  <tr
                    key={order.id}
                    className='border-t-2 border-gray-300 text-center odd:bg-gray-200 even:bg-gray-100 capitalize'
                  >
                    <td className='text-start'>{order.id}</td>
                    <td>{order.deliveryStatus}</td>
                    <td>{order.createdAt.slice(0, 10)}</td>
                    <td>{order.amount}</td>
                    <td>
                      {order.deliveryStatus === "pending" ? (
                        <form
                          onSubmit={(e) => handleSubmit(e, order.id)}
                          className='flex gap-2 items-center justify-between'
                        >
                          <select
                            className='capitalize flex-1 p-2'
                            name='status'
                            id='status'
                            onChange={(e) => setDeliveryStatus(e.target.value)}
                          >
                            <option value=''>{order.deliveryStatus}</option>
                            <option value='delivered'>Delivered</option>
                          </select>
                          <button className='bg-green-500 text-white font-semibold p-2 rounded-md'>
                            Submit
                          </button>
                        </form>
                      ) : (
                        <>{order.deliveryStatus}</>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            <Pagination page={pageNumber} pageCount={ordersData.pageCount} />
          </>
        ) : (
          <h2 className='font-bold text-center text-xl w-full'>
            Product database is empty
          </h2>
        )}
      </div>
    </Container>
  );
};

export default AllOrders;
