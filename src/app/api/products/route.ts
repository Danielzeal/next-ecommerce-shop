import { getAuthSession } from "@/util/auth";
import { prisma } from "@/util/init-prisma";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (req: NextRequest) => {
  const { searchParams } = new URL(req.url);

  const page: number = Number(searchParams.get("page")) || 1;
  const category = searchParams.get("category");
  const productPerPage: number = 8;

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

    const [count, products] = await Promise.all([
      prisma.product.count({
        where: query.where,
      }),
      prisma.product.findMany(query),
    ]);

    if (!products) {
      return NextResponse.json({ message: "Not found" }, { status: 404 });
    }

    return NextResponse.json(
      { products, pageCount: Math.ceil(count / productPerPage) },
      { status: 200 }
    );
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { message: "Something went wrong" },
      { status: 500 }
    );
  }
};

export const POST = async (req: NextRequest) => {
  const session = await getAuthSession();
  const body = await req.json();
  const { title, description, price, imgFile, selectedSizes, cat } = body;

  if (!session) {
    return NextResponse.json({ message: "Unauthorized user" }, { status: 401 });
  }
  try {
    await prisma.product.create({
      data: {
        title,
        description,
        price,
        img: imgFile,
        sizes: selectedSizes,
        user: { connect: { email: session.user.email! } },
        category: { connect: { name: cat } },
      },
    });
    return NextResponse.json({ message: "Product created" }, { status: 201 });
  } catch (error) {
    console.log(error);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
};

export const PATCH = async (req: NextRequest) => {
  const session = await getAuthSession();
  const body = await req.json();
  const { title, description, price, imgFile, selectedSizes, cat, id } = body;

  if (!session?.user.isAdmin) {
    return NextResponse.json({ message: "Unauthorized user" }, { status: 401 });
  }

  let data: any = {
    title,
    description,
    price,
    catName: cat,
    sizes: selectedSizes,
  };

  if (imgFile) {
    data.imgFile = imgFile;
  }
  try {
    await prisma.product.update({
      where: {
        id: id,
      },
      data: data,
    });
  } catch (error) {
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
};
