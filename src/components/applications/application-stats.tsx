import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

interface ApplicationStatsProps {
  stats?: any;
  isLoading: boolean;
}

export default function ApplicationStats({ stats, isLoading }: ApplicationStatsProps) {
  if (isLoading) {
    return (
      <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-6">
        {[...Array(5)].map((_, i) => (
          <Card key={i}>
            <CardContent className="p-4 text-center">
              <Skeleton className="h-8 w-16 mx-auto mb-2" />
              <Skeleton className="h-4 w-20 mx-auto" />
            </CardContent>
          </Card>
        ))}
      </div>
    );
  }

  const applicationStats = stats || {
    total: 0,
    pending: 0,
    interviews: 0,
    offers: 0,
    rejected: 0,
  };

  return (
    <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-6">
      <Card className="stat-card text-center">
        <CardContent className="p-4">
          <div className="text-2xl font-semibold text-gray-900">
            {applicationStats.total}
          </div>
          <div className="text-sm text-gray-500">Total Applied</div>
        </CardContent>
      </Card>
      
      <Card className="stat-card text-center">
        <CardContent className="p-4">
          <div className="text-2xl font-semibold text-blue-600">
            {applicationStats.pending}
          </div>
          <div className="text-sm text-gray-500">Pending</div>
        </CardContent>
      </Card>
      
      <Card className="stat-card text-center">
        <CardContent className="p-4">
          <div className="text-2xl font-semibold text-green-600">
            {applicationStats.interviews}
          </div>
          <div className="text-sm text-gray-500">Interviews</div>
        </CardContent>
      </Card>
      
      <Card className="stat-card text-center">
        <CardContent className="p-4">
          <div className="text-2xl font-semibold text-purple-600">
            {applicationStats.offers}
          </div>
          <div className="text-sm text-gray-500">Offers</div>
        </CardContent>
      </Card>
      
      <Card className="stat-card text-center">
        <CardContent className="p-4">
          <div className="text-2xl font-semibold text-red-600">
            {applicationStats.rejected}
          </div>
          <div className="text-sm text-gray-500">Rejected</div>
        </CardContent>
      </Card>
    </div>
  );
}
