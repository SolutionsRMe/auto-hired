declare namespace NodeJS {
  interface ProcessEnv {
    PAYMENTS_ENABLED?: 'true' | 'false';
    STRIPE_SECRET_KEY?: string;
    STRIPE_WEBHOOK_SECRET?: string;
    STRIPE_PRO_MONTHLY_PRICE_ID?: string;
    STRIPE_PRO_YEARLY_PRICE_ID?: string;
    DATABASE_URL?: string;
  }
}
