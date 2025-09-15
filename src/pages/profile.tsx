import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { Camera, User, Settings, Bell, Target, LogOut } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useFirebaseAuth } from "@/hooks/useFirebaseAuth";
import { apiRequest } from "@/lib/queryClient";

export default function Profile() {
  const [isEditing, setIsEditing] = useState(false);
  const { user, signOut } = useFirebaseAuth();
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const { data: preferences, isLoading: preferencesLoading } = useQuery<any>({
    queryKey: ["/api/preferences"],
    queryFn: () => fetch('/api/preferences').then(r => r.json()),
  });

  const updatePreferencesMutation = useMutation({
    mutationFn: async (data: any) => {
      const response = preferences
        ? await apiRequest("PUT", "/api/preferences", data)
        : await apiRequest("POST", "/api/preferences", data);
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/preferences"] });
      setIsEditing(false);
      toast({
        title: "Profile Updated",
        description: "Your preferences have been saved successfully",
      });
    },
    onError: () => {
      toast({
        title: "Update Failed",
        description: "Failed to update preferences. Please try again.",
        variant: "destructive",
      });
    },
  });

  const [formData, setFormData] = useState({
    jobTitle: preferences?.jobTitle || "",
    preferredLocation: preferences?.preferredLocation || "",
    minSalary: preferences?.minSalary || 0,
    workType: preferences?.workType || "any",
    dailyGoal: preferences?.dailyGoal || 5,
    weeklyGoal: preferences?.weeklyGoal || 20,
    monthlyGoal: preferences?.monthlyGoal || 80,
    emailSummary: preferences?.emailSummary ?? true,
    jobAlerts: preferences?.jobAlerts ?? true,
    reminders: preferences?.reminders ?? false,
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    updatePreferencesMutation.mutate(formData);
  };

  const handleLogout = async () => {
    await signOut();
    window.location.href = '/';
  };

  if (preferencesLoading) {
    return (
      <div className="p-4 md:p-6">
        <div className="max-w-4xl mx-auto space-y-6">
          <Skeleton className="h-8 w-64" />
          <Card>
            <CardHeader>
              <Skeleton className="h-6 w-48" />
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center space-x-6">
                <Skeleton className="w-24 h-24 rounded-full" />
                <div className="space-y-2">
                  <Skeleton className="h-6 w-40" />
                  <Skeleton className="h-4 w-32" />
                  <Skeleton className="h-4 w-48" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  // Update form data when preferences load
  if (preferences && !isEditing) {
    const updatedFormData = {
      jobTitle: preferences.jobTitle || "",
      preferredLocation: preferences.preferredLocation || "",
      minSalary: preferences.minSalary || 0,
      workType: preferences.workType || "any",
      dailyGoal: preferences.dailyGoal || 5,
      weeklyGoal: preferences.weeklyGoal || 20,
      monthlyGoal: preferences.monthlyGoal || 80,
      emailSummary: preferences.emailSummary ?? true,
      jobAlerts: preferences.jobAlerts ?? true,
      reminders: preferences.reminders ?? false,
    };
    
    if (JSON.stringify(formData) !== JSON.stringify(updatedFormData)) {
      setFormData(updatedFormData);
    }
  }

  return (
    <div className="p-4 md:p-6">
      <div className="max-w-4xl mx-auto space-y-6">
        {/* Profile Header */}
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center space-x-6">
              <div className="relative">
                <img
                  src={user?.photoURL || "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&h=150"}
                  alt="Profile"
                  className="w-24 h-24 rounded-full object-cover border-4 border-white shadow-lg"
                />
                <button className="absolute bottom-0 right-0 w-8 h-8 bg-primary text-white rounded-full flex items-center justify-center shadow-lg hover:bg-blue-700">
                  <Camera className="w-4 h-4" />
                </button>
              </div>
              <div className="flex-1">
                <h2 className="text-2xl font-semibold text-gray-900">
                  {user?.displayName || 'User'}
                </h2>
                <p className="text-gray-600">{formData.jobTitle || 'Job Seeker'}</p>
                <p className="text-sm text-gray-500">{user?.email}</p>
                <div className="flex items-center space-x-4 mt-3">
                  <Badge className="bg-green-100 text-green-800">
                    <div className="w-2 h-2 bg-green-400 rounded-full mr-1"></div>
                    Active Job Seeker
                  </Badge>
                  <span className="text-sm text-gray-500">
                    Member since {new Date(Date.now()).toLocaleDateString('en-US', { month: 'short', year: 'numeric' })}
                  </span>
                </div>
              </div>
              <div className="flex space-x-3">
                <Button
                  variant={isEditing ? "outline" : "default"}
                  onClick={() => setIsEditing(!isEditing)}
                >
                  {isEditing ? "Cancel" : "Edit Profile"}
                </Button>
                <Button variant="outline" onClick={handleLogout}>
                  <LogOut className="w-4 h-4 mr-2" />
                  Sign Out
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Job Search Preferences */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <User className="w-5 h-5" />
                <span>Job Search Preferences</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <Label htmlFor="jobTitle">Desired Job Title</Label>
                  <Input
                    id="jobTitle"
                    value={formData.jobTitle}
                    onChange={(e) => setFormData({ ...formData, jobTitle: e.target.value })}
                    disabled={!isEditing}
                  />
                </div>
                <div>
                  <Label htmlFor="location">Preferred Location</Label>
                  <Input
                    id="location"
                    value={formData.preferredLocation}
                    onChange={(e) => setFormData({ ...formData, preferredLocation: e.target.value })}
                    disabled={!isEditing}
                  />
                </div>
                <div>
                  <Label htmlFor="minSalary">Minimum Salary</Label>
                  <Select
                    value={formData.minSalary.toString()}
                    onValueChange={(value) => setFormData({ ...formData, minSalary: parseInt(value) || 0 })}
                    disabled={!isEditing}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="No preference" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="0">No preference</SelectItem>
                      <SelectItem value="50000">$50,000</SelectItem>
                      <SelectItem value="70000">$70,000</SelectItem>
                      <SelectItem value="90000">$90,000</SelectItem>
                      <SelectItem value="120000">$120,000</SelectItem>
                      <SelectItem value="150000">$150,000</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="workType">Work Type</Label>
                  <Select
                    value={formData.workType}
                    onValueChange={(value) => setFormData({ ...formData, workType: value })}
                    disabled={!isEditing}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="any">Any</SelectItem>
                      <SelectItem value="remote">Remote</SelectItem>
                      <SelectItem value="hybrid">Hybrid</SelectItem>
                      <SelectItem value="onsite">On-site</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Application Goals */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Target className="w-5 h-5" />
                <span>Application Goals</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div>
                  <Label htmlFor="dailyGoal">Daily Goal</Label>
                  <Input
                    id="dailyGoal"
                    type="number"
                    value={formData.dailyGoal}
                    onChange={(e) => setFormData({ ...formData, dailyGoal: parseInt(e.target.value) || 0 })}
                    disabled={!isEditing}
                  />
                </div>
                <div>
                  <Label htmlFor="weeklyGoal">Weekly Goal</Label>
                  <Input
                    id="weeklyGoal"
                    type="number"
                    value={formData.weeklyGoal}
                    onChange={(e) => setFormData({ ...formData, weeklyGoal: parseInt(e.target.value) || 0 })}
                    disabled={!isEditing}
                  />
                </div>
                <div>
                  <Label htmlFor="monthlyGoal">Monthly Goal</Label>
                  <Input
                    id="monthlyGoal"
                    type="number"
                    value={formData.monthlyGoal}
                    onChange={(e) => setFormData({ ...formData, monthlyGoal: parseInt(e.target.value) || 0 })}
                    disabled={!isEditing}
                  />
                </div>
                <div>
                  <Label>Target Companies</Label>
                  <Input
                    type="number"
                    defaultValue={50}
                    disabled={!isEditing}
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Notification Settings */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Bell className="w-5 h-5" />
                <span>Notification Settings</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="text-sm font-medium text-gray-900">Email Summaries</h4>
                  <p className="text-sm text-gray-500">Receive daily/weekly application summaries</p>
                </div>
                <Switch
                  checked={formData.emailSummary}
                  onCheckedChange={(checked) => setFormData({ ...formData, emailSummary: checked })}
                  disabled={!isEditing}
                />
              </div>
              
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="text-sm font-medium text-gray-900">New Job Alerts</h4>
                  <p className="text-sm text-gray-500">Get notified when new matching jobs are found</p>
                </div>
                <Switch
                  checked={formData.jobAlerts}
                  onCheckedChange={(checked) => setFormData({ ...formData, jobAlerts: checked })}
                  disabled={!isEditing}
                />
              </div>
              
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="text-sm font-medium text-gray-900">Application Reminders</h4>
                  <p className="text-sm text-gray-500">Remind me to follow up on applications</p>
                </div>
                <Switch
                  checked={formData.reminders}
                  onCheckedChange={(checked) => setFormData({ ...formData, reminders: checked })}
                  disabled={!isEditing}
                />
              </div>
            </CardContent>
          </Card>

          {/* Save Button */}
          {isEditing && (
            <div className="flex justify-end space-x-4">
              <Button 
                type="button" 
                variant="outline" 
                onClick={() => setIsEditing(false)}
              >
                Cancel
              </Button>
              <Button 
                type="submit" 
                disabled={updatePreferencesMutation.isPending}
              >
                {updatePreferencesMutation.isPending ? "Saving..." : "Save Changes"}
              </Button>
            </div>
          )}
        </form>
      </div>
    </div>
  );
}
