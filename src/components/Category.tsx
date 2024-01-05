import getCategories from "@/actions/getCategories";
import Link from "next/link";

type Prop = {
  catName?: string;
};

const Category = async ({ catName }: Prop) => {
  const categories = await getCategories();

  return (
    <div className='flex gap-8 mt-6 overflow-x-scroll no-scrollbar'>
      {categories &&
        categories.map((category) => (
          <div key={category.id} className='group'>
            <Link
              href={`/products?category=${category.name}`}
              className='uppercase font-semibold md:text-lg text-sm'
            >
              {category.name}
            </Link>
            <div
              className={`${
                catName === category.name ? "w-full" : "w-0"
              } group-hover:w-full h-1 bg-black transition-all duration-200 ease-in`}
            />
          </div>
        ))}
    </div>
  );
};

export default Category;
