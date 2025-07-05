import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Bell, X, CheckCircle, AlertCircle, Briefcase, TrendingUp, Calendar } from "lucide-react";

interface Notification {
  id: string;
  type: "job_match" | "application_update" | "interview" | "goal_achievement" | "system";
  title: string;
  message: string;
  timestamp: Date;
  read: boolean;
  actionUrl?: string;
}

interface NotificationPanelProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function NotificationPanel({ isOpen, onClose }: NotificationPanelProps) {
  const [notifications, setNotifications] = useState<Notification[]>([
    {
      id: "1",
      type: "job_match",
      title: "New Job Match Found",
      message: "Frontend Developer at TechCorp matches your skills (React, TypeScript)",
      timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000), // 2 hours ago
      read: false,
      actionUrl: "/jobs"
    },
    {
      id: "2",
      type: "application_update",
      title: "Application Status Updated",
      message: "Your application to StartupXYZ has moved to 'Interview' stage",
      timestamp: new Date(Date.now() - 4 * 60 * 60 * 1000), // 4 hours ago
      read: false,
      actionUrl: "/applications"
    },
    {
      id: "3",
      type: "goal_achievement",
      title: "Daily Goal Achieved!",
      message: "Congratulations! You've reached your daily application goal of 5 applications",
      timestamp: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000), // 1 day ago
      read: true,
      actionUrl: "/profile"
    },
    {
      id: "4",
      type: "interview",
      title: "Interview Reminder",
      message: "You have an interview with WebSolutions tomorrow at 2:00 PM",
      timestamp: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000), // 1 day ago
      read: true,
      actionUrl: "/applications"
    },
    {
      id: "5",
      type: "system",
      title: "Weekly Report Ready",
      message: "Your weekly application summary is now available",
      timestamp: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000), // 2 days ago
      read: true,
      actionUrl: "/dashboard"
    }
  ]);

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case "job_match":
        return <Briefcase className="w-5 h-5 text-blue-600" />;
      case "application_update":
        return <TrendingUp className="w-5 h-5 text-green-600" />;
      case "interview":
        return <Calendar className="w-5 h-5 text-purple-600" />;
      case "goal_achievement":
        return <CheckCircle className="w-5 h-5 text-yellow-600" />;
      case "system":
        return <AlertCircle className="w-5 h-5 text-gray-600" />;
      default:
        return <Bell className="w-5 h-5 text-gray-600" />;
    }
  };

  const getNotificationColor = (type: string) => {
    switch (type) {
      case "job_match":
        return "bg-blue-50 border-blue-200";
      case "application_update":
        return "bg-green-50 border-green-200";
      case "interview":
        return "bg-purple-50 border-purple-200";
      case "goal_achievement":
        return "bg-yellow-50 border-yellow-200";
      case "system":
        return "bg-gray-50 border-gray-200";
      default:
        return "bg-gray-50 border-gray-200";
    }
  };

  const markAsRead = (id: string) => {
    setNotifications(notifications.map(notif => 
      notif.id === id ? { ...notif, read: true } : notif
    ));
  };

  const markAllAsRead = () => {
    setNotifications(notifications.map(notif => ({ ...notif, read: true })));
  };

  const formatTimestamp = (timestamp: Date) => {
    const now = new Date();
    const diffInMinutes = Math.floor((now.getTime() - timestamp.getTime()) / (1000 * 60));
    
    if (diffInMinutes < 60) {
      return `${diffInMinutes}m ago`;
    } else if (diffInMinutes < 1440) { // 24 hours
      return `${Math.floor(diffInMinutes / 60)}h ago`;
    } else {
      return `${Math.floor(diffInMinutes / 1440)}d ago`;
    }
  };

  const unreadCount = notifications.filter(n => !n.read).length;

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black bg-opacity-50 flex items-start justify-end">
      <div className="bg-white w-96 h-full shadow-2xl overflow-hidden">
        <Card className="h-full rounded-none border-0">
          <CardHeader className="border-b border-gray-200 flex flex-row items-center justify-between space-y-0 p-4">
            <div className="flex items-center space-x-2">
              <Bell className="w-5 h-5" />
              <CardTitle className="text-lg">Notifications</CardTitle>
              {unreadCount > 0 && (
                <Badge variant="destructive" className="ml-2">
                  {unreadCount}
                </Badge>
              )}
            </div>
            <div className="flex items-center space-x-2">
              {unreadCount > 0 && (
                <Button 
                  variant="ghost" 
                  size="sm" 
                  onClick={markAllAsRead}
                  className="text-xs"
                >
                  Mark all read
                </Button>
              )}
              <Button variant="ghost" size="sm" onClick={onClose}>
                <X className="w-4 h-4" />
              </Button>
            </div>
          </CardHeader>
          <CardContent className="p-0 h-full overflow-y-auto">
            {notifications.length === 0 ? (
              <div className="flex flex-col items-center justify-center h-64 text-gray-500">
                <Bell className="w-12 h-12 mb-4 opacity-50" />
                <p className="text-lg font-medium mb-2">No notifications</p>
                <p className="text-sm">You're all caught up!</p>
              </div>
            ) : (
              <div className="space-y-1">
                {notifications.map((notification) => (
                  <div
                    key={notification.id}
                    className={`p-4 border-l-4 cursor-pointer transition-colors hover:bg-gray-50 ${
                      notification.read ? 'opacity-60' : ''
                    } ${getNotificationColor(notification.type)}`}
                    onClick={() => {
                      markAsRead(notification.id);
                      if (notification.actionUrl) {
                        window.location.href = notification.actionUrl;
                      }
                    }}
                  >
                    <div className="flex items-start space-x-3">
                      <div className="flex-shrink-0 mt-1">
                        {getNotificationIcon(notification.type)}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between">
                          <p className={`text-sm font-medium text-gray-900 ${
                            !notification.read ? 'font-semibold' : ''
                          }`}>
                            {notification.title}
                          </p>
                          {!notification.read && (
                            <div className="w-2 h-2 bg-blue-600 rounded-full flex-shrink-0 ml-2"></div>
                          )}
                        </div>
                        <p className="text-sm text-gray-600 mt-1">
                          {notification.message}
                        </p>
                        <p className="text-xs text-gray-500 mt-2">
                          {formatTimestamp(notification.timestamp)}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}