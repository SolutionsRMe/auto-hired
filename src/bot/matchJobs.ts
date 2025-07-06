import axios from "axios";
import { Job } from "@/lib/types";

export const matchJobs = () => {
  // Logic to match jobs
};

export const fetchMatchingJobs = async (): Promise<Job[]> => {
  const response = await axios.get("https://api.adzuna.com/v1/api/jobs/us/search/1", {
    params: {
      app_id: "YOUR_APP_ID",
      app_key: "YOUR_API_KEY",
      results_per_page: 10,
      what: "developer",
      where: "remote"
    }
  });

  const jobs: Job[] = response.data.results.map((job: any) => ({
    id: job.id,
    title: job.title,
    description: job.description,
    url: job.redirect_url
  }));

  return jobs;
};
