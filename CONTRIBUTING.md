# Contributing to AutoHired

Thank you for considering contributing to AutoHired! 🎉

## 🏢 Commercial Context

**Important**: AutoHired is a commercial SaaS platform. While the source code is available for learning and contributions, the hosted service will be a paid product. By contributing, you're helping build a better job search experience for everyone!

### What This Means
- ✅ **Your contributions are valued** - We appreciate all improvements to the codebase
- ✅ **Open development** - All development happens in the open on GitHub
- ✅ **Credit given** - Contributors are recognized in our documentation
- 💼 **Commercial use** - Your contributions may be used in our commercial hosted service
- 💰 **No compensation** - Contributions are voluntary and not compensated

## 🚀 How to Contribute

### 1. Set Up Development Environment
```bash
# Fork and clone the repository
git clone https://github.com/YOUR_USERNAME/AutoHired.git
cd AutoHired

# Install dependencies
npm install

# Set up environment (copy .env.example to .env)
cp .env.example .env

# Configure your database and API keys in .env

# Push database schema
npm run db:push

# Start development server
npm run dev
```

### 2. Development Workflow
1. **Create a Branch**: `git checkout -b feature/your-feature-name`
2. **Make Changes**: Follow our coding standards (see below)
3. **Test Changes**: Ensure `npm run check` passes
4. **Commit**: Use descriptive commit messages
5. **Push**: `git push origin feature/your-feature-name`
6. **Pull Request**: Open a PR to the `main` branch

## 🎨 Coding Standards

### TypeScript
- Use strict TypeScript throughout
- Define types in the `shared/` directory for cross-platform use
- No `any` types unless absolutely necessary

### React/Frontend
- Use functional components with hooks
- Follow the existing component structure in `src/components/`
- Use shadcn/ui components when possible
- Mobile-first responsive design

### Backend/API
- All protected endpoints must use `isAuthenticated` middleware
- Validate inputs with Zod schemas
- Use the storage interface for database operations
- Follow RESTful conventions

### Database
- Define schema changes in `shared/schema.ts`
- Use Drizzle ORM for all database operations
- Run `npm run db:push` after schema changes

## 🎯 Areas Where We Need Help

### High Priority
- 🔄 **Queue System**: Bull Queue integration for job processing
- 💳 **Stripe Integration**: Subscription management and billing
- 🤖 **Job Board Scrapers**: LinkedIn, Indeed, etc.
- 📊 **Analytics Dashboard**: Advanced reporting features
- 📱 **Mobile App**: React Native version

### Medium Priority
- 🎨 **UI/UX Improvements**: Better mobile experience
- ⚙️ **Performance**: Optimization and caching
- 🔍 **Testing**: Unit and integration tests
- 📝 **Documentation**: API docs and user guides

### Nice to Have
- 🌍 **Internationalization**: Multi-language support
- 🔌 **Integrations**: Calendar, email, CRM connections
- 🤖 **AI Features**: Resume optimization, job matching

## 📞 Getting Help

- **Technical Questions**: [GitHub Discussions](https://github.com/TheSolutionDeskAndCompany/AutoHired/discussions)
- **Bug Reports**: [GitHub Issues](https://github.com/TheSolutionDeskAndCompany/AutoHired/issues)
- **Business Questions**: [info@thesolutiondesk.ca](mailto:info@thesolutiondesk.ca)

## 🎆 Recognition

Contributors will be:
- Listed in our `CONTRIBUTORS.md` file
- Mentioned in release notes for significant contributions
- Credited on our website (with permission)
- Given priority access to the hosted service beta

We appreciate your contributions and look forward to building something amazing together! 🚀
