import { fetchMatchingJobs } from "./matchJobs";
import { tailorResume } from "./tailorResume";
import { applyToJob } from "./applyJob";
import { sendSummaryEmail } from "./summarize";

export const runBot = async (): Promise<any[]> => {
  const jobs = await fetchMatchingJobs();
  const appliedJobs: any[] = [];
  for (const job of jobs) {
    const resume = await tailorResume(job);
    const result = await applyToJob(job, resume);
    console.log("Applied to:", result.url || job.title);
    appliedJobs.push(job);
  }
  await sendSummaryEmail(appliedJobs);
  return appliedJobs;
};
