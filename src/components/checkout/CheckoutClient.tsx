"use client";

import { useIntentStore } from "@/store/intent";
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
  const { products } = useCartStore();
  const { paymentIntent, handleIntent } = useIntentStore();

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [clientSecret, setClientSecret] = useState("");
  const [paySuccess, setPaySuccess] = useState(false);

  const router = useRouter();

  useEffect(() => {
    useCartStore.persist.rehydrate();
    useIntentStore.persist.rehydrate();
  }, []);

  useEffect(() => {
    if (clientSecret) return;
  }, [clientSecret]);

  useEffect(() => {
    const getPaymentIntent = async () => {
      if (products) {
        setError(false);
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

          if (res.status === 401) {
            setLoading(false);
            router.push("/login");
            setError(true);
          } else {
            setLoading(false);
            const data = await res.json();
            setClientSecret(data.paymentIntent.client_secret);
            handleIntent(data.paymentIntent.id);
          }
        } catch (error) {
          console.log(error);
          console.log("something went wrong");
        }
      }
    };

    getPaymentIntent();
  }, [products, paymentIntent, router, handleIntent]);

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
    <div className='w-full'>
      {clientSecret && (
        <Elements options={options} stripe={stripePromise}>
          <CheckoutForm client={clientSecret} handleSuccess={handleSuccess} />
        </Elements>
      )}
      {loading && <div className='text-center text-lg'>Loading...</div>}
      {error && (
        <div className='text-center text-red-500'>Error occured! Try agian</div>
      )}
      {paySuccess && (
        <div className='text-center text-teal-500 flex flex-col items-center justify-center'>
          <h3>Payment Success</h3>
          <div className='w-full max-w-[150px]'>
            <Button
              text='View your orders'
              onClick={() => router.push("/orders")}
              className=''
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default CheckoutClient;
