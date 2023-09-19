import { prisma } from "@/util/init-prisma";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (
  req: NextRequest,
  { params }: { params: { id: string } }
) => {
  const { id } = params;

  try {
    const reviews = await prisma.review.findMany({
      where: {
        productId: id,
      },
      include: {
        user: true,
      },
    });

    if (!reviews) {
      return NextResponse.json(
        { message: "Reviews not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(reviews);
  } catch (error) {}
};
