import { prisma } from "@/util/init-prisma";
import { NextResponse } from "next/server";

export const GET = async () => {
  try {
    const categories = await prisma.category.findMany({
      select: {
        name: true,
        id: true,
      },
    });

    if (!categories) {
      return NextResponse.json(
        { message: "Categories not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(categories);
  } catch (error) {
    console.log(error);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
};
