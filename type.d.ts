type Product = {
  id: string;
  name: string;
  desc: string;
  img: string;
  price: number;
  sizes: string[];
  numReviews: number;
  rating: number;
  category: string;
};

type Products = Product[];

type CartItem = {
  id: string;
  size: string;
  img: string;
  quantity: number;
  price: number;
  name: string;
};

// type Category = {
//   id: string;
//   slug: string;
// }[];
