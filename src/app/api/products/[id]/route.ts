import { getAuthSession } from "@/util/auth";
import { prisma } from "@/util/init-prisma";
import { NextRequest, NextResponse } from "next/server";

export const DELETE = async (
  req: NextRequest,
  {
    params,
  }: {
    params: {
      id: string;
    };
  }
) => {
  const session = await getAuthSession();
  const { id } = params;

  if (!session?.user.isAdmin) {
    return NextResponse.json(
      { message: "User not authorized" },
      { status: 401 }
    );
  }

  try {
    await prisma.product.delete({
      where: {
        id: id,
      },
    });
    return NextResponse.json({ message: "Product deleted" });
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { message: "Something went wrong" },
      { status: 500 }
    );
  }
};
