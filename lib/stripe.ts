import Stripe from "stripe";

if (!process.env.STRIPE_SECRET_KEY) {
  throw new Error("❌  STRIPE_SECRET_KEY is not set in .env.local");
}

export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
  apiVersion: "2024-06-20",
  typescript: true,
});

/* ─── Price IDs ─────────────────────────────────────────────────────── */
export const STRIPE_PRICES = {
  starter: {
    monthly: process.env.STRIPE_STARTER_MONTHLY_PRICE_ID!,
    annual:  process.env.STRIPE_STARTER_ANNUAL_PRICE_ID!,
  },
  professional: {
    monthly: process.env.STRIPE_PRO_MONTHLY_PRICE_ID!,
    annual:  process.env.STRIPE_PRO_ANNUAL_PRICE_ID!,
  },
  enterprise: {
    monthly: process.env.STRIPE_ENTERPRISE_MONTHLY_PRICE_ID!,
    annual:  process.env.STRIPE_ENTERPRISE_ANNUAL_PRICE_ID!,
  },
} as const;

/* ─── Helpers ────────────────────────────────────────────────────────── */

/**
 * Create or retrieve a Stripe customer for a company.
 */
export async function getOrCreateStripeCustomer(
  companyId: string,
  email: string,
  name: string
): Promise<string> {
  // Search for existing customer by metadata
  const existing = await stripe.customers.search({
    query: `metadata['companyId']:'${companyId}'`,
    limit: 1,
  });

  if (existing.data.length > 0) {
    return existing.data[0].id;
  }

  const customer = await stripe.customers.create({
    email,
    name,
    metadata: { companyId },
  });

  return customer.id;
}

/**
 * Create a Stripe Checkout session for subscriptions.
 */
export async function createCheckoutSession(params: {
  customerId:  string;
  priceId:     string;
  companyId:   string;
  successUrl:  string;
  cancelUrl:   string;
  trialDays?:  number;
}) {
  return stripe.checkout.sessions.create({
    customer:   params.customerId,
    mode:       "subscription",
    line_items: [{ price: params.priceId, quantity: 1 }],
    success_url: params.successUrl,
    cancel_url:  params.cancelUrl,
    subscription_data: {
      trial_period_days: params.trialDays ?? 14,
      metadata: { companyId: params.companyId },
    },
    metadata: { companyId: params.companyId },
  });
}

/**
 * Create a Stripe Billing Portal session so customers can manage their subscription.
 */
export async function createBillingPortalSession(
  customerId: string,
  returnUrl: string
) {
  return stripe.billingPortal.sessions.create({
    customer:   customerId,
    return_url: returnUrl,
  });
}

export default stripe;
