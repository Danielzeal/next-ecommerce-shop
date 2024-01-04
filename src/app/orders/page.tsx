import getOrders from "@/actions/getOrder";
import Container from "@/components/Container";
import { FC } from "react";
import Orders from "./_component/Orders";

type Props = {
  searchParams: {
    [keys: string]: string | string[] | undefined;
  };
};

const OrdersPage: FC<Props> = async ({ searchParams }: Props) => {
  const page =
    typeof searchParams.page === "string" ? Number(searchParams.page) : 1;

  const data = await getOrders(page);

  return (
    <Container>
      <div className=' bg-white my-6 p-8 rounded-md shadow-md overflow-x-scroll no-scrollbar'>
        <h1 className='text-center md:text-2xl font-bold mb-6 font-lora text-lg'>
          Orders
        </h1>
        <Orders page={page} pageCount={data?.pageCount} orders={data?.orders} />
      </div>
    </Container>
  );
};

export default OrdersPage;
