import React, { useState } from "react";
import { runBot } from "@/bot/index";
import PremiumGate from "@/components/PremiumGate";
import UpgradeTeaser from "@/components/UpgradeTeaser";
import { Job } from "@/lib/types";

const Dashboard = () => {
  const [status, setStatus] = useState("");
  const [appliedJobs, setAppliedJobs] = useState<Job[]>([]);

  const handleBotRun = async () => {
    setStatus("Running...");
    const jobs = await runBot();
    setAppliedJobs(jobs);
    setStatus("Finished");
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Dashboard</h1>
      <PremiumGate fallback={<UpgradeTeaser />}>
        <button onClick={handleBotRun} className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
          Run AutoHired Bot
        </button>
      </PremiumGate>
      <p>{status}</p>
      <ul>
        {appliedJobs.map((job) => (
          <li key={job.id}>{job.title}</li>
        ))}
      </ul>
      {/* Add more dashboard content here */}
    </div>
  );
};

export default Dashboard;
