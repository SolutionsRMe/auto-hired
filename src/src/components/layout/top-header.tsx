import { useState } from "react";
import { useLocation } from "wouter";
import { useAuth } from "@/hooks/useAuth";
import { Bell } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useIsMobile } from "@/hooks/use-mobile";
import NotificationPanel from "@/components/notifications/notification-panel";

export default function TopHeader() {
  const [location] = useLocation();
  const { user } = useAuth();
  const isMobile = useIsMobile();
  const [isNotificationOpen, setIsNotificationOpen] = useState(false);
  const [unreadCount, setUnreadCount] = useState(5); // This will be updated by the notification panel

  const getPageTitle = (path: string) => {
    switch (path) {
      case "/": return "Dashboard";
      case "/resume": return "Resume Builder";
      case "/jobs": return "Job Search";
      case "/applications": return "Application Tracker";
      case "/profile": return "Profile Settings";
      default: return "AutoHired";
    }
  };

  return (
    <header className="bg-white border-b border-gray-200 px-4 md:px-6 py-4">
      <div className="flex items-center justify-between">
        <div className="md:hidden">
          <h1 className="text-xl font-semibold text-gray-900">AutoHired</h1>
        </div>
        <div className="hidden md:block">
          <h2 className="text-2xl font-semibold text-gray-900">
            {getPageTitle(location)}
          </h2>
        </div>
        <div className="flex items-center space-x-4">
          <Button 
            variant="ghost" 
            size="sm" 
            className="relative p-2"
            onClick={() => setIsNotificationOpen(!isNotificationOpen)}
          >
            <Bell className="w-5 h-5" />
            {unreadCount > 0 && (
              <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
            )}
          </Button>
          <div className="flex items-center space-x-3">
            <img
              src={user?.photoURL || "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&h=100"}
              alt="User profile"
              className="w-8 h-8 rounded-full object-cover"
            />
            {!isMobile && (
              <div>
                <p className="text-sm font-medium text-gray-900">
                  {user?.displayName || 'User'}
                </p>
                <p className="text-xs text-gray-500">{user?.email}</p>
              </div>
            )}
          </div>
        </div>
      </div>
      <NotificationPanel 
        isOpen={isNotificationOpen} 
        onClose={() => setIsNotificationOpen(false)}
        onUnreadCountChange={setUnreadCount}
      />
    </header>
  );
}
