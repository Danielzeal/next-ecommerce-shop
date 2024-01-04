import { getAuthSession } from "@/util/auth";
import { prisma } from "@/util/init-prisma";

const getOrders = async (page: number) => {
  const session = await getAuthSession();

  const ordersPerPage: number = 15;

  if (!session) {
    throw new Error("Unauthorized access!");
  }

  try {
    if (session?.user.isAdmin) {
      const [count, orders] = await Promise.all([
        prisma.order.count(),
        prisma.order.findMany({
          orderBy: {
            createdAt: "desc",
          },
          take: ordersPerPage,
          skip: ordersPerPage * (page - 1),
        }),
      ]);

      if (!orders) {
        throw new Error("No order in our database");
      }

      return { orders, pageCount: Math.ceil(count / ordersPerPage) };
    }

    const [count, orders] = await Promise.all([
      prisma.order.count({
        where: {
          userEmail: session.user.email!,
        },
      }),
      prisma.order.findMany({
        where: {
          userEmail: session.user.email!,
        },
        orderBy: {
          createdAt: "desc",
        },
        take: ordersPerPage,
        skip: ordersPerPage * (page - 1),
      }),
    ]);

    if (!orders) {
      throw new Error("No order in our database");
    }

    return { orders, pageCount: Math.ceil(count / ordersPerPage) };
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(error.message);
    }
  }
};

export default getOrders;
