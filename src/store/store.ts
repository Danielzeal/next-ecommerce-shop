import { create } from "zustand";
import { persist } from "zustand/middleware";

const INITIAL_STATE = {
  products: [],
  cartItems: 0,
  paymentIntent: null,
};

type Cart = {
  products: CartItem[];
  cartItems: number;
  paymentIntent: string | null;
};

type Actions = {
  addToCart: (item: CartItem) => void;
  removeFromCart: (item: CartItem) => void;
  incQtyInCart: (item: CartItem) => void;
  decQtyInCart: (item: CartItem) => void;
  clearCart: () => void;
  handleIntent: (val: string | null) => void;
};

export const useCartStore = create(
  persist<Cart & Actions>(
    (set, get) => ({
      ...INITIAL_STATE,
      addToCart: (item) => {
        const products = get().products;
        const product = products.find((product) => product.id === item.id);
        if (product) {
          const updatedProduct = products.map((p) =>
            p.id === product.id
              ? {
                  ...item,
                  quantity: item.quantity + product.quantity,
                }
              : p
          );

          set((state) => ({
            products: updatedProduct,
            cartItems: state.cartItems + item.quantity,
          }));
        } else {
          set((state) => ({
            products: [...state.products, item],
            cartItems: state.cartItems + item.quantity,
          }));
        }
      },
      removeFromCart: (item) => {
        set((state) => ({
          products: state.products.filter((product) => product.id !== item.id),
          cartItems: state.cartItems - item.quantity,
        }));
      },
      incQtyInCart: (item) => {
        const products = get().products;
        const product = products.find((product) => product.id === item.id);
        if (product) {
          if (product.quantity === 15) {
            return;
          }
          const updatedProduct = products.map((p) =>
            p.id === product.id
              ? {
                  ...product,
                  quantity: item.quantity + 1,
                }
              : p
          );

          set((state) => ({
            products: updatedProduct,
            cartItems: state.cartItems + 1,
          }));
        }
      },
      decQtyInCart: (item) => {
        const products = get().products;
        const product = products.find((product) => product.id === item.id);
        if (product) {
          if (product.quantity === 1) {
            return;
          }
          const updatedProduct = products.map((p) =>
            p.id === product.id
              ? {
                  ...product,
                  quantity: item.quantity - 1,
                }
              : p
          );

          set((state) => ({
            products: updatedProduct,
            cartItems: state.cartItems + -1,
          }));
        }
      },
      clearCart: () => {
        set((state) => ({
          products: [],
          cartItems: 0,
        }));
      },
      handleIntent: (val) => {
        set(() => ({
          paymentIntent: val,
        }));
      },
    }),
    { name: "cart", skipHydration: true }
  )
);
