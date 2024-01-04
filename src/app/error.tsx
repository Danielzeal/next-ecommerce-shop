"use client";

import Button from "@/components/Button";
import Container from "@/components/Container";
import { FC } from "react";

type Props = {
  error: Error;
  reset: () => void;
};

const ErrorPage: FC<Props> = ({ error, reset }: Props) => {
  return (
    <Container>
      <div className='w-full h-[calc(100vh-160px)] items-center justify-center flex'>
        <div className='w-full max-w-[500px] p-8 bg-white shadow-md flex flex-col gap-3 rounded-md'>
          <h1 className='text-lg font-semibold capitalize text-center text-red-300'>
            {error.message}
          </h1>
          <Button onClick={() => reset()} text='try again' className='' />
        </div>
      </div>
    </Container>
  );
};

export default ErrorPage;
