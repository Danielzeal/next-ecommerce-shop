import { prisma } from "@/util/init-prisma";
import { NextResponse } from "next/server";

export const GET = async () => {
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
      return NextResponse.json({ message: "Not found" }, { status: 404 });
    }

    return NextResponse.json(products);
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { message: "Something went wrong" },
      { status: 500 }
    );
  }
};
