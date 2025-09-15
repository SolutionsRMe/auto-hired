import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { setupAuth, isAuthenticated } from "./replitAuth";
import { 
  insertResumeProfileSchema, 
  insertWorkExperienceSchema, 
  insertSkillSchema,
  insertJobListingSchema,
  insertApplicationSchema,
  insertUserPreferencesSchema
} from "@shared/schema";
import { z } from "zod";
import { requirePro } from "./middleware/requirePro";
import { stripeService } from "./stripe";

export async function registerRoutes(app: Express): Promise<Server> {
  // Auth middleware
  await setupAuth(app);

  // Auth routes
  app.get('/api/auth/user', isAuthenticated, async (req: any, res) => {
    try {
      const userId = req.user.claims.sub;
      const user = await storage.getUser(userId);
      res.json(user);
    } catch (error) {
      console.error("Error fetching user:", error);
      res.status(500).json({ message: "Failed to fetch user" });
    }
  });

  // Firebase user sync route (for when Firebase credentials are provided)
  app.post('/api/auth/sync-user', async (req, res) => {
    try {
      const { id, email, firstName, lastName, profileImageUrl } = req.body;
      
      if (!id) {
        return res.status(400).json({ message: "User ID is required" });
      }

      const userData = {
        id,
        email,
        firstName,
        lastName,
        profileImageUrl,
      };

      const user = await storage.upsertUser(userData);
      res.json(user);
    } catch (error) {
      console.error("Error syncing user:", error);
      res.status(500).json({ message: "Failed to sync user" });
    }
  });

  // Resume Profile routes
  app.get('/api/resume-profile', isAuthenticated, async (req: any, res) => {
    try {
      const userId = req.user.claims.sub;
      const profile = await storage.getResumeProfile(userId);
      res.json(profile);
    } catch (error) {
      console.error("Error fetching resume profile:", error);
      res.status(500).json({ message: "Failed to fetch resume profile" });
    }
  });

  app.post('/api/resume-profile', isAuthenticated, async (req: any, res) => {
    try {
      const userId = req.user.claims.sub;
      const profileData = insertResumeProfileSchema.parse({ ...req.body, userId });
      const profile = await storage.createResumeProfile(profileData);
      res.json(profile);
    } catch (error) {
      console.error("Error creating resume profile:", error);
      res.status(400).json({ message: "Failed to create resume profile" });
    }
  });

  app.put('/api/resume-profile/:id', isAuthenticated, async (req: any, res) => {
    try {
      const userId = req.user.claims.sub;
      const profileId = parseInt(req.params.id);
      const profileData = insertResumeProfileSchema.parse({ ...req.body, userId });
      const profile = await storage.updateResumeProfile(profileId, userId, profileData);
      res.json(profile);
    } catch (error) {
      console.error("Error updating resume profile:", error);
      res.status(400).json({ message: "Failed to update resume profile" });
    }
  });

  // Work Experience routes
  app.get('/api/work-experience/:profileId', isAuthenticated, async (req: any, res) => {
    try {
      const profileId = parseInt(req.params.profileId);
      const experiences = await storage.getWorkExperiences(profileId);
      res.json(experiences);
    } catch (error) {
      console.error("Error fetching work experiences:", error);
      res.status(500).json({ message: "Failed to fetch work experiences" });
    }
  });

  app.post('/api/work-experience', isAuthenticated, async (req: any, res) => {
    try {
      const experienceData = insertWorkExperienceSchema.parse(req.body);
      const experience = await storage.createWorkExperience(experienceData);
      res.json(experience);
    } catch (error) {
      console.error("Error creating work experience:", error);
      res.status(400).json({ message: "Failed to create work experience" });
    }
  });

  app.put('/api/work-experience/:id', isAuthenticated, async (req: any, res) => {
    try {
      const id = parseInt(req.params.id);
      const experienceData = insertWorkExperienceSchema.parse(req.body);
      const experience = await storage.updateWorkExperience(id, experienceData);
      res.json(experience);
    } catch (error) {
      console.error("Error updating work experience:", error);
      res.status(400).json({ message: "Failed to update work experience" });
    }
  });

  app.delete('/api/work-experience/:id', isAuthenticated, async (req: any, res) => {
    try {
      const id = parseInt(req.params.id);
      await storage.deleteWorkExperience(id);
      res.json({ success: true });
    } catch (error) {
      console.error("Error deleting work experience:", error);
      res.status(400).json({ message: "Failed to delete work experience" });
    }
  });

  // Skills routes
  app.get('/api/skills/:profileId', isAuthenticated, async (req: any, res) => {
    try {
      const profileId = parseInt(req.params.profileId);
      const skills = await storage.getSkills(profileId);
      res.json(skills);
    } catch (error) {
      console.error("Error fetching skills:", error);
      res.status(500).json({ message: "Failed to fetch skills" });
    }
  });

  app.post('/api/skills', isAuthenticated, async (req: any, res) => {
    try {
      const skillData = insertSkillSchema.parse(req.body);
      const skill = await storage.createSkill(skillData);
      res.json(skill);
    } catch (error) {
      console.error("Error creating skill:", error);
      res.status(400).json({ message: "Failed to create skill" });
    }
  });

  app.delete('/api/skills/:id', isAuthenticated, async (req: any, res) => {
    try {
      const id = parseInt(req.params.id);
      await storage.deleteSkill(id);
      res.json({ success: true });
    } catch (error) {
      console.error("Error deleting skill:", error);
      res.status(400).json({ message: "Failed to delete skill" });
    }
  });

  // Job Listings routes
  app.get('/api/jobs', async (req, res) => {
    try {
      const { page = 1, limit = 10, search, location, salaryMin, salaryMax, remote } = req.query;
      const filters = {
        search: search as string,
        location: location as string,
        salaryMin: salaryMin ? parseInt(salaryMin as string) : undefined,
        salaryMax: salaryMax ? parseInt(salaryMax as string) : undefined,
        remote: remote === 'true'
      };
      const jobs = await storage.getJobListings(parseInt(page as string), parseInt(limit as string), filters);
      res.json(jobs);
    } catch (error) {
      console.error("Error fetching job listings:", error);
      res.status(500).json({ message: "Failed to fetch job listings" });
    }
  });

  app.get('/api/jobs/:id', async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const job = await storage.getJobListing(id);
      if (!job) {
        return res.status(404).json({ message: "Job not found" });
      }
      res.json(job);
    } catch (error) {
      console.error("Error fetching job listing:", error);
      res.status(500).json({ message: "Failed to fetch job listing" });
    }
  });

  // Applications routes
  app.get('/api/applications', isAuthenticated, async (req: any, res) => {
    try {
      const userId = req.user.claims.sub;
      const { page = 1, limit = 10, status } = req.query;
      const applications = await storage.getApplications(userId, parseInt(page as string), parseInt(limit as string), status as string);
      res.json(applications);
    } catch (error) {
      console.error("Error fetching applications:", error);
      res.status(500).json({ message: "Failed to fetch applications" });
    }
  });

  app.get('/api/applications/stats', isAuthenticated, async (req: any, res) => {
    try {
      const userId = req.user.claims.sub;
      
      // Add some sample applications if none exist for demonstration
      const existingApps = await storage.getApplications(userId, 1, 10);
      if (existingApps.total === 0) {
        const sampleApplications = [
          {
            userId,
            jobTitle: "Frontend Developer",
            company: "TechCorp Inc",
            status: "applied",
            applicationDate: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000), // 5 days ago
            jobUrl: "https://example.com/job1",
            notes: "Applied through company website"
          },
          {
            userId,
            jobTitle: "React Developer",
            company: "StartupXYZ",
            status: "interview",
            applicationDate: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000), // 3 days ago
            jobUrl: "https://example.com/job2",
            notes: "Interview scheduled for next week"
          },
          {
            userId,
            jobTitle: "Full Stack Developer",
            company: "WebSolutions",
            status: "rejected",
            applicationDate: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000), // 10 days ago
            jobUrl: "https://example.com/job3",
            notes: "Not selected for this position"
          }
        ];
        
        for (const app of sampleApplications) {
          await storage.createApplication(app);
        }
      }
      
      const stats = await storage.getApplicationStats(userId);
      res.json(stats);
    } catch (error) {
      console.error("Error fetching application stats:", error);
      res.status(500).json({ message: "Failed to fetch application stats" });
    }
  });

  app.post('/api/applications', isAuthenticated, async (req: any, res) => {
    try {
      const userId = req.user.claims.sub;
      const applicationData = insertApplicationSchema.parse({ ...req.body, userId });
      const application = await storage.createApplication(applicationData);
      res.json(application);
    } catch (error) {
      console.error("Error creating application:", error);
      res.status(400).json({ message: "Failed to create application" });
    }
  });

  app.put('/api/applications/:id', isAuthenticated, async (req: any, res) => {
    try {
      const userId = req.user.claims.sub;
      const id = parseInt(req.params.id);
      const applicationData = req.body;
      const application = await storage.updateApplication(id, userId, applicationData);
      res.json(application);
    } catch (error) {
      console.error("Error updating application:", error);
      res.status(400).json({ message: "Failed to update application" });
    }
  });

  app.delete('/api/applications/:id', isAuthenticated, async (req: any, res) => {
    try {
      const userId = req.user.claims.sub;
      const id = parseInt(req.params.id);
      await storage.deleteApplication(id, userId);
      res.json({ success: true });
    } catch (error) {
      console.error("Error deleting application:", error);
      res.status(400).json({ message: "Failed to delete application" });
    }
  });

  // User Preferences routes
  app.get('/api/preferences', isAuthenticated, async (req: any, res) => {
    try {
      const userId = req.user.claims.sub;
      const preferences = await storage.getUserPreferences(userId);
      res.json(preferences);
    } catch (error) {
      console.error("Error fetching preferences:", error);
      res.status(500).json({ message: "Failed to fetch preferences" });
    }
  });

  app.post('/api/preferences', isAuthenticated, async (req: any, res) => {
    try {
      const userId = req.user.claims.sub;
      const preferencesData = insertUserPreferencesSchema.parse({ ...req.body, userId });
      const preferences = await storage.createUserPreferences(preferencesData);
      res.json(preferences);
    } catch (error) {
      console.error("Error creating preferences:", error);
      res.status(400).json({ message: "Failed to create preferences" });
    }
  });

  app.put('/api/preferences', isAuthenticated, async (req: any, res) => {
    try {
      const userId = req.user.claims.sub;
      const preferencesData = req.body;
      const preferences = await storage.updateUserPreferences(userId, preferencesData);
      res.json(preferences);
    } catch (error) {
      console.error("Error updating preferences:", error);
      res.status(400).json({ message: "Failed to update preferences" });
    }
  });

  // Quick Apply route
  app.post('/api/quick-apply', isAuthenticated, async (req: any, res) => {
    try {
      const userId = req.user.claims.sub;
      const { jobListingId } = req.body;
      
      // Create application with default status
      const applicationData = {
        userId,
        jobListingId: parseInt(jobListingId),
        status: 'applied',
        appliedDate: new Date(),
      };
      
      const application = await storage.createApplication(applicationData);
      res.json(application);
    } catch (error) {
      console.error("Error quick applying:", error);
      res.status(400).json({ message: "Failed to apply to job" });
    }
  });

  // Pro-only automation route (placeholder) - gated by requirePro
  app.post('/api/automation/run-pro', isAuthenticated, requirePro, async (req: any, res) => {
    // This is a placeholder endpoint demonstrating Pro gating
    // Replace with real automation handler logic
    res.json({ message: 'Automation job queued (Pro only feature)' });
  });

  // Initialize sample data
  app.post('/api/init-sample-data', isAuthenticated, async (req: any, res) => {
    try {
      // Create sample job listings
      const sampleJobs = [
        {
          title: "Frontend Developer",
          company: "TechCorp",
          location: "San Francisco, CA",
          type: "Full-time",
          remote: true,
          salary: "$90,000 - $120,000",
          description: "Build amazing user interfaces with React and TypeScript",
          requirements: "3+ years React experience, TypeScript, CSS",
          url: "https://example.com/job1"
        },
        {
          title: "Full Stack Engineer",
          company: "StartupXYZ",
          location: "New York, NY",
          type: "Full-time",
          remote: false,
          salary: "$100,000 - $130,000",
          description: "Work on both frontend and backend systems",
          requirements: "Node.js, React, PostgreSQL, 5+ years experience",
          url: "https://example.com/job2"
        },
        {
          title: "React Developer",
          company: "WebSolutions",
          location: "Remote",
          type: "Contract",
          remote: true,
          salary: "$75 - $85/hour",
          description: "Create responsive web applications using React",
          requirements: "React, JavaScript, HTML/CSS, 2+ years experience",
          url: "https://example.com/job3"
        },
        {
          title: "Software Engineer",
          company: "BigTech Inc",
          location: "Seattle, WA",
          type: "Full-time",
          remote: true,
          salary: "$130,000 - $160,000",
          description: "Develop scalable software solutions",
          requirements: "Computer Science degree, 4+ years experience",
          url: "https://example.com/job4"
        },
        {
          title: "UI/UX Developer",
          company: "DesignStudio",
          location: "Austin, TX",
          type: "Full-time",
          remote: false,
          salary: "$80,000 - $100,000",
          description: "Design and implement user interfaces",
          requirements: "Figma, HTML/CSS, JavaScript, design experience",
          url: "https://example.com/job5"
        }
      ];

      for (const job of sampleJobs) {
        await storage.createJobListing(job);
      }

      res.json({ message: "Sample data initialized successfully" });
    } catch (error) {
      console.error("Error initializing sample data:", error);
      res.status(500).json({ message: "Failed to initialize sample data" });
    }
  });

  // Stripe routes (toggle real vs mock based on PAYMENTS_ENABLED)
  app.post('/api/stripe/create-checkout-session', isAuthenticated, async (req: any, res) => {
    try {
      const { priceId, mode = 'subscription' } = req.body;
      const userId = req.user.claims.sub;
      const user = await storage.getUser(userId);

      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }

      const successUrl = `${req.protocol}://${req.get('host')}/subscription/success?session_id={CHECKOUT_SESSION_ID}`;
      const cancelUrl = `${req.protocol}://${req.get('host')}/premium-purchase`;

      const paymentsEnabled = process.env.PAYMENTS_ENABLED === 'true';
      if (paymentsEnabled) {
        const customer = await stripeService.createOrRetrieveCustomer(userId, user.email ?? '', `${user.firstName ?? ''} ${user.lastName ?? ''}`.trim());
        const session = await stripeService.createCheckoutSession({
          priceId,
          userId,
          userEmail: user.email ?? '',
          successUrl,
          cancelUrl,
          mode,
        });

        return res.json({ sessionId: session.id, url: session.url });
      }

      // Mock (dev)
      const mockSession = {
        id: 'cs_mock_session_id',
        url: `${req.protocol}://${req.get('host')}/subscription/success?mock=true`,
      };

      res.json({ 
        sessionId: mockSession.id, 
        url: mockSession.url,
        message: 'Mock Stripe session (payments not enabled)'
      });
    } catch (error) {
      console.error('Error creating checkout session:', error);
      res.status(500).json({ message: 'Failed to create checkout session' });
    }
  });

  app.post('/api/stripe/create-portal-session', isAuthenticated, async (req: any, res) => {
    try {
      const userId = req.user.claims.sub;
      const user = await storage.getUser(userId);

      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }

      const returnUrl = `${req.protocol}://${req.get('host')}/profile`;
      const paymentsEnabled = process.env.PAYMENTS_ENABLED === 'true';

      if (paymentsEnabled) {
        const customer = await stripeService.createOrRetrieveCustomer(userId, user.email ?? '', `${user.firstName ?? ''} ${user.lastName ?? ''}`.trim());
        const portal = await stripeService.createPortalSession({ customerId: customer.id, returnUrl });
        return res.json({ url: portal.url });
      }

      // Mock (dev)
      const mockPortalUrl = `${req.protocol}://${req.get('host')}/profile?portal=true`;

      res.json({ 
        url: mockPortalUrl,
        message: 'Mock customer portal (payments not enabled)'
      });
    } catch (error) {
      console.error('Error creating portal session:', error);
      res.status(500).json({ message: 'Failed to create portal session' });
    }
  });

  app.get('/api/stripe/subscription-status', isAuthenticated, async (req: any, res) => {
    try {
      const userId = req.user.claims.sub;
      const user = await storage.getUser(userId);

      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }

      const paymentsEnabled = process.env.PAYMENTS_ENABLED === 'true';
      if (paymentsEnabled) {
        // Attempt to find or create customer and return active status
        const customer = await stripeService.createOrRetrieveCustomer(userId, user.email ?? '', `${user.firstName ?? ''} ${user.lastName ?? ''}`.trim());
        const subscriptions = await stripeService.getCustomerSubscriptions(customer.id);
        const hasActiveSubscription = subscriptions.some(s => s.status === 'active' || s.status === 'trialing');
        return res.json({ hasActiveSubscription, subscriptions });
      }

      // Mock (dev)
      res.json({
        hasActiveSubscription: false,
        subscriptions: [],
        message: 'Mock subscription status (payments not enabled)'
      });
    } catch (error) {
      console.error('Error fetching subscription status:', error);
      res.status(500).json({ message: 'Failed to fetch subscription status' });
    }
  });

  app.post('/api/stripe/webhook', async (req, res) => {
    try {
      // Note: Stripe webhook handling is stubbed for development
      // In production, this would handle actual Stripe events
      console.log('Stripe webhook received (mock):', req.body);
      res.json({ received: true, message: 'Mock webhook handler' });
    } catch (error) {
      console.error('Error handling Stripe webhook:', error);
      res.status(400).json({ message: 'Webhook handler failed' });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
