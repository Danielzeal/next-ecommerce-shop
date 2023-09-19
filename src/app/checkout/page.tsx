import CheckoutClient from "@/components/checkout/CheckoutClient";

const Checkout = () => {
  return (
    <div className='w-full flex min-h-[calc(100vh-160px)] items-center justify-center py-10'>
      <div className='w-full max-w-[700px] p-4 md:p-8 bg-white shadow-md flex flex-col gap-3 rounded-md'>
        <CheckoutClient />
      </div>
    </div>
  );
};

export default Checkout;
