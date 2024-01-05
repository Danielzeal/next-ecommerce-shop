import Pagination from "@/components/Pagination";
import { Order } from "@prisma/client";
import { FC } from "react";

type Props = {
  page: number;
  pageCount?: number;
  orders?: Order[];
};

const Orders: FC<Props> = ({ orders, page, pageCount }) => {
  return (
    <>
      {orders && orders.length > 0 ? (
        <>
          <table className='w-full table-fixed border-b-2 border-gray-200 mb-3'>
            <thead>
              <tr className='md:text-lg font-semibold text-center font-lora'>
                <td className='text-start w-[300px] lg:w-full'>ID</td>
                <td className='w-[250px]'>DELIVIRY STATUS</td>
                <td className='w-[250px]'>AMOUNT</td>
                <td className='w-[250px]'>DATE</td>
              </tr>
            </thead>
            <tbody>
              {orders.map((order) => (
                <tr
                  key={order.id}
                  className='border-y-2 border-gray-200 odd:bg-gray-200 even:bg-gray-100 text-center capitalize'
                >
                  <td className='text-start py-3'>{order.id}</td>
                  <td>{order.deliveryStatus}</td>
                  <td>{order.amount}</td>
                  <td>{order.createdAt.toString().slice(0, 10)}</td>
                </tr>
              ))}
            </tbody>
          </table>
          {pageCount && <Pagination page={page} pageCount={pageCount} />}
        </>
      ) : (
        <div>No orders to show</div>
      )}
    </>
  );
};

export default Orders;
