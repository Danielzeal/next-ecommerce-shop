import { ChangeEvent, Dispatch, FormEvent, SetStateAction } from "react";
import Container from "../Container";
import AdminCategory from "./AdminCategory";
import { sizes } from "@/constant";
import ImageFile from "./ImageFile";

type Props = {
  title: string;
  price: number;
  description: string;
  selectedSizes: string[];
  setTitle: Dispatch<SetStateAction<string>>;
  setDescription: Dispatch<SetStateAction<string>>;
  setPrice: Dispatch<SetStateAction<number>>;
  setCat: Dispatch<SetStateAction<string>>;
  cat: string;
  setImgFile: Dispatch<SetStateAction<string>>;
  handleChange: (val: ChangeEvent<HTMLInputElement>) => void;
  handleSubmit: (val: FormEvent<HTMLFormElement>) => void;
};

const Form = ({
  title,
  price,
  description,
  selectedSizes,
  setTitle,
  setDescription,
  setPrice,
  setCat,
  handleChange,
  handleSubmit,
  setImgFile,
  cat,
}: Props) => {
  return (
    <Container>
      <div className=' bg-white my-6 p-8 rounded-md shadow-md'>
        <form className='w-full flex flex-col gap-4' onSubmit={handleSubmit}>
          <input
            type='text'
            placeholder='Title'
            className='w-full px-4 h-[48px] border-2 rounded-md'
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <textarea
            placeholder='Description'
            className='w-full h-[100px] border-2 p-4 rounded-md'
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          ></textarea>
          <div className='flex gap-8'>
            <label htmlFor='price' className='w-1/2'>
              Price <br />
              <input
                type='number'
                id='price'
                className='border-2 px-4 rounded-md w-full h-[48px]'
                value={price}
                onChange={(e) => setPrice(Number(e.target.value))}
              />
            </label>
            <AdminCategory setCat={setCat} cat={cat} />
          </div>
          <ImageFile setImgFile={setImgFile} />
          <div className='flex flex-wrap gap-4'>
            {sizes.map((size) => (
              <label
                htmlFor='small'
                className='flex items-center gap-2'
                key={size.id}
              >
                {size.name}{" "}
                <input
                  type='checkbox'
                  name={size.id}
                  id={size.id}
                  className='w-6 h-6'
                  value={size.val}
                  checked={selectedSizes.includes(size.val)}
                  onChange={handleChange}
                />
              </label>
            ))}
          </div>
          <button className='bg-black text-white hover:bg-gray-400 hover:text-gray-50 transition-colors ease-in duration-200 font-semibold px-8 py-3 rounded-md shadow-md self-start'>
            Submit
          </button>
        </form>
      </div>
    </Container>
  );
};

export default Form;
