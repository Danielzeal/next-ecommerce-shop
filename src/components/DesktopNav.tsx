"use client";

import { signOut, useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { FaRegUserCircle } from "react-icons/fa";

const DesktopNav = () => {
  const { data } = useSession();
  const router = useRouter();

  const handleSignOut = () => {
    signOut();
    router.push("/");
  };

  return (
    <>
      <nav className='md:flex items-center gap-4 justify-center hidden'>
        {data ? (
          <>
            <div className='flex items-center justify-center gap-2'>
              <Image
                src={data.user?.image!}
                alt={data.user?.name!}
                width={32}
                height={32}
                className='rounded-full'
              />
              <span>{data.user?.name}</span>
            </div>
            {data?.user?.isAdmin ? (
              <Link href='/admin'>Admin</Link>
            ) : (
              <Link href='/orders'>My Order</Link>
            )}
            <button
              className='bg-white px-4 py-2 rounded-md text-black'
              onClick={handleSignOut}
            >
              Logout
            </button>
          </>
        ) : (
          <>
            <div className='flex items-center justify-center gap-2'>
              <FaRegUserCircle size={32} />
              <span>John Doe</span>
            </div>
            <Link
              href={"/login"}
              className='bg-white px-4 py-2 rounded-md text-black'
            >
              Login
            </Link>
          </>
        )}
      </nav>
    </>
  );
};

export default DesktopNav;
