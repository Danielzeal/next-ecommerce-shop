"use client";

import Container from "@/components/Container";
import Pagination from "@/components/home/Pagination";
import { useQuery } from "@tanstack/react-query";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

type Props = {
  searchParams: {
    page: string;
  };
};

const OrdersPage = ({ searchParams }: Props) => {
  const { status } = useSession();
  const router = useRouter();
  const pageNumber: number = Number(searchParams.page) || 1;

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/");
    }
  }, [router, status]);

  const { data } = useQuery({
    queryKey: ["orders"],
    queryFn: async () => {
      const res = await fetch(`/api/orders?page=${pageNumber}`);

      if (!res.ok) {
        throw new Error("Something went wrong");
      }

      return res.json();
    },
  });

  return (
    <Container>
      <div className=' bg-white my-6 p-8 rounded-md shadow-md overflow-x-scroll no-scrollbar'>
        <h1 className='text-center md:text-2xl font-bold mb-6 font-lora text-lg'>
          Orders
        </h1>
        {data.orders && data.orders.length > 0 ? (
          <>
            <table className='w-full table-fixed border-b-2 border-gray-200'>
              <thead>
                <tr className='md:text-lg font-semibold text-center font-lora'>
                  <td className='text-start w-[300px] lg:w-full'>ID</td>
                  <td className='w-[250px]'>DELIVIRY STATUS</td>
                  <td className='w-[250px]'>AMOUNT</td>
                  <td className='w-[250px]'>DATE</td>
                </tr>
              </thead>
              <tbody>
                {data.orders.map((order: Orders) => (
                  <tr
                    key={order.id}
                    className='border-y-2 border-gray-200 odd:bg-gray-200 even:bg-gray-100 text-center'
                  >
                    <td className='text-start py-3'>{order.id}</td>
                    <td>{order.deliveryStatus}</td>
                    <td>{order.amount}</td>
                    <td>{order.createdAt.slice(0, 10)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
            <Pagination page={pageNumber} pageCount={data.pageCount} />
          </>
        ) : (
          <div>No orders to show</div>
        )}
      </div>
    </Container>
  );
};

export default OrdersPage;
