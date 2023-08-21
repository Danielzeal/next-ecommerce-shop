import { ReactNode } from "react";

type Props = {
  children: ReactNode;
};

const Container = ({ children }: Props) => {
  return (
    <div className='max-w-7xl mx-auto px-4 sm:px-8 lg:px-12 xl:px-0 h-full'>
      {children}
    </div>
  );
};

export default Container;
