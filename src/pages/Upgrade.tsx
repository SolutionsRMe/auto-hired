import React from "react";

const FeatureTable = () => (
  <table className="w-full text-left border border-gray-200 dark:border-gray-700">
    <thead>
      <tr className="bg-gray-100 dark:bg-gray-800">
        <th className="p-2">Feature</th>
        <th className="p-2">Lite</th>
        <th className="p-2">Premium</th>
      </tr>
    </thead>
    <tbody>
      <tr><td className="p-2">Basic Resume Builder</td><td className="p-2">✅</td><td className="p-2">✅</td></tr>
      <tr><td className="p-2">AI-Enhanced Cover Letters</td><td className="p-2">❌</td><td className="p-2">✅</td></tr>
      <tr><td className="p-2">Auto-Apply to Jobs</td><td className="p-2">❌</td><td className="p-2">✅</td></tr>
    </tbody>
  </table>
);

export default function Upgrade() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-white dark:bg-gray-900 text-gray-800 dark:text-gray-100 p-6">
      <div className="max-w-md w-full text-center space-y-4">
        <h1 className="text-3xl font-bold">Upgrade to Premium</h1>
        <p className="text-lg">Unlock advanced features, priority access, and more.</p>
        <button className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-6 rounded">
          Upgrade Now
        </button>
        <FeatureTable />
      </div>
    </div>
  );
}
