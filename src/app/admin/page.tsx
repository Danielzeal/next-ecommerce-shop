"use client";
import Container from "@/components/Container";

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { FaPlus } from "react-icons/fa";
import Link from "next/link";
import Loading from "@/components/Loading";
import AdminProducts from "@/components/admin/AdminProducts";
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

  useEffect(() => {
    if (status === "unauthenticated" || !authUser?.user.isAdmin) {
      router.push("/");
    }
  }, [authUser, router, status]);

  const { isLoading, data } = useQuery({
    queryKey: ["products"],
    queryFn: async () => {
      const res = await fetch(
        `/api/products/?page=${pageNumber}&category=${undefined}`
      );

      if (!res.ok) {
        throw new Error("Something went wrong");
      }

      return res.json();
    },
  });

  if (isLoading) {
    return <Loading />;
  }

  if (data) {
    console.log(data);
  }

  return (
    <Container>
      <div className=' bg-white my-6 p-8 rounded-md shadow-md overflow-hidden'>
        <button className='bg-green-500 text-white p-3 rounded-md uppercase text-semibold flex items-center gap-3'>
          <Link href='/admin/product/add'>Create Product</Link>
          <FaPlus />
        </button>
        <h1 className='text-center text-2xl font-bold mb-6'>Products</h1>
        <AdminProducts products={data.products} />
      </div>
    </Container>
  );
};

export default Products;