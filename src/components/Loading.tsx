"use client";

import ReactLoading from "react-loading";

const Loading = () => {
  return (
    <div className='w-full h-[calc(100vh-16px)] bg-opacity-black flex items-center justify-center'>
      <ReactLoading type='spin' color='#ffffff' height={100} width={50} />
    </div>
  );
};

export default Loading;
