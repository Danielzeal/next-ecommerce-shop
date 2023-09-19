"use client";

import { useIntentStore } from "@/store/intent";
import { useCartStore } from "@/store/store";
import {
  AddressElement,
  PaymentElement,
  useElements,
  useStripe,
} from "@stripe/react-stripe-js";
import { FormEvent, useEffect, useState } from "react";

type Props = {
  client: string;
  handleSuccess: (value: boolean) => void;
};

const CheckoutForm = ({ client, handleSuccess }: Props) => {
  const { clearCart } = useCartStore();
  const { handleIntent } = useIntentStore();
  const stripe = useStripe();
  const elements = useElements();

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    useCartStore.persist.rehydrate();
    useIntentStore.persist.rehydrate();
  }, []);

  useEffect(() => {
    if (!stripe) {
      return;
    }

    if (!client) {
      return;
    }
    handleSuccess(false);
  }, [stripe, client, handleSuccess]);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    if (!stripe || !elements) {
      return;
    }
    try {
      setLoading(true);

      const { error } = await stripe?.confirmPayment({
        elements,
        redirect: "if_required",
      });

      if (!error) {
        clearCart();
        handleIntent(null);
      }
      handleSuccess(true);
      setLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <form onSubmit={handleSubmit} id='payment-form'>
      <div>
        <h2 className='font-semibold mt-4 mb-2'>Address Information</h2>
        <AddressElement
          id=''
          options={{
            mode: "shipping",
            allowedCountries: ["US", "NG", "KE", "GH", "EN"],
          }}
        />
        <h2 className='font-semibold mt-4 mb-2'>Payment Information</h2>
        <PaymentElement id='payment-element' options={{ layout: "tabs" }} />
      </div>
      <button
        className={`py-2 w-full ${
          loading
            ? "bg-gray-400 text-gray-50"
            : "bg-black text-white hover:bg-gray-400 hover:text-gray-50"
        } transition-colors ease-in duration-200 font-semibold rounded-md shadow-md`}
        disabled={loading}
      >
        {loading ? "Processing..." : "Pay"}
      </button>
    </form>
  );
};

export default CheckoutForm;
