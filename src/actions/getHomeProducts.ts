import { prisma } from "@/util/init-prisma";

const getHomeProducts = async (page: number, category?: string) => {
  const productPerPage = 8;
console.log(productPerPage)
  try {
    const query: any = {
      where: {
        ...(category === "undefined" ? {} : { catName: category! }),
      },
      orderBy: {
        createdAt: "desc",
      },
      take: productPerPage,
      skip: productPerPage * (page - 1),
    };
console.log("testing");

    const [count, products] = await Promise.all([
      
      prisma.product.count({
        where: query.where,
      }),
      prisma.product.findMany(query),
    ]);

    if (!products) {
      throw new Error("Products not found");
    }

    return { products, pageCount: Math.ceil(count / productPerPage) };
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(error.message);
    }
  }
};

export default getHomeProducts;
