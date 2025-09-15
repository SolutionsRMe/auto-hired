# Changelog

All notable changes to this project will be documented in this file.

The format is based on Keep a Changelog and this project adheres to Semantic Versioning.

## [Unreleased]
### Added
- Source-available license for SaaS positioning
- Product-focused README with business model
- CONTRIBUTING with commercial context and contribution areas
- Expanded .env.example for SaaS (Stripe, Firebase, analytics, feature flags)
- Stripe integration stubs (server and client) + subscription success route
- Billing page and navigation entries
- Pro-only middleware and client guard
- SECURITY, TERMS, PRIVACY drafts
- WARP.md for repo guidance

### Changed
- Removed cookies.txt from repo (file-level; history rewrite pending)

### Security
- .env and local environment files are ignored
