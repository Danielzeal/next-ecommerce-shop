import Link from "next/link";
import Container from "../Container";

const AdminHeader = () => {
  return (
    <Container>
      <header className='bg-white md:w-[300px] w-full text-black rounded-md shadow-md my-6 px-6'>
        <nav className='flex justify-between w-full h-[60px] items-center uppercase font-semibold'>
          <Link href={"/"}>Home</Link>
          <Link href={"/admin/orders"}>Orders</Link>
        </nav>
      </header>
    </Container>
  );
};

export default AdminHeader;
