import { getAuthSession } from "@/util/auth";
import { prisma } from "@/util/init-prisma";
import { NextRequest, NextResponse } from "next/server";

export const GET = async () => {
  const session = await getAuthSession();

  if (session) {
    if (session.user.isAdmin) {
      const orders = await prisma.order.findMany();
      return NextResponse.json(orders);
    }
    const orders = await prisma.order.findMany({
      where: {
        userEmail: session.user.email!,
      },
    });
    return NextResponse.json(orders);
  } else {
    return NextResponse.json({ message: "Unauthorized user" }, { status: 401 });
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
  } catch (error) {
    console.log(error);
    NextResponse.json({ message: "Something went wrong!" });
  }
};
