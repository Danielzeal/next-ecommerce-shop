"use client";
import Container from "@/components/Container";

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { FaPlus } from "react-icons/fa";
import Link from "next/link";
import Loading from "@/components/Loading";
import AdminProducts from "@/app/admin/_components/AdminProducts";
import { useQuery } from "@tanstack/react-query";

type Props = {
  searchParams: {
    page: string;
  };
};

const Products = ({ searchParams }: Props) => {
  const pageNumber: number = Number(searchParams.page) || 1;

  const { data: authUser, status } = useSession();
  const router = useRouter();

  // useEffect(() => {
  //   if (status === "unauthenticated" || !authUser?.user.isAdmin) {
  //     router.push("/");
  //   }
  // }, [authUser, router, status]);

  useEffect(() => {}, [pageNumber]);

  const { isLoading, data } = useQuery({
    queryKey: ["products", pageNumber],
    queryFn: async () => {
      const res = await fetch(`/api/products/?page=${pageNumber}`);

      if (!res.ok) {
        throw new Error("Something went wrong");
      }

      return res.json();
    },
  });

  if (isLoading) {
    return <Loading />;
  }

  return (
    <Container>
      <div className=' bg-white my-6 p-8 rounded-md shadow-md overflow-x-auto no-scrollbar'>
        <button className='bg-green-500 text-white p-3 rounded-md uppercase text-semibold flex items-center gap-3'>
          <Link href='/admin/product/add'>Create Product</Link>
          <FaPlus />
        </button>
        <h1 className='text-center md:text-2xl text-lg font-lora font-bold mb-6'>
          Products
        </h1>
        <AdminProducts
          products={data.products}
          pageNumber={pageNumber}
          count={data.pageCount}
        />
      </div>
    </Container>
  );
};

export default Products;
