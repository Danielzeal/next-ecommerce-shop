/* eslint-disable react-hooks/exhaustive-deps */
"use client";

import { useCartStore } from "@/store/store";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Elements } from "@stripe/react-stripe-js";
import { StripeElementsOptions, loadStripe } from "@stripe/stripe-js";
import CheckoutForm from "./CheckoutForm";
import Button from "../Button";

const stripePromise = loadStripe(
  process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!
);

const CheckoutClient = () => {
  const { products, paymentIntent, handleIntent } = useCartStore();
  const [loading, setLoading] = useState(false);
  const [clientSecret, setClientSecret] = useState("");
  const [paySuccess, setPaySuccess] = useState(false);

  const router = useRouter();

  // useEffect(() => {
  //   useCartStore.persist.rehydrate();
  // }, []);

  useEffect(() => {
    const getPaymentIntent = async () => {
      setLoading(true);
      try {
        const res = await fetch("/api/create-payment-intent", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            items: products,
            payment_intent_id: paymentIntent,
          }),
        });

        setLoading(false);
        if (res.status === 401) {
          router.push("/login");
        }
        const data = await res.json();
        setClientSecret(data.paymentIntent.client_secret);
        handleIntent(data.paymentIntent.id);
      } catch (error) {
        console.log(error);
      }
    };

    if (products) {
      getPaymentIntent();
    }
  }, [products, paymentIntent, router]);

  const options: StripeElementsOptions = {
    clientSecret,
    appearance: {
      theme: "stripe",
      labels: "floating",
    },
  };

  const handleSuccess = (value: boolean) => {
    setPaySuccess(value);
  };

  return (
    <div className='w-full h-full'>
      {loading && <div className='text-center font-bold'>Loading...</div>}
      {clientSecret && products && (
        <Elements options={options} stripe={stripePromise}>
          <CheckoutForm client={clientSecret} handleSuccess={handleSuccess} />
        </Elements>
      )}
      {paySuccess && (
        <div className='text-center text-teal-500 flex flex-col items-center justify-center'>
          <h3>Payment Success</h3>
          <div className='w-full max-w-[150px]'>
            <Button
              text='View your orders'
              onClick={() => router.push("/orders")}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default CheckoutClient;
