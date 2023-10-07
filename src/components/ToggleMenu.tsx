"use client";

import { useEffect, useState } from "react";
import { FaRegUserCircle } from "react-icons/fa";
import { RiCloseFill, RiMenu4Fill } from "react-icons/ri";
import { HiOutlineShoppingCart } from "react-icons/hi";
import Links from "./Links";
import { signOut, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useCartStore } from "@/store/store";
import Link from "next/link";
import Image from "next/image";
import DesktopNav from "./DesktopNav";

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
      <div className='flex md:gap-8 gap-4'>
        <Link href='/cart' className='relative flex items-center'>
          <HiOutlineShoppingCart size={28} />
          <span className='w-6 h-6 rounded-full bg-black text-white border-2 border-white absolute -top-1 -left-1 flex items-center justify-center text-sm'>
            {cartItems}
          </span>
        </Link>
        <DesktopNav />
        <div className='text-3xl cursor-pointer md:hidden'>
          {!toggle ? (
            <span onClick={handleMenu}>
              <RiMenu4Fill />
            </span>
          ) : (
            <span onClick={handleMenu}>
              <RiCloseFill />
            </span>
          )}
        </div>
      </div>
      {toggle && (
        <nav className='absolute z-40 w-[250px] p-2 bg-white top-[100px] right-4 shadow-2xl text-black flex flex-col rounded-md'>
          {data ? (
            <>
              <div className='flex items-center p-3 gap-3 capitalize'>
                <Image
                  src={data.user?.image!}
                  alt={data.user?.name!}
                  width={32}
                  height={32}
                  className='rounded-full'
                />
                <span className='text-xs font-bold'>{data.user?.name}</span>
              </div>
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
              <div className='flex items-center p-2 gap-3 capitalize'>
                <FaRegUserCircle size={32} />
                <span className='text-xs font-bold'>John Doe</span>
              </div>
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
