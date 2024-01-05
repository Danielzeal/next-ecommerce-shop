"use client";

import { useRouter } from "next/navigation";

const Pagination = ({
  page,
  pageCount,
}: {
  page: number;
  pageCount: number;
}) => {
  const router = useRouter();

  return (
    pageCount > 1 && (
      <div className='flex'>
        {page !== 1 && (
          <button
            className={`py-3 px-6 bg-black text-white`}
            onClick={() => router.push(`/products?page=${page - 1}`)}
          >
            Prev
          </button>
        )}

        {[...Array(pageCount).keys()].map((num) => (
          <button
            key={num}
            disabled={page === num + 1}
            onClick={() => router.push(`/products?page=${num + 1}`)}
            className={`py-3 px-4 ${
              page === num + 1
                ? "bg-gray-400 text-gray-100"
                : "bg-black text-white"
            }`}
          >
            {num + 1}
          </button>
        ))}

        {page !== pageCount && (
          <button
            className={`py-3 px-6 bg-black text-white`}
            onClick={() => router.push(`/products?page=${page + 1}`)}
          >
            Next
          </button>
        )}
      </div>
    )
  );
};

export default Pagination;
