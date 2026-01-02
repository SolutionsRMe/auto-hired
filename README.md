# AutoHired — Job Application Automation

AutoHired is a job-application workflow tool (in active development) focused on reducing repetitive work: tracking opportunities, tailoring materials, and managing application volume without sacrificing quality.

This repository contains the source code for AutoHired.
It is source-available, not open source, and is being built toward a hosted product release.

---

## Status

- Actively developed
- Not production-stable
- Breaking changes expected
- Contributions welcome

If you’re looking for a “click once, get hired by Friday” solution, that product has not yet passed peer review—or reality.

---

## What AutoHired Does (Current + Planned)

- Job tracking and pipeline management
- Resume and profile data handling
- Application workflows and batching
- Outcome and response analytics
- Iteration and optimization over time

The goal is fewer manual steps, clearer signal, and less burnout.

---

## Tech Stack (High-Level)

- TypeScript
- Vite (frontend)
- Node.js (backend)
- Drizzle ORM (database tooling)

Deeper architectural details live in `DEVELOPMENT.md`.

---

## Repository Structure

/
├─ src/                  # Frontend application
├─ packages/
│  ├─ server/             # Backend server
│  ├─ core/               # Shared logic & types
│  └─ *-client/           # Client variants (if applicable)
├─ drizzle/               # Database schema & migrations
├─ .env.example
├─ README.md
├─ DEVELOPMENT.md

---

## Quick Start (Local Development)

This guide is for local development, evaluation, and contribution only.
It does not grant permission to operate AutoHired as a hosted service for third parties.

### Requirements

- Node.js 18+
- npm

### Setup

cp .env.example .env
npm install
npm run dev

The app will run locally in development mode.

For architecture, workflows, and conventions, see `DEVELOPMENT.md`.

---

## Contributing

Contributions are welcome and appreciated.

- Use Issues for bugs and defects
- Use Discussions for feature ideas and proposals
- Keep pull requests scoped and clearly explained

Before submitting a PR:
- Run type checks
- Ensure no secrets or credentials are included
- Document any non-obvious behavior

See `DEVELOPMENT.md` for development conventions.

---

## License

This project is source-available, not open source.

You may:
- View the source code
- Run it locally
- Modify it for personal use
- Contribute changes back to this repository

You may not:
- Re-host AutoHired as a service for third parties
- Offer it as a competing or white-labeled SaaS
- Sell or redistribute it as a product

See `LICENSE` for the full, binding terms.

Commercial licensing inquiries:
info@thesolutiondesk.ca

---

## Security

If you discover a security vulnerability, please do not open a public issue.
Follow the instructions in `SECURITY.md`.

---

## Contact

- Business & licensing: info@thesolutiondesk.ca
- Waitlist (hosted product): info@thesolutiondesk.ca (subject: “AutoHired Waitlist”)
- Issues: https://github.com/TheSolutionDeskAndCompany/AutoHired/issues
- Discussions: https://github.com/TheSolutionDeskAndCompany/AutoHired/discussions
