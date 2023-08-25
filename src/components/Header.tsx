import { FaSearch } from "react-icons/fa";
import Container from "./Container";
import Link from "next/link";
import ToggleMenu from "./ToggleMenu";

const Header = () => {
  return (
    <>
      <header className='bg-black h-20 text-white sticky top-0 z-20 w-full'>
        <Container>
          <div className='flex items-center justify-between h-full relative'>
            <h1 className='font-bold text-xl text-white uppercase'>
              <Link href={"/"}>OmjiHub</Link>
            </h1>
            <div className='items-center gap-1 hidden sm:flex'>
              <input
                type='text'
                className='w-[300px] h-10 rounded-md px-4 placeholder:text-gray-500'
                placeholder='Search...'
              />
              <button className='h-10 flex items-center justify-center border w-10 rounded-md'>
                <FaSearch />
              </button>
            </div>
            <ToggleMenu />
          </div>
        </Container>
      </header>
    </>
  );
};

export default Header;
