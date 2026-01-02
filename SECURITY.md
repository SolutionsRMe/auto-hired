========================
FILE: SECURITY.md
========================

# Security Policy

## Reporting a Vulnerability

If you discover a security vulnerability in AutoHired, **do not open a public issue**.

Instead, report it privately by emailing:

security@thesolutiondesk.ca  
(or, if unavailable, info@thesolutiondesk.ca)

Include:
- A clear description of the issue
- Steps to reproduce (if applicable)
- Potential impact
- Any relevant logs or screenshots

Please do **not** exploit the vulnerability beyond what is necessary to
demonstrate it.

## Scope

This policy applies to:
- Source code in this repository
- Local development environments
- Build and configuration files

It does **not** apply to:
- Forks
- Third-party deployments
- Modified or redistributed versions of the software

## Response Expectations

- You will receive acknowledgment within a reasonable timeframe
- Valid reports will be investigated and addressed
- Credit may be given for responsible disclosure (optional, by request)

There is no bug bounty program at this time.


========================
FILE: .env.example
========================

# Environment Configuration (Local Development Only)
# Copy this file to `.env` and adjust values as needed.
# Do NOT commit real credentials.

# -------------------------
# App
# -------------------------

NODE_ENV=development
APP_PORT=3000
APP_NAME=AutoHired

# -------------------------
# Database
# -------------------------

# Example for local development
DATABASE_URL=postgresql://user:password@localhost:5432/autohired

# -------------------------
# Auth / Security
# -------------------------

# Used for signing tokens or sessions in development
AUTH_SECRET=dev-only-secret-change-me

# -------------------------
# Feature Flags
# -------------------------

ENABLE_ANALYTICS=false
ENABLE_EXPERIMENTAL_FEATURES=false

# -------------------------
# Notes
# -------------------------

# - These values are for local development only
# - Production values are intentionally undocumented
# - Never commit real secrets or credentials
