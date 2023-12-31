import { getAuthSession } from "@/util/auth";
import { prisma } from "@/util/init-prisma";
import { NextRequest, NextResponse } from "next/server";

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
