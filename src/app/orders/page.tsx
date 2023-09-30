"use client";

import Container from "@/components/Container";
import { useQuery } from "@tanstack/react-query";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

const OrdersPage = () => {
  const { status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/");
    }
  }, [router, status]);

  const { isLoading, data: orders } = useQuery({
    queryKey: ["orders"],
    queryFn: async () => {
      const res = await fetch(`/api/orders`);

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
        {orders && orders.length > 0 ? (
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
              {orders.map((order: Orders) => (
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
        ) : (
          <div>No orders to show</div>
        )}
      </div>
    </Container>
  );
};

export default OrdersPage;
