import { getCategories } from "@/services";
import Link from "next/link";

type Prop = {
  catName?: string;
};

const Category = async ({ catName }: Prop) => {
  const categories: CategoryType[] = await getCategories();

  return (
    <div className='flex gap-8 mt-6 overflow-hidden'>
      {categories &&
        categories.map((category) => (
          <div key={category.id} className='group'>
            <Link
              href={`/category/${category.name}`}
              className='uppercase font-semibold text-lg'
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
