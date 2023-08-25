"use client";

import { useEffect, useState } from "react";
import { FaRegUserCircle } from "react-icons/fa";
import { HiOutlineShoppingCart } from "react-icons/hi";
import Links from "./Links";
import { signOut, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useCartStore } from "@/store/store";
import Link from "next/link";

const ToggleMenu = () => {
  const [toggle, setToggle] = useState(false);
  const { status } = useSession();
  const router = useRouter();

  const { cartItems } = useCartStore();

  useEffect(() => {
    useCartStore.persist.rehydrate();
  }, []);

  const handleMenu = () => {
    setToggle((prev) => !prev);
  };

  const handleLogout = () => {
    handleMenu();
    signOut();
    router.push("/");
  };

  return (
    <>
      <div className='flex gap-4'>
        <Link href='/cart' className='relative flex items-center'>
          <HiOutlineShoppingCart size={28} />
          <span className='w-6 h-6 rounded-full bg-black text-white border-2 border-white absolute -top-1 -left-1 flex items-center justify-center text-sm'>
            {cartItems}
          </span>
        </Link>
        <div
          className='flex items-center gap-2 border-2 rounded-full p-2 cursor-pointer'
          onClick={handleMenu}
        >
          <FaRegUserCircle size={32} />
        </div>
      </div>
      {toggle && (
        <nav className='absolute z-40 w-[200px] py-2 bg-white top-[100px] right-4 shadow-2xl text-black flex flex-col rounded-md'>
          {status === "authenticated" ? (
            <>
              <Links href='/' onClick={handleMenu}>
                My Order
              </Links>
              <Links href='/' onClick={handleLogout}>
                Logout
              </Links>
            </>
          ) : (
            <>
              <Links href='/login' onClick={handleMenu}>
                Login
              </Links>
              <Links href='/register' onClick={handleMenu}>
                Register
              </Links>
            </>
          )}
        </nav>
      )}
    </>
  );
};

export default ToggleMenu;
