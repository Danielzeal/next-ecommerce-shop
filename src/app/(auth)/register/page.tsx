"use client";

import { signIn } from "next-auth/react";
import Link from "next/link";

const Register = () => {
  return (
    <div className='w-full flex h-[calc(100vh-160px)] items-center justify-center'>
      <div className='w-full max-w-[700px] p-8 bg-white shadow-md flex flex-col gap-3'>
        <h1 className='text-center text-xl font-semibold'>Register</h1>
        <div className='w-full flex items-center justify-center p-3 border border-gray-500 rounded-md'>
          <button
            className='font-bold uppercase text-lg'
            onClick={() => signIn("google")}
          >
            Sign in with Google
          </button>
        </div>
        <p className='text-center'>or</p>
        <form className='flex flex-col gap-3'>
          <input
            type='text'
            placeholder='name'
            className='w-full p-3 border border-gray-500 rounded-md'
          />
          <input
            type='email'
            placeholder='email'
            className='w-full p-3 border border-gray-500 rounded-md'
          />
          <input
            type='password'
            placeholder='password'
            className='w-full p-3 border border-gray-500 rounded-md'
          />
          <input
            type='password'
            placeholder='confirm password'
            className='w-full p-3 border border-gray-500 rounded-md'
          />
          <button className='bg-black text-white font-semibold uppercase p-3 rounded-md'>
            Submit
          </button>
          <p>
            Don&apos;t have an account?{" "}
            <Link href={"/login"} className='font-bold'>
              Login
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Register;
