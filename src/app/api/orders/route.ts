import { getAuthSession } from "@/util/auth";
import { prisma } from "@/util/init-prisma";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (req: NextRequest) => {
  const session = await getAuthSession();

  const { searchParams } = new URL(req.url);
  const page: number = Number(searchParams.get("page")) || 1;
  const ordersPerPage: number = 15;

  if (!session) {
    return NextResponse.json({ message: "Unauthorized user" }, { status: 401 });
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
        return NextResponse.json({ message: "Not found" }, { status: 404 });
      }

      return NextResponse.json(
        { orders, pageCount: Math.ceil(count / ordersPerPage) },
        { status: 200 }
      );
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
      return NextResponse.json({ message: "Not found" }, { status: 404 });
    }

    return NextResponse.json(
      { orders, pageCount: Math.ceil(count / ordersPerPage) },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { error: "Something went wrong" },
      { status: 500 }
    );
  }
};

export const PATCH = async (req: NextRequest) => {
  const session = await getAuthSession();
  const body = await req.json();
  const { id, deliveryStatus } = body;

  if (!session?.user.isAdmin) {
    return NextResponse.json({ message: "Unauthorized user" }, { status: 401 });
  }

  try {
    await prisma.order.update({
      where: {
        id,
      },
      data: {
        deliveryStatus,
      },
    });
    return NextResponse.json({ message: "Order updated" }, { status: 200 });
  } catch (error) {
    console.log(error);
    NextResponse.json({ error: "Something went wrong!" }, { status: 500 });
  }
};
