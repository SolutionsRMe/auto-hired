import {
  users,
  resumeProfiles,
  workExperiences,
  skills,
  jobListings,
  jobSkills,
  applications,
  userPreferences,
  type User,
  type UpsertUser,
  type ResumeProfile,
  type InsertResumeProfile,
  type WorkExperience,
  type InsertWorkExperience,
  type Skill,
  type InsertSkill,
  type JobListing,
  type InsertJobListing,
  type Application,
  type InsertApplication,
  type UserPreferences,
  type InsertUserPreferences,
} from "@shared/schema";
import { db } from "./db";
import { eq, and, or, desc, asc, ilike, gte, lte, count, sql } from "drizzle-orm";

// Interface for storage operations
export interface IStorage {
  // User operations (mandatory for Replit Auth)
  getUser(id: string): Promise<User | undefined>;
  upsertUser(user: UpsertUser): Promise<User>;
  updateUser(id: string, data: Partial<UpsertUser>): Promise<User | undefined>;
  updateUserByCustomerId(customerId: string, data: Partial<UpsertUser>): Promise<User | undefined>;

  // Resume Profile operations
  getResumeProfile(userId: string): Promise<ResumeProfile | undefined>;
  createResumeProfile(profile: InsertResumeProfile): Promise<ResumeProfile>;
  updateResumeProfile(id: number, userId: string, profile: Partial<InsertResumeProfile>): Promise<ResumeProfile>;

  // Work Experience operations
  getWorkExperiences(resumeProfileId: number): Promise<WorkExperience[]>;
  createWorkExperience(experience: InsertWorkExperience): Promise<WorkExperience>;
  updateWorkExperience(id: number, experience: Partial<InsertWorkExperience>): Promise<WorkExperience>;
  deleteWorkExperience(id: number): Promise<void>;

  // Skills operations
  getSkills(resumeProfileId: number): Promise<Skill[]>;
  createSkill(skill: InsertSkill): Promise<Skill>;
  deleteSkill(id: number): Promise<void>;

  // Job Listings operations
  getJobListings(page: number, limit: number, filters?: any): Promise<{ data: JobListing[]; total: number }>;
  getJobListing(id: number): Promise<JobListing | undefined>;
  createJobListing(job: InsertJobListing): Promise<JobListing>;

  // Applications operations
  getApplications(userId: string, page: number, limit: number, status?: string): Promise<{ data: any[]; total: number }>;
  getApplicationStats(userId: string): Promise<any>;
  createApplication(application: InsertApplication): Promise<Application>;
  updateApplication(id: number, userId: string, data: Partial<Application>): Promise<Application>;
  deleteApplication(id: number, userId: string): Promise<void>;

  // User Preferences operations
  getUserPreferences(userId: string): Promise<UserPreferences | undefined>;
  createUserPreferences(preferences: InsertUserPreferences): Promise<UserPreferences>;
  updateUserPreferences(userId: string, preferences: Partial<InsertUserPreferences>): Promise<UserPreferences>;
}

