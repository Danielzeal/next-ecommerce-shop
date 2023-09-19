"use client";

import { signIn, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import Logo from "../../../public/img/google-color-svgrepo-com.svg";
import Image from "next/image";

const Login = () => {
  const { status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === "authenticated") {
      router.push("/");
    }
  }, [status, router]);

  return (
    <div className='w-full flex h-[calc(100vh-160px)] items-center justify-center'>
      <div className='w-full max-w-[700px] p-8 bg-white shadow-md flex flex-col gap-3 rounded-md'>
        <h1 className='text-center text-xl uppercase font-bold'>Login</h1>
        <div
          className='flex items-center justify-center gap-4 bg-black text-white hover:bg-gray-400 hover:text-gray-50"
          transition-colors ease-in duration-200 font-semibold px-6 py-2 rounded-md shadow-md cursor-pointer'
          onClick={() => signIn("google")}
        >
          <Image src={Logo} alt='google login auth' />
          <span className='uppercase text-lg'>Sign in with Google</span>
        </div>
      </div>
    </div>
  );
};

export default Login;
