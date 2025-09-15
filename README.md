# 🚀 AutoHired — Job Application Automation

**Paid SaaS Service in Development** | **Source-Available for Development**

> **⚠️ Important**: This is the source code for AutoHired, a commercial SaaS platform. Self-hosting is not supported for production use. [Join our waitlist](mailto:info@thesolutiondesk.ca?subject=AutoHired%20Waitlist) to be notified when the official hosted service launches.

AutoHired automates your job application process with AI-powered tools, intelligent job matching, and comprehensive tracking. Say goodbye to manual applications and hello to landing your dream job faster.

## ✨ What AutoHired Does

🎯 **Smart Job Matching** - AI finds the perfect opportunities based on your profile  
🤖 **Automated Applications** - Apply to dozens of jobs with one click  
📊 **Advanced Analytics** - Track success rates, response times, and optimize your strategy  
📝 **AI Resume Optimization** - Automatically tailor your resume for each application  
⚡ **Bulk Operations** - Manage hundreds of applications effortlessly  

## 🏆 Why AutoHired?

- **10x Faster Applications**: What used to take hours now takes minutes
- **Higher Success Rates**: AI-optimized applications get more responses
- **Never Miss an Opportunity**: Automated job scraping finds hidden gems
- **Data-Driven Insights**: Make informed decisions about your job search strategy
- **ATS-Compatible**: All applications pass through Applicant Tracking Systems

## 💸 Pricing & Access

We believe in accessible job search tools.

* **Pro — $9/month**
  Unlimited automated applications, AI resume tailoring, analytics, priority support.

* **Recent Grad / First-Time Job Seeker — Pay-What-You-Want (one-time)**
  Enter any amount from $0 to infinity.

No enterprise tier. No long-term contracts. Cancel anytime.

### How billing works

* **Pro** uses a recurring subscription via Stripe Checkout.
* **PWYW** uses a one-time payment via Stripe's Payment Element; entering $0 grants access instantly (no payment required).
* Premium features are available to **Pro** and **PWYW** users alike.

## ▶️ Quick Start

```bash
# server + client (monorepo root)
cp .env.example .env   # fill DATABASE_URL, SESSION_SECRET, Stripe keys, etc.
npm install
npm run db:push
npm run build
npm start  # http://localhost:5000
```

**Required env:**

```
PAYMENTS_ENABLED=true
PREMIUM_ENABLED=true
STRIPE_SECRET_KEY=sk_test_...
STRIPE_WEBHOOK_SECRET=whsec_...
VITE_STRIPE_PUBLISHABLE_KEY=pk_test_...
STRIPE_PRO_MONTHLY_PRICE_ID=price_for_9usd
```

## 🔒 Feature Gating

* **Free:** limited to 5 applications/month.
* **Premium (Pro or PWYW):** unlimited apps, resume tailoring, analytics.

## ♿ Accessibility

Billing UI uses semantic form controls (`<fieldset>`, labels, ARIA), keyboard-friendly focus order, and high-contrast defaults. PWYW supports screen readers and numeric entry with visible and sr-only labels.

## 🧪 Testing billing locally

```bash
stripe listen --events checkout.session.completed,customer.subscription.created,customer.subscription.updated,customer.subscription.deleted,payment_intent.succeeded --forward-to localhost:5000/api/stripe/webhook
# Pro card: 4242 4242 4242 4242
```

## ??? Technology Stack

- **Frontend**: React 18 + TypeScript, Vite, shadcn/ui, Tailwind CSS
- **Backend**: Express.js + TypeScript, Drizzle ORM
- **Database**: PostgreSQL with connection pooling
- **Authentication**: Firebase Auth (Google Sign-In)
- **Payments**: Stripe subscriptions
- **Deployment**: Vercel (frontend) + Railway (backend)
- **Queue System**: Bull Queue for job processing

## ?? Official Service

**Want to use AutoHired without the hassle of self-hosting?**

? [Join our waitlist](mailto:info@thesolutiondesk.ca?subject=AutoHired%20Waitlist) to be first in line when we launch!

- No setup required
- Always up-to-date
- Guaranteed uptime
- Professional support
- Advanced features not available in open source

## ?? License

This project is source-available under a custom license. See [LICENSE](./LICENSE) for details.

- ? **Personal/Educational Use**: Freely view, study, and modify the code
- ? **Contributions**: Pull requests welcome!
- ? **Commercial Hosting**: Not permitted without a commercial license
- ? **SaaS Competition**: Not permitted

[Contact us](mailto:info@thesolutiondesk.ca) for commercial licensing inquiries.

## ?? Contact & Support

- **Business Inquiries**: [info@thesolutiondesk.ca](mailto:info@thesolutiondesk.ca)
- **Waitlist Signup**: [Join Here](mailto:info@thesolutiondesk.ca?subject=AutoHired%20Waitlist)
- **Bug Reports**: [GitHub Issues](https://github.com/TheSolutionDeskAndCompany/AutoHired/issues)
- **Feature Requests**: [GitHub Discussions](https://github.com/TheSolutionDeskAndCompany/AutoHired/discussions)

---

**?? Ready to 10x your job search? [Join the waitlist](mailto:info@thesolutiondesk.ca?subject=AutoHired%20Waitlist) today!**
