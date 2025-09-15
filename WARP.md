# WARP.md

This file provides guidance to WARP (warp.dev) when working with code in this repository.

## AutoHired - Job Application Automation Platform

AutoHired is a comprehensive job application automation platform that helps job seekers streamline their application process with AI-powered tools and tracking features.

## Common Development Commands

### Getting Started
```powershell
# Install dependencies
npm install

# Set up environment variables (copy from .env.example)
# Required: DATABASE_URL, SESSION_SECRET, Firebase credentials

# Push database schema to PostgreSQL
npm run db:push

# Start development server (runs both client and server)
npm run dev
```

### Development Workflow
```powershell
# Build for production
npm run build

# Start production server
npm run start

# Type checking
npm run check

# Database operations
npm run db:push    # Push schema changes to database
```

### Testing and Debugging
```powershell
# Run in development mode with hot reload
npm run dev

# Check TypeScript types
npm run check
```

## Architecture Overview

### Technology Stack
- **Frontend**: React 18 + TypeScript with Vite build system
- **Backend**: Express.js with TypeScript REST API
- **Database**: PostgreSQL with Drizzle ORM
- **Authentication**: Firebase Authentication (Google Sign-In)
- **UI Framework**: shadcn/ui components with Tailwind CSS
- **State Management**: TanStack Query for server state management
- **Routing**: Wouter for lightweight client-side routing

### Project Structure
```
├── packages/
│   └── server/           # Backend Express API
│       ├── index.ts      # Server entry point
│       ├── routes.ts     # API routes definition
│       ├── storage.ts    # Database operations layer
│       ├── db.ts         # Database connection
│       └── vite.ts       # Vite integration
├── src/                  # Frontend React application
│   ├── App.tsx          # Main app component with routing
│   ├── pages/           # Page components
│   ├── components/      # Reusable UI components
│   ├── hooks/           # Custom React hooks
│   └── lib/             # Utilities and configurations
├── shared/              # Shared types and schemas
├── package.json         # Dependencies and scripts
├── drizzle.config.ts    # Database configuration
├── vite.config.ts       # Build configuration
└── tailwind.config.ts   # Styling configuration
```

### Core Architecture Patterns

**Monorepo Structure**: Single repository containing both client and server code with shared schemas and types.

**Database Layer Abstraction**: The `IStorage` interface in `packages/server/storage.ts` provides a clean abstraction over database operations, making it easy to swap database implementations.

**Authentication Flow**: 
- Frontend uses Firebase Authentication for Google Sign-In
- Backend validates Firebase tokens and manages user sessions
- User data is synchronized between Firebase and PostgreSQL

**API Design**: RESTful endpoints organized by feature (resume, jobs, applications) with consistent error handling and authentication middleware.

**State Management**: TanStack Query handles all server state, caching, and synchronization between client and server.

## Database Schema

The application uses Drizzle ORM with PostgreSQL. Key entities include:

- **Users**: Core user profiles from Firebase authentication
- **Resume Profiles**: Master resume data with personal information
- **Work Experiences**: Employment history with detailed descriptions
- **Skills**: Categorized skill sets (technical, soft skills, etc.)
- **Job Listings**: Job postings with metadata for matching
- **Applications**: Application tracking with status management
- **User Preferences**: Customizable settings and application goals

## Key Components and Features

### Authentication System
- Firebase Google Sign-In integration
- Session management with database-backed sessions
- Protected routes and API endpoints with `isAuthenticated` middleware

### Frontend Architecture
- **Responsive Design**: Mobile-first with desktop sidebar and mobile bottom navigation
- **Component Structure**: Modular UI components using shadcn/ui design system
- **Page Organization**: Dashboard, Resume Builder, Job Search, Applications, Profile
- **Theme**: Dark mode with Royal Indigo (#1E1B4B), Electric Teal (#00C2A8), and Vibrant Coral (#FF6B6B) color palette

### Backend API Structure
- **RESTful Endpoints**: Organized by feature with consistent naming
- **Middleware Stack**: Authentication, logging, and error handling
- **Database Operations**: Abstracted through storage interface for clean separation

## Development Guidelines

### Code Organization
- Keep shared types and schemas in the `shared/` directory
- Use TypeScript strictly throughout the codebase
- Follow the existing component structure for new UI components
- Implement database operations through the storage interface

### API Development
- All protected endpoints must use `isAuthenticated` middleware
- Follow RESTful conventions for new endpoints
- Validate request data using Zod schemas from shared directory
- Handle errors consistently with appropriate HTTP status codes

### Frontend Development
- Use TanStack Query for all server state management
- Implement responsive design following mobile-first approach
- Follow the existing routing structure in `App.tsx`
- Use shadcn/ui components and maintain design system consistency

### Database Changes
- Define schema changes in shared directory
- Use Drizzle ORM migrations for schema updates
- Run `npm run db:push` to apply schema changes
- Update storage interface when adding new database operations

## Environment Variables

Required environment variables:
```
DATABASE_URL=postgresql://...          # PostgreSQL connection string
SESSION_SECRET=your-secret-key         # Session encryption key
VITE_FIREBASE_API_KEY=your-api-key    # Firebase configuration
VITE_FIREBASE_AUTH_DOMAIN=...         # Firebase auth domain
VITE_FIREBASE_PROJECT_ID=...          # Firebase project ID
```

## Deployment Architecture

### Development
- Vite dev server with HMR for fast development
- Express server runs alongside with middleware integration
- PostgreSQL database (typically Neon for cloud development)

### Production
- Client builds to static assets in `dist/public`
- Server bundles to `dist/index.js` using ESBuild
- Serves on port 5000 (both API and static assets)
- Uses database-backed sessions for scalability

## Key Features Implementation

### Resume Builder Flow
1. Users create master resume profile with personal information
2. Work experiences and skills are stored in normalized database structure
3. Master profile serves as foundation for tailored job applications

### Job Search and Application Flow  
1. Job listings are stored with metadata for matching algorithms
2. Users can filter and search opportunities
3. Quick apply functionality creates application records
4. Application tracking with status updates and analytics

### Premium Features Architecture
- Lite version provides core functionality for free
- Premium features are gated behind subscription checks
- Clean separation between lite and premium functionality in codebase