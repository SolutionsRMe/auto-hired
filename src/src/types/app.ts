export type Plan = 'free' | 'pro' | 'pwyw';

export interface Me {
  id: string;
  email?: string;
  firstName?: string | null;
  lastName?: string | null;
  plan: Plan;
  subscriptionStatus?: string | null;
  currentPeriodEnd?: string | null;
  pwywAmountCents?: number | null;
  pwywGrantedAt?: string | null;
}

export interface Application {
  id: number | string;
  title?: string;
  company?: string;
  status: 'applied' | 'interview' | 'offer' | 'rejected' | 'draft';
  appliedAt?: string;
}

export interface Job {
  id: number | string;
  title: string;
  company: string;
  location?: string;
  type?: string;
  url?: string;
  salaryMin?: number;
  salaryMax?: number;
}

export interface ApplicationStats {
  total: number;
  thisWeek: number;
  interviews: number;
  responseRate: number;
  weeklyGoal: number;
  weeklyProgress: number;
}

export interface Preferences {
  jobTitle?: string;
  preferredLocation?: string;
  minSalary?: number;
  workType?: string;
  dailyGoal?: number;
  weeklyGoal?: number;
  monthlyGoal?: number;
  emailSummary?: boolean;
  jobAlerts?: boolean;
  reminders?: boolean;
}
