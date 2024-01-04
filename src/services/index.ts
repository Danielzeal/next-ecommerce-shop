import { BASEURL } from "@/constant";

// fetch all categories
export const getCategories = async () => {
  try {
    const res = await fetch(`${BASEURL}/api/products/category`);

    if (!res.ok) {
      throw new Error("Something went wrong!");
    }

    return await res.json();
  } catch (error) {
    console.log(error);
  }
};
