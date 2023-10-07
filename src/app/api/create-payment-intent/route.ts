import { getAuthSession } from "@/util/auth";
import { prisma } from "@/util/init-prisma";
import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2023-08-16",
});

const calculateOrderAmount: any = (items: CartItem[]) => {
  const total = items.reduce((acc, curr) => {
    const itemTotal = (curr.quantity * curr.price).toFixed(2);
    acc += Number(itemTotal);
    return acc;
  }, 0);
  return total;
};

export const POST = async (req: NextRequest) => {
  const session = await getAuthSession();

  const body = await req.json();
  const { items, payment_intent_id } = body;

  // const total = calculateOrderAmount(items);

  if (!session) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  try {
    // create new order
    if (payment_intent_id) {
      const current_intent = await stripe.paymentIntents.retrieve(
        payment_intent_id
      );

      if (current_intent) {
        const update_intent = await stripe.paymentIntents.update(
          payment_intent_id,
          { amount: 200 }
        );
        // update order
        const [existing_order, update_order] = await Promise.all([
          prisma.order.findFirst({
            where: {
              paymentIntentId: payment_intent_id,
            },
          }),
          prisma.order.update({
            where: {
              paymentIntentId: payment_intent_id,
            },
            data: {
              amount: 200,
              products: items,
            },
          }),
        ]);

        if (!existing_order) {
          return NextResponse.json(
            { message: "Invalid payment intent" },
            { status: 400 }
          );
        }

        return NextResponse.json({ paymentIntent: update_intent });
      }
    } else {
      // Create a PaymentIntent with the order amount and currency
      console.log("hello");
      console.log(body);
      const paymentIntent = await stripe.paymentIntents.create({
        amount: 200,
        currency: "usd",
        automatic_payment_methods: {
          enabled: true,
        },
      });
      console.log("can't", paymentIntent);
      //create new order
      if (paymentIntent) {
        await prisma.order.create({
          data: {
            amount: 200,
            currency: "usd",
            paymentIntentId: payment_intent_id,
            products: items,
            user: { connect: { email: session.user.email! } },
          },
        });
        return NextResponse.json(paymentIntent);
      }
    }
  } catch (error) {
    return NextResponse.json(
      { error: "Something went wrong" },
      { status: 500 }
    );
  }
};
