import {
  pgTable,
  text,
  varchar,
  timestamp,
  jsonb,
  index,
  serial,
  integer,
  date,
  boolean,
  decimal,
} from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";
import { relations } from "drizzle-orm";

// Session storage table (required for Replit Auth)
export const sessions = pgTable(
  "sessions",
  {
    sid: varchar("sid").primaryKey(),
    sess: jsonb("sess").notNull(),
    expire: timestamp("expire").notNull(),
  },
  (table) => [index("IDX_session_expire").on(table.expire)],
);

// User storage table (required for Replit Auth)
export const users = pgTable("users", {
  id: varchar("id").primaryKey().notNull(),
  email: varchar("email").unique(),
  firstName: varchar("first_name"),
  lastName: varchar("last_name"),
  profileImageUrl: varchar("profile_image_url"),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

// Resume profiles table
export const resumeProfiles = pgTable("resume_profiles", {
  id: serial("id").primaryKey(),
  userId: varchar("user_id").notNull().references(() => users.id, { onDelete: "cascade" }),
  name: varchar("name").notNull(),
  email: varchar("email").notNull(),
  phone: varchar("phone"),
  location: varchar("location"),
  summary: text("summary"),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

// Work experience table
export const workExperiences = pgTable("work_experiences", {
  id: serial("id").primaryKey(),
  resumeProfileId: integer("resume_profile_id").notNull().references(() => resumeProfiles.id, { onDelete: "cascade" }),
  title: varchar("title").notNull(),
  company: varchar("company").notNull(),
  startDate: date("start_date").notNull(),
  endDate: date("end_date"),
  description: text("description"),
  createdAt: timestamp("created_at").defaultNow(),
});

// Skills table
export const skills = pgTable("skills", {
  id: serial("id").primaryKey(),
  resumeProfileId: integer("resume_profile_id").notNull().references(() => resumeProfiles.id, { onDelete: "cascade" }),
  name: varchar("name").notNull(),
  category: varchar("category").notNull(), // 'technical', 'soft', 'certification'
  createdAt: timestamp("created_at").defaultNow(),
});

// Job listings table
export const jobListings = pgTable("job_listings", {
  id: serial("id").primaryKey(),
  title: varchar("title").notNull(),
  company: varchar("company").notNull(),
  location: varchar("location"),
  type: varchar("type"), // 'full-time', 'part-time', 'contract', etc.
  salaryMin: integer("salary_min"),
  salaryMax: integer("salary_max"),
  description: text("description"),
  requirements: text("requirements"),
  benefits: text("benefits"),
  remote: boolean("remote").default(false),
  posted: timestamp("posted").defaultNow(),
  externalId: varchar("external_id"), // for scraped jobs
  sourceUrl: varchar("source_url"),
  createdAt: timestamp("created_at").defaultNow(),
});

// Job skills junction table
export const jobSkills = pgTable("job_skills", {
  id: serial("id").primaryKey(),
  jobListingId: integer("job_listing_id").notNull().references(() => jobListings.id, { onDelete: "cascade" }),
  skillName: varchar("skill_name").notNull(),
});

// Applications table
export const applications = pgTable("applications", {
  id: serial("id").primaryKey(),
  userId: varchar("user_id").notNull().references(() => users.id, { onDelete: "cascade" }),
  jobListingId: integer("job_listing_id").references(() => jobListings.id, { onDelete: "set null" }),
  status: varchar("status").notNull().default("applied"), // 'applied', 'interview', 'offer', 'rejected'
  appliedDate: timestamp("applied_date").defaultNow(),
  interviewDate: timestamp("interview_date"),
  followUpDate: timestamp("follow_up_date"),
  notes: text("notes"),
  resumeVersion: text("resume_version"), // JSON string of resume used
  coverLetter: text("cover_letter"),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

// User preferences table
export const userPreferences = pgTable("user_preferences", {
  id: serial("id").primaryKey(),
  userId: varchar("user_id").notNull().references(() => users.id, { onDelete: "cascade" }).unique(),
  jobTitle: varchar("job_title"),
  preferredLocation: varchar("preferred_location"),
  minSalary: integer("min_salary"),
  workType: varchar("work_type"), // 'remote', 'hybrid', 'onsite', 'any'
  dailyGoal: integer("daily_goal").default(5),
  weeklyGoal: integer("weekly_goal").default(20),
  monthlyGoal: integer("monthly_goal").default(80),
  emailSummary: boolean("email_summary").default(true),
  jobAlerts: boolean("job_alerts").default(true),
  reminders: boolean("reminders").default(false),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

// Relations
export const usersRelations = relations(users, ({ one, many }) => ({
  resumeProfile: one(resumeProfiles),
  applications: many(applications),
  preferences: one(userPreferences),
}));

export const resumeProfilesRelations = relations(resumeProfiles, ({ one, many }) => ({
  user: one(users, {
    fields: [resumeProfiles.userId],
    references: [users.id],
  }),
  workExperiences: many(workExperiences),
  skills: many(skills),
}));

export const workExperiencesRelations = relations(workExperiences, ({ one }) => ({
  resumeProfile: one(resumeProfiles, {
    fields: [workExperiences.resumeProfileId],
    references: [resumeProfiles.id],
  }),
}));

export const skillsRelations = relations(skills, ({ one }) => ({
  resumeProfile: one(resumeProfiles, {
    fields: [skills.resumeProfileId],
    references: [resumeProfiles.id],
  }),
}));

export const jobListingsRelations = relations(jobListings, ({ many }) => ({
  applications: many(applications),
  skills: many(jobSkills),
}));

export const applicationsRelations = relations(applications, ({ one }) => ({
  user: one(users, {
    fields: [applications.userId],
    references: [users.id],
  }),
  jobListing: one(jobListings, {
    fields: [applications.jobListingId],
    references: [jobListings.id],
  }),
}));

export const userPreferencesRelations = relations(userPreferences, ({ one }) => ({
  user: one(users, {
    fields: [userPreferences.userId],
    references: [users.id],
  }),
}));

// Schema types
export type UpsertUser = typeof users.$inferInsert;
export type User = typeof users.$inferSelect;

export const insertResumeProfileSchema = createInsertSchema(resumeProfiles).omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});
export type InsertResumeProfile = z.infer<typeof insertResumeProfileSchema>;
export type ResumeProfile = typeof resumeProfiles.$inferSelect;

export const insertWorkExperienceSchema = createInsertSchema(workExperiences).omit({
  id: true,
  createdAt: true,
});
export type InsertWorkExperience = z.infer<typeof insertWorkExperienceSchema>;
export type WorkExperience = typeof workExperiences.$inferSelect;

export const insertSkillSchema = createInsertSchema(skills).omit({
  id: true,
  createdAt: true,
});
export type InsertSkill = z.infer<typeof insertSkillSchema>;
export type Skill = typeof skills.$inferSelect;

export const insertJobListingSchema = createInsertSchema(jobListings).omit({
  id: true,
  createdAt: true,
});
export type InsertJobListing = z.infer<typeof insertJobListingSchema>;
export type JobListing = typeof jobListings.$inferSelect;

export const insertApplicationSchema = createInsertSchema(applications).omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});
export type InsertApplication = z.infer<typeof insertApplicationSchema>;
export type Application = typeof applications.$inferSelect;

export const insertUserPreferencesSchema = createInsertSchema(userPreferences).omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});
export type InsertUserPreferences = z.infer<typeof insertUserPreferencesSchema>;
export type UserPreferences = typeof userPreferences.$inferSelect;
