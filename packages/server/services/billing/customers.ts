import { db } from "../../db";
import { users } from "@shared/schema";
import { eq } from "drizzle-orm";
import { stripe } from "../../stripe";

export async function createOrRetrieveCustomer(userId: string, email: string): Promise<string> {
  const [u] = await db.select().from(users).where(eq(users.id, userId));
  if (u?.stripeCustomerId) return u.stripeCustomerId;

  const customer = await stripe.customers.create({ email, metadata: { userId } });

  await db.update(users).set({ stripeCustomerId: customer.id }).where(eq(users.id, userId));
  return customer.id;
}
