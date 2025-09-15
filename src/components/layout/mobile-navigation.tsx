import { useState } from "react";
import { useLocation } from "wouter";
import { Link } from "wouter";
import { Home, FileText, Search, ClipboardList, User } from "lucide-react";

export default function MobileNavigation() {
  const [location] = useLocation();

  const navItems = [
    { path: "/", icon: Home, label: "Dashboard" },
    { path: "/resume", icon: FileText, label: "Resume" },
    { path: "/jobs", icon: Search, label: "Jobs" },
    { path: "/applications", icon: ClipboardList, label: "Apps" },
    { path: "/billing", icon: User, label: "Billing" },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 z-50 md:hidden">
      <div className="grid grid-cols-5 h-16">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = location === item.path;
          
          return (
            <Link key={item.path} href={item.path}>
              <button className={`mobile-nav-item h-full w-full ${isActive ? "active" : ""}`}>
                <Icon className="w-5 h-5" />
                <span className="text-xs mt-1">{item.label}</span>
              </button>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
