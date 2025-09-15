# Security Policy

This document outlines how we handle secrets and security in development.

- Never commit secrets (.env, API keys, tokens). The repository ignores .env files.
- Use the provided .env.example as a template; keep telemetry and payments disabled by default.
- For vulnerability reports, email security@thesolutiondesk.ca. We aim to respond within 72 hours.
- Dependency updates are reviewed; we run `npm audit` periodically.
- Stripe webhooks should be secured with STRIPE_WEBHOOK_SECRET in production.
- Cookies and session data use secure settings in production (`secure: true`).
