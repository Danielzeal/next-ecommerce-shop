import Image from "next/image";
import Link from "next/link";
import Rating from "../Rating";

const Card = ({ product }: { product: Product }) => {
  return (
    <Link
      href={`/product/${product.id}`}
      key={product.id}
      className='bg-gray-200 p-3 group group-hover:bg-gray-100 hover:shadow-lg text-gray-900 transition-all duration-200 ease-in-out'
    >
      <div className='relative h-[300px] w-full overflow-hidden'>
        <Image
          src={product.img}
          alt={product.title}
          fill
          sizes='(min-width: 1280px) 278px, (min-width: 780px) calc(31.04vw - 43px), (min-width: 640px) calc(50vw - 68px), calc(100vw - 56px)'
          className='object-cover group-hover:scale-110 transition-transform duration-200 ease-in'
        />
      </div>
      <h2 className='text-center font-semibold md:text-lg pb-2 pt-4 font-lora'>
        {product.title}
      </h2>
      <div className='flex justify-center items-center'>
        <Rating value={product.rating} />
      </div>
      <h3 className='text-green-700 font-medium mt-2'>
        ${product.price.toFixed(2)}
      </h3>
    </Link>
  );
};

export default Card;
