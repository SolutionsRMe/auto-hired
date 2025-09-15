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

## 💰 Business Model

AutoHired operates on a **freemium SaaS model**:

### 🆓 Lite (Free)
- Manual application tracking
- Basic job search with filters
- Resume builder (single template)
- Limited to 5 applications per month

### ⚡ Pro ($29/month)
- Unlimited automated applications
- AI-powered resume optimization for each job
- Advanced analytics and success tracking
- Multiple resume templates
- Priority support
- ATS compatibility scoring

### 🚀 Enterprise (Custom pricing)
- White-label solution
- API access
- Custom integrations
- Dedicated support
- Advanced reporting

## 🛠️ Technology Stack

- **Frontend**: React 18 + TypeScript, Vite, shadcn/ui, Tailwind CSS
- **Backend**: Express.js + TypeScript, Drizzle ORM
- **Database**: PostgreSQL with connection pooling
- **Authentication**: Firebase Auth (Google Sign-In)
- **Payments**: Stripe subscriptions
- **Deployment**: Vercel (frontend) + Railway (backend)
- **Queue System**: Bull Queue for job processing

## 💻 Development Setup (Contributors Only)

> **⚠️ Note**: This setup is for development and contribution purposes only. Production deployment requires a commercial license.

### Prerequisites
- Node.js 18+
- PostgreSQL database
- Firebase project
- Stripe account (for payment testing)

### Quick Start
```bash
# Clone the repository
git clone https://github.com/TheSolutionDeskAndCompany/AutoHired.git
cd AutoHired

# Install dependencies
npm install

# Copy environment template
cp .env.example .env

# Configure your .env file with:
# - DATABASE_URL (PostgreSQL)
# - Firebase credentials
# - Stripe test keys

# Set up database
npm run db:push

# Start development server
npm run dev
```

### Development Commands
```bash
npm run dev      # Start dev server with hot reload
npm run build    # Build for production
npm run check    # TypeScript type checking
npm run db:push  # Push database schema changes
```

## 🚀 Official Service

**Want to use AutoHired without the hassle of self-hosting?**

✨ [Join our waitlist](mailto:info@thesolutiondesk.ca?subject=AutoHired%20Waitlist) to be first in line when we launch!

- No setup required
- Always up-to-date
- Guaranteed uptime
- Professional support
- Advanced features not available in open source

## 📜 License

This project is source-available under a custom license. See [LICENSE](./LICENSE) for details.

- ✅ **Personal/Educational Use**: Freely view, study, and modify the code
- ✅ **Contributions**: Pull requests welcome!
- ❌ **Commercial Hosting**: Not permitted without a commercial license
- ❌ **SaaS Competition**: Not permitted

[Contact us](mailto:info@thesolutiondesk.ca) for commercial licensing inquiries.

## 📞 Contact & Support

- **Business Inquiries**: [info@thesolutiondesk.ca](mailto:info@thesolutiondesk.ca)
- **Waitlist Signup**: [Join Here](mailto:info@thesolutiondesk.ca?subject=AutoHired%20Waitlist)
- **Bug Reports**: [GitHub Issues](https://github.com/TheSolutionDeskAndCompany/AutoHired/issues)
- **Feature Requests**: [GitHub Discussions](https://github.com/TheSolutionDeskAndCompany/AutoHired/discussions)

---

**🎆 Ready to 10x your job search? [Join the waitlist](mailto:info@thesolutiondesk.ca?subject=AutoHired%20Waitlist) today!**
