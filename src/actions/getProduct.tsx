import { prisma } from "@/util/init-prisma";

const getProduct = async (id: string) => {
  try {
    const product = await prisma.product.findUnique({
      where: {
        id: id,
      },
      include: {
        reviews: {
          include: {
            user: true,
          },
        },
      },
    });

    if (!product) {
      throw new Error("No product found");
    }

    return product;
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(error.message);
    }
  }
};

export default getProduct;
