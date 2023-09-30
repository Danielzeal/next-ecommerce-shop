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

  if (session) {
    try {
      const body = await req.json();
      const { items, payment_intent_id } = body;

      const total = calculateOrderAmount(items) * 100;

      const orderData = {
        amount: total,
        currency: "usd",
        paymentIntentId: payment_intent_id,
        products: items,
        user: { connect: { email: "sparkuans@gmail.com" } },
      };

      // create new order
      if (payment_intent_id) {
        const current_intent = await stripe.paymentIntents.retrieve(
          payment_intent_id
        );

        if (current_intent) {
          const update_intent = await stripe.paymentIntents.update(
            payment_intent_id,
            { amount: total }
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
                amount: total,
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
        const paymentIntent = await stripe.paymentIntents.create({
          amount: total,
          currency: "usd",
          automatic_payment_methods: {
            enabled: true,
          },
        });

        if (paymentIntent) {
          orderData.paymentIntentId = paymentIntent.id;
        }

        // create new order
        await prisma.order.create({
          data: orderData,
        });

        return NextResponse.json({ paymentIntent });
      }
    } catch (error) {
      return NextResponse.json(
        { error: "Something went wrong" },
        { status: 500 }
      );
    }
  } else {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }
};