export class DatabaseStorage implements IStorage {
  // User operations (mandatory for Replit Auth)
  async getUser(id: string): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.id, id));
    return user;
  }

  async upsertUser(userData: UpsertUser): Promise<User> {
    const [user] = await db
      .insert(users)
      .values(userData)
      .onConflictDoUpdate({
        target: users.id,
        set: {
          ...userData,
          updatedAt: new Date(),
        },
      })
      .returning();
    return user;
  }

  async updateUser(id: string, data: Partial<UpsertUser>): Promise<User | undefined> {
    const [updated] = await db
      .update(users)
      .set({ ...data, updatedAt: new Date() })
      .where(eq(users.id, id))
      .returning();
    return updated;
  }

  async updateUserByCustomerId(customerId: string, data: Partial<UpsertUser>): Promise<User | undefined> {
    if (!customerId) {
      return undefined;
    }

    const [updated] = await db
      .update(users)
      .set({ ...data, updatedAt: new Date() })
      .where(eq(users.stripeCustomerId, customerId))
      .returning();
    return updated;
  }

  // Resume Profile operations
  async getResumeProfile(userId: string): Promise<ResumeProfile | undefined> {
    const [profile] = await db
      .select()
      .from(resumeProfiles)
      .where(eq(resumeProfiles.userId, userId));
    return profile;
  }

  async createResumeProfile(profile: InsertResumeProfile): Promise<ResumeProfile> {
    const [created] = await db
      .insert(resumeProfiles)
      .values(profile)
      .returning();
    return created;
  }

  async updateResumeProfile(id: number, userId: string, profile: Partial<InsertResumeProfile>): Promise<ResumeProfile> {
    const [updated] = await db
      .update(resumeProfiles)
      .set({ ...profile, updatedAt: new Date() })
      .where(and(eq(resumeProfiles.id, id), eq(resumeProfiles.userId, userId)))
      .returning();
    return updated;
  }

  // Work Experience operations
  async getWorkExperiences(resumeProfileId: number): Promise<WorkExperience[]> {
    return await db
      .select()
      .from(workExperiences)
      .where(eq(workExperiences.resumeProfileId, resumeProfileId))
      .orderBy(desc(workExperiences.startDate));
  }

  async createWorkExperience(experience: InsertWorkExperience): Promise<WorkExperience> {
    const [created] = await db
      .insert(workExperiences)
      .values(experience)
      .returning();
    return created;
  }

  async updateWorkExperience(id: number, experience: Partial<InsertWorkExperience>): Promise<WorkExperience> {
    const [updated] = await db
      .update(workExperiences)
      .set(experience)
      .where(eq(workExperiences.id, id))
      .returning();
    return updated;
  }

  async deleteWorkExperience(id: number): Promise<void> {
    await db.delete(workExperiences).where(eq(workExperiences.id, id));
  }

  // Skills operations
  async getSkills(resumeProfileId: number): Promise<Skill[]> {
    return await db
      .select()
      .from(skills)
      .where(eq(skills.resumeProfileId, resumeProfileId))
      .orderBy(asc(skills.category), asc(skills.name));
  }

  async createSkill(skill: InsertSkill): Promise<Skill> {
    const [created] = await db
      .insert(skills)
      .values(skill)
      .returning();
    return created;
  }

  async deleteSkill(id: number): Promise<void> {
    await db.delete(skills).where(eq(skills.id, id));
  }

  // Job Listings operations
  async getJobListings(page: number, limit: number, filters: any = {}): Promise<{ data: JobListing[]; total: number }> {
    let query = db.select().from(jobListings);
    let countQuery = db.select({ count: count() }).from(jobListings);

    const conditions = [];

    if (filters.search) {
      const searchCondition = or(
        ilike(jobListings.title, `%${filters.search}%`),
        ilike(jobListings.company, `%${filters.search}%`),
        ilike(jobListings.description, `%${filters.search}%`)
      );
      conditions.push(searchCondition);
    }

    if (filters.location) {
      conditions.push(ilike(jobListings.location, `%${filters.location}%`));
    }

    if (filters.salaryMin) {
      conditions.push(gte(jobListings.salaryMin, filters.salaryMin));
    }

    if (filters.salaryMax) {
      conditions.push(lte(jobListings.salaryMax, filters.salaryMax));
    }

    if (filters.remote) {
      conditions.push(eq(jobListings.remote, true));
    }

    if (conditions.length > 0) {
      const whereCondition = and(...conditions);
      query = query.where(whereCondition);
      countQuery = countQuery.where(whereCondition);
    }

    const [data, totalResult] = await Promise.all([
      query
        .orderBy(desc(jobListings.posted))
        .limit(limit)
        .offset((page - 1) * limit),
      countQuery
    ]);

    return {
      data,
      total: totalResult[0].count
    };
  }

  async getJobListing(id: number): Promise<JobListing | undefined> {
    const [job] = await db
      .select()
      .from(jobListings)
      .where(eq(jobListings.id, id));
    return job;
  }

  async createJobListing(job: InsertJobListing): Promise<JobListing> {
    const [created] = await db
      .insert(jobListings)
      .values(job)
      .returning();
    return created;
  }

  // Applications operations
  async getApplications(userId: string, page: number, limit: number, status?: string): Promise<{ data: any[]; total: number }> {
    let query = db
      .select({
        id: applications.id,
        status: applications.status,
        appliedDate: applications.appliedDate,
        interviewDate: applications.interviewDate,
        followUpDate: applications.followUpDate,
        notes: applications.notes,
        createdAt: applications.createdAt,
        jobListing: {
          id: jobListings.id,
          title: jobListings.title,
          company: jobListings.company,
          location: jobListings.location,
          salaryMin: jobListings.salaryMin,
          salaryMax: jobListings.salaryMax,
        }
      })
      .from(applications)
      .leftJoin(jobListings, eq(applications.jobListingId, jobListings.id))
      .where(eq(applications.userId, userId));

    let countQuery = db
      .select({ count: count() })
      .from(applications)
      .where(eq(applications.userId, userId));

    if (status) {
      query = query.where(and(eq(applications.userId, userId), eq(applications.status, status)));
      countQuery = countQuery.where(and(eq(applications.userId, userId), eq(applications.status, status)));
    }

    const [data, totalResult] = await Promise.all([
      query
        .orderBy(desc(applications.appliedDate))
        .limit(limit)
        .offset((page - 1) * limit),
      countQuery
    ]);

    return {
      data,
      total: totalResult[0].count
    };
  }

  async getApplicationStats(userId: string): Promise<any> {
    const stats = await db
      .select({
        status: applications.status,
        count: count()
      })
      .from(applications)
      .where(eq(applications.userId, userId))
      .groupBy(applications.status);

    // Calculate this week's applications
    const weekStart = new Date();
    weekStart.setDate(weekStart.getDate() - 7);
    
    const [thisWeekResult] = await db
      .select({ count: count() })
      .from(applications)
      .where(
        and(
          eq(applications.userId, userId),
          gte(applications.appliedDate, weekStart)
        )
      );

    const statusCounts = stats.reduce((acc, stat) => {
      acc[stat.status] = stat.count;
      return acc;
    }, {} as Record<string, number>);

    const total = stats.reduce((sum, stat) => sum + stat.count, 0);
    const interviews = statusCounts.interview || 0;
    const responseRate = total > 0 ? ((interviews + (statusCounts.offer || 0)) / total * 100).toFixed(1) : "0.0";

    return {
      total,
      thisWeek: thisWeekResult.count,
      interviews,
      offers: statusCounts.offer || 0,
      rejected: statusCounts.rejected || 0,
      pending: statusCounts.applied || 0,
      responseRate: parseFloat(responseRate),
      weeklyGoal: 20, // This could come from user preferences
      weeklyProgress: thisWeekResult.count,
    };
  }

  async createApplication(application: InsertApplication): Promise<Application> {
    const [created] = await db
      .insert(applications)
      .values(application)
      .returning();
    return created;
  }

  async updateApplication(id: number, userId: string, data: Partial<Application>): Promise<Application> {
    const [updated] = await db
      .update(applications)
      .set({ ...data, updatedAt: new Date() })
      .where(and(eq(applications.id, id), eq(applications.userId, userId)))
      .returning();
    return updated;
  }

  async deleteApplication(id: number, userId: string): Promise<void> {
    await db
      .delete(applications)
      .where(and(eq(applications.id, id), eq(applications.userId, userId)));
  }

  // User Preferences operations
  async getUserPreferences(userId: string): Promise<UserPreferences | undefined> {
    const [preferences] = await db
      .select()
      .from(userPreferences)
      .where(eq(userPreferences.userId, userId));
    return preferences;
  }

  async createUserPreferences(preferences: InsertUserPreferences): Promise<UserPreferences> {
    const [created] = await db
      .insert(userPreferences)
      .values(preferences)
      .returning();
    return created;
  }

  async updateUserPreferences(userId: string, preferences: Partial<InsertUserPreferences>): Promise<UserPreferences> {
    const [updated] = await db
      .update(userPreferences)
      .set({ ...preferences, updatedAt: new Date() })
      .where(eq(userPreferences.userId, userId))
      .returning();
    return updated;
  }
}

export const storage = new DatabaseStorage();
