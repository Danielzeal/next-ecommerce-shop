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

// fetch all productd
export const getProducts = async (pageNumber: number, category: string) => {
  const res = await fetch(
    `${BASEURL}/api/products?page=${pageNumber}&category=${category || ""}`,
    {
      cache: "no-store",
    }
  );

  if (!res.ok) {
    throw new Error("Something went wrong");
  }

  return await res.json();
};

export const getProduct = async (id: string) => {
  try {
    const res = await fetch(`${BASEURL}/api/products/${id}`, {
      cache: "no-store",
    });

    if (!res.ok) {
      throw new Error("Something went wrong");
    }

    return await res.json();
  } catch (error) {
    console.log(error);
  }
};

export const getSliderProducts = async () => {
  try {
    const res = await fetch(`${BASEURL}/api/products/slide`, {
      cache: "no-store",
    });

    if (!res.ok) {
      throw new Error("Something went wrong");
    }

    return await res.json();
  } catch (error) {
    console.log(error);
  }
};

export const getOrders = async () => {
  const res = await fetch(`${BASEURL}/api/orders`, {
    cache: "no-store",
  });

  if (!res.ok) {
    throw new Error("Something went wrong");
  }

  return res.json();
};
