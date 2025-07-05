import { useLocation } from "wouter";
import { Link } from "wouter";
import { Briefcase, Home, FileText, Search, ClipboardList, User } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function DesktopSidebar() {
  const [location] = useLocation();

  const navItems = [
    { path: "/", icon: Home, label: "Dashboard" },
    { path: "/resume", icon: FileText, label: "Resume Builder" },
    { path: "/jobs", icon: Search, label: "Job Search" },
    { path: "/applications", icon: ClipboardList, label: "Applications" },
    { path: "/profile", icon: User, label: "Profile" },
  ];

  return (
    <aside className="hidden md:flex md:flex-col md:w-64 md:min-h-screen bg-white border-r border-gray-200">
      {/* Logo */}
      <div className="p-6 border-b border-gray-200">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 rounded-lg flex items-center justify-center" style={{ backgroundColor: '#1E2A38' }}>
            <Briefcase className="w-6 h-6" style={{ color: '#F8F9FA' }} />
          </div>
          <div>
            <h1 className="text-xl font-semibold text-gray-900">AutoHired</h1>
            <p className="text-sm text-gray-500">Lite Version</p>
          </div>
        </div>
      </div>
      
      {/* Navigation */}
      <nav className="flex-1 p-4 space-y-2">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = location === item.path;
          
          return (
            <Link key={item.path} href={item.path}>
              <button className={`sidebar-nav-item ${isActive ? "active" : ""}`}>
                <Icon className="w-5 h-5" />
                <span>{item.label}</span>
              </button>
            </Link>
          );
        })}
      </nav>

      {/* Premium Upgrade */}
      <div className="p-4 border-t border-gray-200">
        <div className="bg-gradient-to-r from-secondary to-accent rounded-lg p-4 text-white">
          <h3 className="font-semibold mb-2">Upgrade to Premium</h3>
          <p className="text-sm text-white/80 mb-3">
            Get AI-powered features, auto-form filling, and advanced analytics
          </p>
          <Button 
            className="w-full bg-white text-secondary font-medium py-2 px-4 rounded-md text-sm hover:bg-secondary/5"
            onClick={() => {
              window.open('/premium-purchase', '_blank');
            }}
          >
            Try Premium
          </Button>
        </div>
      </div>
    </aside>
  );
}
