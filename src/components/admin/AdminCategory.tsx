"use client";

import { Dispatch, SetStateAction, useEffect, useState } from "react";

type Props = {
  setCat: Dispatch<SetStateAction<string>>;
  cat: string;
};

const AdminCategory = ({ setCat, cat }: Props) => {
  const [categories, setCategories] = useState<CategoryType[]>([]);
  useEffect(() => {
    const getCategories = async () => {
      try {
        const res = await fetch("/api/products/category");

        if (!res.ok) {
          throw new Error("Something went wrong!");
        }
        const data = await res.json();
        setCategories(data);
      } catch (error) {
        console.log(error);
      }
    };

    getCategories();
  });
  return (
    <label htmlFor='category' className='w-1/2'>
      Category <br />
      <select
        name='category'
        id='category'
        value={cat}
        className='border-2 h-[48px] px-4 rounded-md w-full'
        onChange={(e) => setCat(e.target.value)}
      >
        <option value=''>Select...</option>
        {categories.map((category) => (
          <option
            value={category.name}
            key={category.id}
            className='capitalize'
          >
            {category.name}
          </option>
        ))}
      </select>
    </label>
  );
};

export default AdminCategory;
