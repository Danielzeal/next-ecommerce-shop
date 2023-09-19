"use client";

import Button from "@/components/Button";
import Container from "@/components/Container";

type Props = {
  error: Error;
  reset: () => void;
};

const ErrorPage = ({ error, reset }: Props) => {
  return (
    <Container>
      <div className=''>
        <h1>{error.message}</h1>
        <Button onClick={() => reset()} text='reset' className='' />
      </div>
    </Container>
  );
};

export default ErrorPage;
