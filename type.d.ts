type Product = {
  id: string;
  name: string;
  desc?: string;
  img: string;
  price: number;
  sizes?: string[];
  numReviews?: number;
  rating: number;
  category?: string;
};

type Products = Product[];

// type Category = {
//   id: string;
//   slug: string;
// }[];
