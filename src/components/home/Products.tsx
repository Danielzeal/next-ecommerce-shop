import { FC, Fragment } from "react";
import Card from "./Card";
import Pagination from "./Pagination";
import Category from "./Category";
import getHomeProducts from "@/actions/getHomeProducts";

type Props = {
  page: number;
  category?: string;
};

const Products: FC<Props> = async ({ page, category }) => {
  const data = await getHomeProducts(page, category);

  return (
    <>
      {data && data.products.length > 0 ? (
        <>
          <Category catName={category!} />
          <div className='w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6 my-8'>
            {data.products &&
              data.products.map((product) => (
                <Fragment key={product.id}>
                  <Card product={product} />
                </Fragment>
              ))}
          </div>
          <Pagination page={page} pageCount={data.pageCount} />
        </>
      ) : (
        <div className='w-full bg-white md:p-8 p-4 rounded-md mt-[120px] shadow-md'>
          <p className='text-center font-semibold'>
            You have no record of product on your database!
          </p>
        </div>
      )}
    </>
  );
};

export default Products;
