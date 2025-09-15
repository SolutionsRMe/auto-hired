import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Search, Filter } from "lucide-react";

interface JobFiltersProps {
  filters: {
    search: string;
    location: string;
    salaryMin: string;
    salaryMax: string;
    remote: boolean;
  };
  onFiltersChange: (filters: any) => void;
  showFilters: boolean;
  onToggleFilters: () => void;
}

export default function JobFilters({ 
  filters, 
  onFiltersChange, 
  showFilters, 
  onToggleFilters 
}: JobFiltersProps) {
  const handleFilterChange = (key: string, value: any) => {
    const newFilters = { ...filters, [key]: value };
    onFiltersChange(newFilters);
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    onFiltersChange(filters);
  };

  return (
    <div className="space-y-4">
      {/* Primary Search Bar */}
      <form onSubmit={handleSearch}>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div>
            <Label htmlFor="keywords">Keywords</Label>
            <Input
              id="keywords"
              placeholder="e.g. Frontend Developer"
              value={filters.search}
              onChange={(e) => handleFilterChange("search", e.target.value)}
            />
          </div>
          <div>
            <Label htmlFor="location">Location</Label>
            <Input
              id="location"
              placeholder="e.g. San Francisco, CA"
              value={filters.location}
              onChange={(e) => handleFilterChange("location", e.target.value)}
            />
          </div>
          <div>
            <Label htmlFor="salary">Salary Range</Label>
            <Select
              value={`${filters.salaryMin}-${filters.salaryMax}`}
              onValueChange={(value) => {
                const [min, max] = value.split("-");
                handleFilterChange("salaryMin", min === "0" ? "" : min);
                handleFilterChange("salaryMax", max === "0" ? "" : max);
              }}
            >
              <SelectTrigger>
                <SelectValue placeholder="Any Salary" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="0-0">Any Salary</SelectItem>
                <SelectItem value="50000-70000">$50k - $70k</SelectItem>
                <SelectItem value="70000-90000">$70k - $90k</SelectItem>
                <SelectItem value="90000-120000">$90k - $120k</SelectItem>
                <SelectItem value="120000-0">$120k+</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="flex items-end">
            <Button type="submit" className="w-full flex items-center space-x-2">
              <Search className="w-4 h-4" />
              <span>Search Jobs</span>
            </Button>
          </div>
        </div>
      </form>

      {/* Advanced Filters Toggle */}
      <div className="flex items-center justify-between">
        <Button
          variant="outline"
          size="sm"
          onClick={onToggleFilters}
          className="flex items-center space-x-2"
        >
          <Filter className="w-4 h-4" />
          <span>{showFilters ? "Hide" : "Show"} Filters</span>
        </Button>
        <div className="text-sm text-gray-500">
          {Object.values(filters).some(v => v) && "Filters applied"}
        </div>
      </div>

      {/* Advanced Filters */}
      {showFilters && (
        <div className="p-4 bg-gray-50 rounded-lg space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <Label htmlFor="jobType">Job Type</Label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Any Type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="any">Any Type</SelectItem>
                  <SelectItem value="full-time">Full-time</SelectItem>
                  <SelectItem value="part-time">Part-time</SelectItem>
                  <SelectItem value="contract">Contract</SelectItem>
                  <SelectItem value="freelance">Freelance</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor="experience">Experience Level</Label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Any Level" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="any">Any Level</SelectItem>
                  <SelectItem value="entry">Entry Level</SelectItem>
                  <SelectItem value="mid">Mid Level</SelectItem>
                  <SelectItem value="senior">Senior Level</SelectItem>
                  <SelectItem value="lead">Lead/Principal</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor="industry">Industry</Label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Any Industry" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="any">Any Industry</SelectItem>
                  <SelectItem value="technology">Technology</SelectItem>
                  <SelectItem value="finance">Finance</SelectItem>
                  <SelectItem value="healthcare">Healthcare</SelectItem>
                  <SelectItem value="education">Education</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          
          <div className="flex items-center space-x-2">
            <Switch
              id="remote"
              checked={filters.remote}
              onCheckedChange={(checked) => handleFilterChange("remote", checked)}
            />
            <Label htmlFor="remote">Remote jobs only</Label>
          </div>
        </div>
      )}
    </div>
  );
}
