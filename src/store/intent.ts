import { create } from "zustand";
import { persist } from "zustand/middleware";

const paymentIntent = null;

type Cart = {
  paymentIntent: string | null;
  handleIntent: (val: string | null) => void;
};

export const useIntentStore = create(
  persist<Cart>(
    (set, get) => ({
      paymentIntent,
      handleIntent: (val) => {
        set(() => ({
          paymentIntent: val,
        }));
      },
    }),
    { name: "intent", skipHydration: true }
  )
);
