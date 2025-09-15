# FAQ (Draft)

### Is self-hosting supported?
No. The source is available for development and contributions, but production use requires the official hosted service or a commercial license.

### Do you charge my card during development?
No. Payments are mocked by default. Real charges only occur when PAYMENTS_ENABLED=true and live Stripe keys are set in production.

### Which job boards are supported?
MVP targets one job board. Pro roadmap includes multiple boards.

### How do I upgrade?
Use the in-app Billing page to start a subscription. In development, this redirects to a mock success page.

### How do I cancel?
Use the customer portal (Stripe) when payments are enabled. In development, the portal link is mocked.