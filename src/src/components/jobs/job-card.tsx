import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Building, MapPin, Clock, Calendar, NotebookPen, Bookmark } from "lucide-react";

interface JobCardProps {
  job: any;
  onQuickApply: () => void;
  isApplying: boolean;
}

export default function JobCard({ job, onQuickApply, isApplying }: JobCardProps) {
  const formatSalary = (min?: number, max?: number) => {
    if (!min && !max) return "Salary TBD";
    if (min && max) return `$${Math.round(min/1000)}k - $${Math.round(max/1000)}k`;
    if (min) return `$${Math.round(min/1000)}k+`;
    if (max) return `Up to $${Math.round(max/1000)}k`;
    return "Salary TBD";
  };

  const getTimeAgo = (date: string) => {
    const now = new Date();
    const posted = new Date(date);
    const diffInDays = Math.floor((now.getTime() - posted.getTime()) / (1000 * 60 * 60 * 24));
    
    if (diffInDays === 0) return "Today";
    if (diffInDays === 1) return "1 day ago";
    if (diffInDays < 7) return `${diffInDays} days ago`;
    if (diffInDays < 30) return `${Math.floor(diffInDays / 7)} weeks ago`;
    return `${Math.floor(diffInDays / 30)} months ago`;
  };

  // Mock skills for display (in real app, these would come from job data)
  const mockSkills = ["React", "TypeScript", "Node.js"];

  return (
    <Card className="job-card">
      <CardContent className="p-6">
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-start space-x-4 flex-1">
            <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center">
              <Building className="w-6 h-6 text-gray-600" />
            </div>
            <div className="flex-1">
              <h3 className="text-lg font-semibold text-gray-900 mb-1">
                {job.title}
              </h3>
              <p className="text-gray-600 mb-2">{job.company}</p>
              <div className="flex items-center space-x-4 text-sm text-gray-500">
                <span className="flex items-center">
                  <MapPin className="w-4 h-4 mr-1" />
                  {job.location || "Location TBD"}
                </span>
                <span className="flex items-center">
                  <Clock className="w-4 h-4 mr-1" />
                  {job.type || "Full-time"}
                </span>
                <span className="flex items-center">
                  <Calendar className="w-4 h-4 mr-1" />
                  {getTimeAgo(job.posted || job.createdAt)}
                </span>
              </div>
            </div>
          </div>
          <div className="text-right">
            <p className="text-lg font-semibold text-green-600 mb-2">
              {formatSalary(job.salaryMin, job.salaryMax)}
            </p>
            <Badge variant="secondary" className="text-xs">
              95% Match
            </Badge>
          </div>
        </div>
        
        <p className="text-gray-700 mb-4 line-clamp-2">
          {job.description || "Job description not available."}
        </p>
        
        <div className="flex items-center justify-between">
          <div className="flex flex-wrap gap-2">
            {mockSkills.map((skill, index) => (
              <Badge key={index} variant="outline" className="text-xs">
                {skill}
              </Badge>
            ))}
          </div>
          <div className="flex space-x-3 ml-4">
            <Button variant="outline" size="sm" className="flex items-center space-x-1">
              <Bookmark className="w-4 h-4" />
              <span>Save</span>
            </Button>
            <Button 
              size="sm" 
              onClick={onQuickApply}
              disabled={isApplying}
              className="flex items-center space-x-1"
            >
              <NotebookPen className="w-4 h-4" />
              <span>{isApplying ? "Applying..." : "Quick Apply"}</span>
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
