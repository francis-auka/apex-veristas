import { NextRequest, NextResponse } from "next/server";
import { headers } from "next/headers";
import Stripe from "stripe";
import { stripe } from "@/lib/stripe";
import connectDB from "@/lib/db";
import Subscription from "@/models/Subscription";
import Company from "@/models/Company";

export async function POST(req: NextRequest) {
  const body      = await req.text();
  const signature = headers().get("stripe-signature") as string;

  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(
      body,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET!
    );
  } catch (err: any) {
    console.error("[stripe webhook] signature verification failed:", err.message);
    return NextResponse.json({ error: "Invalid signature" }, { status: 400 });
  }

  await connectDB();

  switch (event.type) {
    case "customer.subscription.created":
    case "customer.subscription.updated": {
      const sub     = event.data.object as Stripe.Subscription;
      const companyId = sub.metadata.companyId;
      if (!companyId) break;

      await Subscription.findOneAndUpdate(
        { stripeSubscriptionId: sub.id },
        {
          stripeSubscriptionId: sub.id,
          stripeCustomerId:     sub.customer as string,
          stripePriceId:        sub.items.data[0]?.price.id,
          status:               sub.status === "active"   ? "active"
                              : sub.status === "trialing" ? "trialing"
                              : sub.status === "past_due" ? "past_due"
                              : sub.status as any,
          currentPeriodStart: new Date(sub.current_period_start * 1000),
          currentPeriodEnd:   new Date(sub.current_period_end   * 1000),
          cancelAtPeriodEnd:  sub.cancel_at_period_end,
        },
        { upsert: true, new: true }
      );
      break;
    }

    case "customer.subscription.deleted": {
      const sub = event.data.object as Stripe.Subscription;
      await Subscription.findOneAndUpdate(
        { stripeSubscriptionId: sub.id },
        { status: "cancelled", cancelAtPeriodEnd: false }
      );
      // Update company status
      const companyId = sub.metadata.companyId;
      if (companyId) {
        await Company.findByIdAndUpdate(companyId, { status: "cancelled" });
      }
      break;
    }

    case "invoice.payment_failed": {
      const invoice = event.data.object as Stripe.Invoice;
      if (invoice.subscription) {
        await Subscription.findOneAndUpdate(
          { stripeSubscriptionId: invoice.subscription },
          { status: "past_due" }
        );
      }
      break;
    }

    case "invoice.payment_succeeded": {
      const invoice = event.data.object as Stripe.Invoice;
      if (invoice.subscription) {
        await Subscription.findOneAndUpdate(
          { stripeSubscriptionId: invoice.subscription },
          { status: "active" }
        );
      }
      break;
    }

    default:
      console.log(`[stripe webhook] unhandled event: ${event.type}`);
  }

  return NextResponse.json({ received: true });
}
