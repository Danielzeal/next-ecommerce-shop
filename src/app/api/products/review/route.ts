import { getAuthSession } from "@/util/auth";
import { prisma } from "@/util/init-prisma";
import { NextRequest, NextResponse } from "next/server";

export const PATCH = async (req: NextRequest) => {
  const session = await getAuthSession();
  if (session) {
    const body = await req.json();
    const { rating, comment, id } = body;

    try {
      const product = await prisma.product.findUnique({
        where: {
          id: id,
        },
        include: {
          reviews: {
            include: {
              user: true,
            },
          },
        },
      });

      if (product) {
        const review = product.reviews.find(
          (r) => r.user.email === session.user.email
        );

        if (!review) {
          const reviewData: any = {
            rating: Number(rating),
            userEmail: session.user.email,
            comment,
          };

          product.reviews.push(reviewData);

          product.numReview = product.reviews.length;

          product.rating =
            product.reviews.reduce((acc, curr) => {
              return acc + curr.rating;
            }, 0) / product.reviews.length;

          await prisma.product.update({
            where: {
              id: id,
            },
            data: {
              numReview: product.numReview,
              rating: product.rating,
              reviews: {
                create: reviewData,
              },
            },
          });

          return NextResponse.json(
            { message: "Product updated" },
            { status: 201 }
          );
        } else {
          return NextResponse.json(
            { message: "User already reviewesd this product" },
            { status: 409 }
          );
        }
      } else {
        return NextResponse.json(
          { message: "Product not found" },
          { status: 404 }
        );
      }
    } catch (error) {
      console.log(error);
    }
  } else {
    return NextResponse.json({
      message: "Unauthorized user access. Please Login.",
    });
  }
};
