"use client";

import { signIn, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import Image from "next/image";
import Container from "@/components/Container";

const Login = () => {
  const { status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === "authenticated") {
      router.push("/");
    }
  }, [status, router]);

  return (
    <Container>
      <div className='w-full flex h-[calc(100vh-160px)] items-center justify-center'>
        <div className='w-full max-w-[500px] p-8 bg-white shadow-md flex flex-col gap-3 rounded-md'>
          <h1 className='text-center md:text-xl uppercase font-bold font-lora'>
            Login
          </h1>
          <div
            className='flex items-center justify-center gap-4 bg-black text-white hover:bg-gray-400 hover:text-gray-50"
          transition-colors ease-in duration-200 font-semibold px-6 py-2 rounded-md shadow-md cursor-pointer'
            onClick={() => signIn("google")}
          >
            <Image
              src={"/img/google-color-svgrepo-com.svg"}
              alt='google login auth'
              height={24}
              width={24}
            />
            <span className='uppercase md:text-lg text-sm'>
              Sign in with Google
            </span>
          </div>
        </div>
      </div>
    </Container>
  );
};

export default Login;
