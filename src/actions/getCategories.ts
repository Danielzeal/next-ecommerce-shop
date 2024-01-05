import { prisma } from "@/util/init-prisma";

const getCategories = async () => {
  try {
    const categories = await prisma.category.findMany({
      select: {
        name: true,
        id: true,
      },
    });

    if (!categories) {
      throw new Error("Categories not found");
    }

    return categories;
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(error.message);
    }
  }
};

export default getCategories;
