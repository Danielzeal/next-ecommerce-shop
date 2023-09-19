import { headers } from "next/headers";
import Container from "@/components/Container";

const getOrders = async () => {
  const res = await fetch("http://localhost:3000/api/orders", {
    method: "GET",
    cache: "no-store",
    headers: headers(),
  });

  return res.json();
};

const OrdersPage = async () => {
  const orders: Orders[] = await getOrders();

  return (
    <Container>
      <div className=' bg-white my-6 p-8 rounded-md shadow-md overflow-hidden'>
        <h1 className='text-center text-2xl font-bold mb-6'>Orders</h1>
        {orders && orders.length > 0 ? (
          <table className='w-full table-fixed border-b-2 border-gray-200'>
            <thead>
              <tr className='text-lg font-semibold'>
                <td className='text-start w-[300px] lg:w-full'>ID</td>
                <td className='w-[150px]'>STATUS</td>
                <td className='w-[250px]'>DELIVIRY STATUS</td>
                <td className='w-[150px]'>AMOUNT</td>
              </tr>
            </thead>
            <tbody>
              {orders.map((order) => (
                <tr key={order.id} className='border-2 border-gray-200'>
                  <td className='py-3 px-2'>{order.id}</td>
                  <td>{order.status}</td>
                  <td>{order.deliveryStatus}</td>
                  <td>{order.amount}</td>
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
