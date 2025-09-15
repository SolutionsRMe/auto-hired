import type { RequestHandler } from "express";
import { getUserSubscription } from "../services/billing/subscriptions";

export const requirePro: RequestHandler = async (req, res, next) => {
  try {
    // req.user is populated by passport
    const user: any = req.user;
    const userId = user?.claims?.sub || user?.id;

    if (!userId) {
      return res.status(401).json({ error: "Unauthorized" });
    }

    const sub = await getUserSubscription(userId);
    if (!sub?.active) {
      return res.status(402).json({ error: "Pro required" });
    }

    next();
  } catch (e) {
    res.status(500).json({ error: "Subscription check failed" });
  }
};
