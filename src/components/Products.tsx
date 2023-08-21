import { AllProducts } from "@/data";
import Image from "next/image";
import Link from "next/link";
import Rating from "./Rating";

const Products = () => {
  return (
    <div className='w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6 my-8'>
      {AllProducts.map((product) => (
        <Link
          href={`/product/${product.id}`}
          key={product.id}
          className='bg-slate-200 p-3'
        >
          <Image
            src={product.img}
            alt={product.name}
            width={300}
            height={300}
            className='object-contain w-full'
          />
          <h2 className='text-black text-center font-semibold text-2xl py-4'>
            {product.name}
          </h2>
          <div className='flex justify-between'>
            <p>
              <Rating value={product.rating} />{" "}
              <span>({product.numReviews})Reviews</span>
            </p>
            <h3 className='text-green-700'>${product.price}</h3>
          </div>
        </Link>
      ))}
    </div>
  );
};

export default Products;
