import { prisma } from "@/util/init-prisma";

const getSliderProducts = async () => {
  try {
    const products = await prisma.product.findMany({
      select: {
        id: true,
        title: true,
        img: true,
        description: true,
        price: true,
      },
      take: 4,
    });

    if (!products) {
      throw new Error("Something went wrong");
    }

    return products;
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(error.message);
    }
  }
};

export default getSliderProducts;
