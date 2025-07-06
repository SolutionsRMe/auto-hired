import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { Search, Filter, MapPin, Clock, Calendar, NotebookPen, Bookmark, ChevronLeft, ChevronRight } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import JobFilters from "@/components/jobs/job-filters";
import JobCard from "@/components/jobs/job-card";
import { apiRequest } from "@/lib/queryClient";

export default function JobSearch() {
  const [page, setPage] = useState(1);
  const [filters, setFilters] = useState({
    search: "",
    location: "",
    salaryMin: "",
    salaryMax: "",
    remote: false,
  });
  const [showFilters, setShowFilters] = useState(false);
  
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const { data: jobsData, isLoading } = useQuery({
    queryKey: ["/api/jobs", { page, limit: 10, ...filters }],
  });

  const quickApplyMutation = useMutation({
    mutationFn: async (jobListingId: number) => {
      const response = await apiRequest("POST", "/api/quick-apply", { jobListingId });
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/applications"] });
      toast({
        title: "Application Submitted",
        description: "Your application has been submitted successfully",
      });
    },
    onError: () => {
      toast({
        title: "Application Failed",
        description: "Failed to submit application. Please try again.",
        variant: "destructive",
      });
    },
  });

  const handleSearch = (newFilters: typeof filters) => {
    setFilters(newFilters);
    setPage(1);
  };

  const handleQuickApply = (jobId: number) => {
    quickApplyMutation.mutate(jobId);
  };

  const jobs = jobsData?.data || [];
  const totalPages = Math.ceil((jobsData?.total || 0) / 10);

  return (
    <div className="p-4 md:p-6">
      {/* Search Header */}
      <Card className="mb-6">
        <CardHeader className="pb-4">
          <CardTitle className="text-xl">Job Search</CardTitle>
        </CardHeader>
        <CardContent>
          <JobFilters 
            filters={filters}
            onFiltersChange={handleSearch}
            showFilters={showFilters}
            onToggleFilters={() => setShowFilters(!showFilters)}
          />
        </CardContent>
      </Card>

      {/* Results Header */}
      <Card className="mb-6">
        <CardContent className="py-4">
          <div className="flex items-center justify-between text-sm text-gray-600">
            <span>
              {isLoading ? "Searching..." : `Showing ${((page - 1) * 10) + 1}-${Math.min(page * 10, jobsData?.total || 0)} of ${jobsData?.total || 0} jobs`}
            </span>
            <div className="flex items-center space-x-4">
              <span>Sort by:</span>
              <select className="border border-gray-300 rounded px-2 py-1 text-sm focus:ring-primary focus:border-primary">
                <option>Relevance</option>
                <option>Date Posted</option>
                <option>Salary</option>
                <option>Company</option>
              </select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Job Listings */}
      <div className="space-y-4">
        {isLoading ? (
          [...Array(5)].map((_, i) => (
            <Card key={i}>
              <CardContent className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-start space-x-4 flex-1">
                    <Skeleton className="w-12 h-12 rounded-lg" />
                    <div className="flex-1 space-y-2">
                      <Skeleton className="h-6 w-1/2" />
                      <Skeleton className="h-4 w-1/3" />
                      <div className="flex space-x-4">
                        <Skeleton className="h-4 w-20" />
                        <Skeleton className="h-4 w-16" />
                        <Skeleton className="h-4 w-24" />
                      </div>
                    </div>
                  </div>
                  <div className="text-right space-y-2">
                    <Skeleton className="h-6 w-20" />
                    <Skeleton className="h-5 w-16" />
                  </div>
                </div>
                <Skeleton className="h-4 w-full mb-4" />
                <div className="flex items-center justify-between">
                  <div className="flex space-x-2">
                    <Skeleton className="h-6 w-16" />
                    <Skeleton className="h-6 w-20" />
                    <Skeleton className="h-6 w-16" />
                  </div>
                  <div className="flex space-x-3">
                    <Skeleton className="h-8 w-16" />
                    <Skeleton className="h-8 w-24" />
                  </div>
                </div>
              </CardContent>
            </Card>
          ))
        ) : jobs.length > 0 ? (
          jobs.map((job: any) => (
            <JobCard
              key={job.id}
              job={job}
              onQuickApply={() => handleQuickApply(job.id)}
              isApplying={quickApplyMutation.isPending}
            />
          ))
        ) : (
          <Card>
            <CardContent className="py-12 text-center">
              <Search className="w-12 h-12 text-gray-300 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">No jobs found</h3>
              <p className="text-gray-500 mb-4">
                Try adjusting your search criteria or filters to find more opportunities.
              </p>
              <Button onClick={() => setFilters({ search: "", location: "", salaryMin: "", salaryMax: "", remote: false })}>
                Clear Filters
              </Button>
            </CardContent>
          </Card>
        )}
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex items-center justify-center mt-8">
          <nav className="flex items-center space-x-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setPage(Math.max(1, page - 1))}
              disabled={page === 1}
            >
              <ChevronLeft className="w-4 h-4" />
            </Button>
            
            {[...Array(Math.min(5, totalPages))].map((_, i) => {
              const pageNum = Math.max(1, Math.min(totalPages - 4, page - 2)) + i;
              if (pageNum > totalPages) return null;
              
              return (
                <Button
                  key={pageNum}
                  variant={pageNum === page ? "default" : "outline"}
                  size="sm"
                  onClick={() => setPage(pageNum)}
                >
                  {pageNum}
                </Button>
              );
            })}
            
            {totalPages > 5 && page < totalPages - 2 && (
              <>
                <span className="px-2 text-gray-500">...</span>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setPage(totalPages)}
                >
                  {totalPages}
                </Button>
              </>
            )}
            
            <Button
              variant="outline"
              size="sm"
              onClick={() => setPage(Math.min(totalPages, page + 1))}
              disabled={page === totalPages}
            >
              <ChevronRight className="w-4 h-4" />
            </Button>
          </nav>
        </div>
      )}
    </div>
  );
}
