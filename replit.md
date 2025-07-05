# AutoHired - Job Application Automation Tool

## Overview

AutoHired is a cross-platform job application automation tool designed to streamline the job search process. The application features a master resume builder, automated job scraping, tailored resume/cover letter generation, and comprehensive application tracking. This is the "Lite" version with core functionality, built as a full-stack web application with plans for mobile responsiveness and PWA capabilities.

## System Architecture

### Technology Stack
- **Frontend**: React 18 + TypeScript with Vite build system
- **Backend**: Express.js with TypeScript 
- **Database**: PostgreSQL with Drizzle ORM
- **Authentication**: Replit OAuth integration
- **UI Framework**: shadcn/ui components with Tailwind CSS
- **State Management**: TanStack Query for server state
- **Mobile Support**: Responsive design with mobile-first navigation

### Architecture Pattern
The application follows a monorepo structure with clear separation between client and server code:
- **Client**: React SPA in `/client` directory
- **Server**: Express REST API in `/server` directory  
- **Shared**: Common schemas and types in `/shared` directory

## Key Components

### Authentication System
- **Replit OAuth Integration**: Leverages Replit's built-in authentication
- **Session Management**: PostgreSQL-backed sessions with connect-pg-simple
- **User Context**: React hooks for authentication state management

### Database Schema (Drizzle ORM)
- **Users**: Core user profiles from OAuth
- **Resume Profiles**: Master resume data storage
- **Work Experiences**: Employment history with rich descriptions
- **Skills**: Categorized skill sets (technical, soft skills, etc.)
- **Job Listings**: Scraped job data with matching metadata
- **Applications**: Application tracking with status management
- **User Preferences**: Customizable settings and goals

### Frontend Architecture
- **Component Structure**: Modular UI components using shadcn/ui
- **Responsive Design**: Mobile-first with desktop sidebar and mobile bottom navigation
- **Page Organization**: Dashboard, Resume Builder, Job Search, Applications, Profile
- **State Management**: TanStack Query for API calls and caching

### Backend API Structure
- **RESTful Endpoints**: Organized by feature (resume, jobs, applications)
- **Middleware**: Authentication, logging, error handling
- **Database Layer**: Abstracted storage interface for clean separation

## Data Flow

### Resume Building Flow
1. User uploads existing documents (planned OCR integration)
2. Manual entry of personal info, work experience, and skills
3. Data stored in normalized database structure
4. Master resume profile serves as foundation for tailored applications

### Job Search Flow
1. Users set search criteria and preferences
2. Job scraping system (to be implemented) fetches listings
3. Listings stored with metadata for matching algorithms
4. Users can filter, search, and view job opportunities

### Application Flow
1. User selects job listing for application
2. System generates tailored resume/cover letter from master profile
3. Application tracked with status, documents, and follow-up info
4. Analytics and reporting on application success rates

## External Dependencies

### Core Dependencies
- **@neondatabase/serverless**: PostgreSQL connection for Neon DB
- **@radix-ui**: Comprehensive UI primitive components
- **@tanstack/react-query**: Server state management and caching
- **drizzle-orm**: Type-safe database ORM with migrations
- **express**: Node.js web framework for API server
- **wouter**: Lightweight routing for React SPA

### Development Dependencies
- **TypeScript**: Type safety across the stack
- **Vite**: Fast build tool with HMR for development
- **Tailwind CSS**: Utility-first CSS framework
- **ESBuild**: Fast bundling for production builds

## Deployment Strategy

### Development Environment
- **Replit Integration**: Optimized for Replit development environment
- **Hot Module Replacement**: Vite-powered fast refresh during development
- **Database**: Neon PostgreSQL for managed database hosting

### Production Build
- **Client Build**: Vite builds static assets to `/dist/public`
- **Server Build**: ESBuild bundles Express server to `/dist/index.js`
- **Environment Variables**: Database URL and session secrets required

### Scalability Considerations
- **Database**: PostgreSQL with connection pooling via Neon
- **Session Storage**: Database-backed sessions for horizontal scaling
- **API Design**: RESTful with potential for GraphQL migration
- **Caching**: Client-side caching with TanStack Query

## Changelog

```
Changelog:
- July 05, 2025. Initial setup
- July 05, 2025. Fixed all major functionality issues:
  * Fixed SelectItem crash errors in forms
  * Added sample job data for testing
  * Made all buttons functional with appropriate actions
  * Restructured features for lite vs premium distinction
  * Removed non-functional features from lite version
  * Fixed notification icon positioning
  * Clarified premium features with informative dialogs
- July 05, 2025. Streamlined premium upgrade experience:
  * Removed all "View Premium" and "Learn More" informational buttons
  * Replaced with direct "Try Premium" buttons linking to purchase page
  * Created comprehensive premium purchase page with feature comparison
  * Updated landing page to showcase all options before login
  * Simplified user journey from lite features to premium upgrade
```

## User Preferences

```
Preferred communication style: Simple, everyday language.
```