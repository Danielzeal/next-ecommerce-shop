"use client";

import { useEffect, useState } from "react";
import { FaRegUserCircle } from "react-icons/fa";
import { HiOutlineShoppingCart } from "react-icons/hi";
import { BsFileArrowDown } from "react-icons/bs";
import Links from "./Links";
import { signOut, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useCartStore } from "@/store/store";
import Link from "next/link";
import Image from "next/image";
import Horizontal from "./Horizontal";

const ToggleMenu = () => {
  const [toggle, setToggle] = useState(false);
  const { data, status } = useSession();
  const router = useRouter();

  const { cartItems } = useCartStore();

  useEffect(() => {
    useCartStore.persist.rehydrate();
  }, []);

  const handleMenu = () => {
    setToggle((prev) => !prev);
  };

  const handleLogout = () => {
    signOut();
    handleMenu();

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
          className='flex items-center gap-2 border-2 rounded-full p-2 md:text-2xl text-xl cursor-pointer hover:bg-slate-600 transition-colors duration-200 ease-in'
          onClick={handleMenu}
        >
          <BsFileArrowDown />
          {data ? (
            <Image
              src={data?.user.image!}
              alt={data?.user.name!}
              width={32}
              height={32}
              className='rounded-full'
            />
          ) : (
            <FaRegUserCircle />
          )}
        </div>
      </div>
      {toggle && (
        <nav className='absolute z-40 w-[200px] p-2 bg-white top-[100px] right-4 shadow-2xl text-black flex flex-col rounded-md'>
          {status === "authenticated" ? (
            <>
              <p className='font-semibold capitalize'>
                <span className='text-sm'>Welcome</span> <br />
                {data?.user.name}
              </p>
              <hr className='h-[2px]' />
              {data?.user?.isAdmin ? (
                <Links href='/admin' onClick={handleMenu}>
                  Admin
                </Links>
              ) : (
                <Links href='/orders' onClick={handleMenu}>
                  My Order
                </Links>
              )}
              <hr className='h-[2px]' />
              <Links href='/' onClick={handleLogout}>
                Logout
              </Links>
            </>
          ) : (
            <>
              <Links href='/login' onClick={handleMenu}>
                Login
              </Links>
            </>
          )}
        </nav>
      )}
    </>
  );
};

export default ToggleMenu;
