type Product = {
  id: string;
  title: string;
  createdAt: Date;
  updatedAt: Date;
  description: string;
  img: string | null;
  price: number;
  sizes: string[];
  catName: string;
  userEmail: string;
  rating: number;
  numReview: number;
};

type Products = Product[];

type CartItem = {
  id: string;
  size: string;
  img: string;
  quantity: number;
  price: number;
  name: string;
  productId: string;
};

type Orders = {
  id: string;
  createdAt: string;
  updatedAt: string;
  amount: number;
  currency: string;
  paymentIntentId: string;
  products: CartItem[];
  status: string;
  deliveryStatus: string;
  userEmail: string;
  address: null | object;
};

type Sizes = {
  name: string;
  val: string;
  id: string;
}[];

type Review = {
  id: string;
  createdAt: string;
  rating: number;
  userEmail: string;
  comment: string;
  title: string;
  user: User;
};

type User = {
  id: string;
  name: string;
  email: string;
  emailVerified: null | boolean;
  image: string;
  isAdmin: boolean;
};

type EditProductDataType = {
  id: string;
  title: string;
  description: string;
  price: number;
  imgFile: string;
  cat: string;
  selectedSizes: string[];
};

type AddProductDataType = Omit<EditProductDataType, "id">;

type CategoryType = {
  name: string;
  id: string;
};
