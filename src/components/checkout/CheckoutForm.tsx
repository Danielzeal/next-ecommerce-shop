"use client";

import { useCartStore } from "@/store/store";
import {
  AddressElement,
  PaymentElement,
  useElements,
  useStripe,
} from "@stripe/react-stripe-js";
import {
  Dispatch,
  FormEvent,
  SetStateAction,
  useEffect,
  useState,
} from "react";
import { toast } from "react-toastify";

type Props = {
  client: string;
  handleSuccess: (value: boolean) => void;
};

const CheckoutForm = ({ client, handleSuccess }: Props) => {
  const { clearCart, handleIntent } = useCartStore();
  const stripe = useStripe();
  const elements = useElements();

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!stripe) {
      return;
    }

    if (!client) {
      return;
    }
    handleSuccess(false);
  }, [stripe, client, handleSuccess]);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    setLoading(true);

    const { error } = await stripe?.confirmPayment({
      elements,
      redirect: "if_required",
    });

    if (!error) {
      setLoading(false);
      clearCart();
      handleIntent(null);
      handleSuccess(true);
      toast.success("Payment successful");
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
            allowedCountries: ["US", "NG", "KE", "GH"],
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
