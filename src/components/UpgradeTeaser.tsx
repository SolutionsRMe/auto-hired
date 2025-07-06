import React from "react";
import { Link } from "react-router-dom";

const UpgradeTeaser = () => (
  <div className="text-center text-sm mt-4 text-gray-600 dark:text-gray-400">
    Want more features?{" "}
    <Link to="/upgrade" className="text-blue-500 hover:underline">
      Upgrade your plan
    </Link>
  </div>
);

export default UpgradeTeaser;
