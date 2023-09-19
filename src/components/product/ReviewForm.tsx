"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useSession } from "next-auth/react";
import { FormEvent, useState } from "react";
import Link from "next/link";

type ReviewData = {
  comment: string;
  rating: string;
  id: string;
};

type Prop = {
  id: string;
};

const ReviewForm = ({ id }: Prop) => {
  const { status } = useSession();
  const [comment, setComment] = useState("");
  const [rating, setRating] = useState("");

  const queryClient = useQueryClient();

  const { mutate, isLoading } = useMutation({
    mutationFn: async ({ comment, rating, id }: ReviewData) => {
      await fetch("/api/products/review", {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ comment, rating, id }),
      });
    },
    onSuccess: () => {
      setComment("");
      setRating("");
    },

    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["products"] });
    },
  });

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!comment || !rating) return;

    mutate({ comment, rating, id });
  };
  return status === "authenticated" ? (
    <div className='w-full md:w-1/2'>
      <h1 className='pb-6 font-bold text-2xl'>Add Review</h1>
      <form onSubmit={handleSubmit}>
        <textarea
          name='comment'
          id='comment'
          cols={30}
          rows={10}
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          className='w-full border-2 border-gray-600 rounded-md p-3'
        ></textarea>
        <div className='flex w-full gap-6'>
          <select
            name='rating'
            id='rating'
            value={rating}
            onChange={(e) => setRating(e.target.value)}
            className='w-full p-3 border-2 rounded-md border-black'
          >
            <option value=''>Select...</option>
            <option value='1'>1</option>
            <option value='2'>2</option>
            <option value='3'>3</option>
            <option value='4'>4</option>
            <option value='5'>5</option>
          </select>
          <button className='w-full p-3 rounded-md bg-black text-white hover:bg-gray-400 hover:text-black transition-colors ease-in duration-150'>
            {isLoading ? "Submitting..." : "Submit"}
          </button>
        </div>
      </form>
    </div>
  ) : (
    <div>
      <h1 className='text-xl'>Login to add comment</h1>
      <Link href={"/login"} className='font-bold text-blue-400'>
        Login
      </Link>
    </div>
  );
};

export default ReviewForm;
