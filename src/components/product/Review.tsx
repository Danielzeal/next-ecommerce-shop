"use client";

import { useQuery } from "@tanstack/react-query";
import Rating from "../Rating";
import Image from "next/image";
import ReviewForm from "./ReviewForm";

type Prop = {
  id: string;
};

const Review = ({ id }: Prop) => {
  const { isLoading, data: reviews } = useQuery({
    queryKey: ["products", id],
    queryFn: async () => {
      const res = await fetch(`/api/products/review/${id}`);
      if (!res.ok) {
        throw new Error("Something went wrong");
      }
      return res.json();
    },
  });

  return (
    <>
      {isLoading ? (
        <div className='w-full md:w-1/2'>Loading...</div>
      ) : (
        <div className='w-full md:w-1/2'>
          {reviews && reviews.length > 0 ? (
            reviews.map((review: Review) => (
              <div key={review.id} className='pb-4'>
                <p className='pt-4'>{review.comment}</p>
                <div className='flex items-center gap-2'>
                  {review.user?.image && (
                    <Image
                      src={review.user.image}
                      width={40}
                      height={40}
                      alt={review.user?.name}
                      className='rounded-full'
                    />
                  )}
                  <div>
                    <h2 className='font-lora font-bold capitalize'>
                      {review.user?.name}
                    </h2>
                    <Rating value={review.rating} />
                  </div>
                </div>
              </div>
            ))
          ) : (
            <p className='font-lora font-semibold text-center'>
              No review added to this product yet!
            </p>
          )}
        </div>
      )}
      <ReviewForm id={id} />
    </>
  );
};

export default Review;
