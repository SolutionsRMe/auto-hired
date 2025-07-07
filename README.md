# AutoHired - Job Application Automation Platform

A comprehensive job application automation platform that empowers job seekers with advanced tracking, AI-powered tools, and an intuitive user interface for streamlining the job search process.

## Features

### Lite Version (Free)
- ✅ Resume Builder
- ✅ Application Tracking
- ✅ Basic Job Search
- ✅ Profile Management

### Premium Version
- 🚀 AI Resume Optimization
- 🚀 Automated Applications
- 🚀 Advanced Analytics
- 🚀 Premium Templates
- 🚀 Priority Support

## Badges

![Build Status](https://img.shields.io/badge/build-passing-brightgreen)
![License](https://img.shields.io/badge/license-MIT-blue)
![Last Commit](https://img.shields.io/badge/last_commit-July_2025-orange)

## Visuals

![AutoHired UI](https://via.placeholder.com/800x400.png?text=AutoHired+UI+Screenshot)

## Tech Stack

- **Frontend**: React 18 + TypeScript with Vite
- **Backend**: Express.js with TypeScript
- **Database**: PostgreSQL with Drizzle ORM
- **Authentication**: Replit OAuth integration
- **UI**: shadcn/ui components with Tailwind CSS
- **State Management**: TanStack Query

## Development Setup

1. Clone the repository
2. Install dependencies: `npm install`
3. Set up environment variables:
   - `DATABASE_URL` - PostgreSQL connection string
   - `SESSION_SECRET` - Session encryption key
   - `REPL_ID` - Replit app ID
   - `REPLIT_DOMAINS` - Authorized domains
4. Push database schema: `npm run db:push`
5. Start development server: `npm run dev`

## Deployment

### GitHub Pages
This project is configured for GitHub Pages deployment with GitHub Actions.

1. Push to main branch
2. GitHub Actions will automatically build and deploy
3. Access your deployed app at: `https://yourusername.github.io/AutoHired/`

### Manual Deployment
1. Build the project: `npm run build`
2. Deploy the `dist/public` folder to your hosting provider

## License

MIT License - see LICENSE file for details

## Contact

For support, email: info@thesolutiondesk.ca