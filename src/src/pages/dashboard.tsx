import { useQuery } from "@tanstack/react-query";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { NotebookPen, Calendar, TrendingUp, Target, Building, ArrowUp, ArrowDown, Eye } from "lucide-react";
import { Link } from "wouter";

export default function Dashboard() {
  const { data: stats, isLoading: statsLoading } = useQuery({
    queryKey: ["/api/applications/stats"],
  });

  const { data: recentApplications, isLoading: applicationsLoading } = useQuery({
    queryKey: ["/api/applications", { page: 1, limit: 5 }],
  });

  const { data: recommendedJobs, isLoading: jobsLoading } = useQuery({
    queryKey: ["/api/jobs", { page: 1, limit: 3 }],
  });

  if (statsLoading) {
    return (
      <div className="p-4 md:p-6 space-y-6">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[...Array(4)].map((_, i) => (
            <Skeleton key={i} className="h-32" />
          ))}
        </div>
      </div>
    );
  }

  const applicationStats = stats || {
    total: 0,
    thisWeek: 0,
    interviews: 0,
    responseRate: 0,
    weeklyGoal: 20,
    weeklyProgress: 0,
  };

  return (
    <div className="p-4 md:p-6 space-y-6">
      {/* Stats Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Card className="stat-card">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Applications Sent</p>
              <p className="text-2xl font-semibold text-foreground">
                {applicationStats.total}
              </p>
            </div>
            <div className="w-10 h-10 bg-secondary/10 rounded-lg flex items-center justify-center">
              <NotebookPen className="w-5 h-5 text-secondary" />
            </div>
          </div>
          <p className="text-xs text-success mt-2 flex items-center">
            <ArrowUp className="w-3 h-3 mr-1" />
            +{applicationStats.thisWeek} this week
          </p>
        </Card>

        <Card className="stat-card">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Interviews</p>
              <p className="text-2xl font-semibold text-foreground">
                {applicationStats.interviews}
              </p>
            </div>
            <div className="w-10 h-10 bg-accent/10 rounded-lg flex items-center justify-center">
              <Calendar className="w-5 h-5 text-accent" />
            </div>
          </div>
          <p className="text-xs text-success mt-2 flex items-center">
            <ArrowUp className="w-3 h-3 mr-1" />
            +3 this week
          </p>
        </Card>

        <Card className="stat-card">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">Response Rate</p>
              <p className="text-2xl font-semibold text-gray-900">
                {applicationStats.responseRate}%
              </p>
            </div>
            <div className="w-10 h-10 bg-yellow-100 rounded-lg flex items-center justify-center">
              <TrendingUp className="w-5 h-5 text-yellow-600" />
            </div>
          </div>
          <p className="text-xs text-red-600 mt-2 flex items-center">
            <ArrowDown className="w-3 h-3 mr-1" />
            -0.5% this week
          </p>
        </Card>

        <Card className="stat-card">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">Weekly Goal</p>
              <p className="text-2xl font-semibold text-gray-900">
                {applicationStats.weeklyProgress}/{applicationStats.weeklyGoal}
              </p>
            </div>
            <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
              <Target className="w-5 h-5 text-purple-600" />
            </div>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
            <div 
              className="bg-purple-600 h-2 rounded-full" 
              style={{ width: `${(applicationStats.weeklyProgress / applicationStats.weeklyGoal) * 100}%` }}
            ></div>
          </div>
        </Card>
      </div>

      {/* Recent Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Applications */}
        <Card>
          <CardHeader className="pb-4">
            <CardTitle className="text-lg">Recent Applications</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {applicationsLoading ? (
              [...Array(3)].map((_, i) => (
                <div key={i} className="flex items-center space-x-3">
                  <Skeleton className="w-10 h-10 rounded-lg" />
                  <div className="flex-1 space-y-2">
                    <Skeleton className="h-4 w-3/4" />
                    <Skeleton className="h-3 w-1/2" />
                  </div>
                  <Skeleton className="h-6 w-16" />
                </div>
              ))
            ) : recentApplications?.data?.length > 0 ? (
              recentApplications.data.map((application: any) => (
                <div key={application.id} className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center">
                      <Building className="w-5 h-5 text-gray-600" />
                    </div>
                    <div>
                      <p className="font-medium text-gray-900">
                        {application.jobListing?.title || 'Job Title'}
                      </p>
                      <p className="text-sm text-gray-500">
                        {application.jobListing?.company || 'Company'}
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <Badge className={`application-status-${application.status}`}>
                      {application.status}
                    </Badge>
                    <p className="text-xs text-gray-500 mt-1">
                      {new Date(application.appliedDate).toLocaleDateString()}
                    </p>
                  </div>
                </div>
              ))
            ) : (
              <div className="text-center py-8 text-gray-500">
                <NotebookPen className="w-12 h-12 mx-auto mb-3 text-gray-300" />
                <p>No applications yet</p>
                <p className="text-sm">Start applying to jobs to see them here</p>
              </div>
            )}
            {recentApplications?.data?.length > 0 && (
              <div className="pt-4 border-t border-gray-200">
                <Link href="/applications">
                  <Button variant="ghost" className="w-full text-primary">
                    View All Applications
                  </Button>
                </Link>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Recommended Jobs */}
        <Card>
          <CardHeader className="pb-4">
            <CardTitle className="text-lg">Recommended Jobs</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {jobsLoading ? (
              [...Array(2)].map((_, i) => (
                <div key={i} className="border border-gray-200 rounded-lg p-4">
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <Skeleton className="h-5 w-1/2" />
                      <Skeleton className="h-5 w-16" />
                    </div>
                    <Skeleton className="h-4 w-1/3" />
                    <div className="flex space-x-2">
                      <Skeleton className="h-5 w-16" />
                      <Skeleton className="h-5 w-20" />
                      <Skeleton className="h-5 w-20" />
                    </div>
                    <Skeleton className="h-8 w-full" />
                  </div>
                </div>
              ))
            ) : recommendedJobs?.data?.length > 0 ? (
              recommendedJobs.data.slice(0, 2).map((job: any) => (
                <div key={job.id} className="border border-gray-200 rounded-lg p-4">
                  <div className="flex items-start justify-between mb-2">
                    <div>
                      <h4 className="font-medium text-gray-900">{job.title}</h4>
                      <p className="text-sm text-gray-600">{job.company}</p>
                    </div>
                    <span className="text-sm font-medium text-green-600">
                      {job.salaryMin && job.salaryMax ? 
                        `$${Math.round(job.salaryMin/1000)}k-$${Math.round(job.salaryMax/1000)}k` :
                        'Salary TBD'
                      }
                    </span>
                  </div>
                  <div className="flex items-center space-x-4 text-xs text-gray-500 mb-3">
                    <span>{job.location || 'Location TBD'}</span>
                    <span>{job.type || 'Full-time'}</span>
                    <Badge variant="secondary" className="text-xs">
                      95% Match
                    </Badge>
                  </div>
                  <Button size="sm" className="w-full">
                    Quick Apply
                  </Button>
                </div>
              ))
            ) : (
              <div className="text-center py-8 text-gray-500">
                <Building className="w-12 h-12 mx-auto mb-3 text-gray-300" />
                <p>No job recommendations yet</p>
                <p className="text-sm">Complete your profile to get personalized recommendations</p>
              </div>
            )}
            {recommendedJobs?.data?.length > 0 && (
              <div className="pt-4 border-t border-gray-200">
                <Link href="/jobs">
                  <Button variant="ghost" className="w-full text-primary">
                    <Eye className="w-4 h-4 mr-2" />
                    Browse All Jobs
                  </Button>
                </Link>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
