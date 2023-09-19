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

  if (session && session.user.isAdmin) {
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
      throw new Error("Something went wrong");
    }
  } else {
    return NextResponse.json(
      { message: "Unauthorized user access" },
      { status: 401 }
    );
  }
};

export const PATCH = async (req: NextRequest) => {
  const session = await getAuthSession();
  const body = await req.json();
  const { title, description, price, imgFile, selectedSizes, cat, id } = body;

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
  console.log(data);
  if (session && session.user.isAdmin) {
    try {
      await prisma.product.update({
        where: {
          id: id,
        },
        data: data,
      });
      return NextResponse.json({ message: "Product updated" });
    } catch (error) {
      console.log(error);
      throw new Error("Something went wrong");
    }
  } else {
    return NextResponse.json(
      { message: "Unauthorized user access" },
      { status: 401 }
    );
  }
};
