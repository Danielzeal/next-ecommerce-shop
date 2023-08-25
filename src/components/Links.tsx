import Link from "next/link";
import { ReactNode } from "react";

type Props = {
  children: ReactNode;
  href: string;
  onClick: () => void;
};

const Links = ({ children, href, onClick }: Props) => {
  return (
    <Link
      href={href}
      onClick={onClick}
      className='p-4 w-full hover:bg-gray-400 hover:text-white transition-colors duration-200 ease-in-out uppercase font-semibold'
    >
      {children}
    </Link>
  );
};

export default Links;
