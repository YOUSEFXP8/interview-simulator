import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Calendar, Clock, Eye } from "lucide-react";

export default function InterviewHistoryCard({ date, position, duration, status, score }) {
  const statusColors = {
    completed: "bg-green-500/10 text-green-700 dark:text-green-400",
    "in-progress": "bg-blue-500/10 text-blue-700 dark:text-blue-400",
    paused: "bg-yellow-500/10 text-yellow-700 dark:text-yellow-400",
  };

  return (
    <Card className="hover-elevate" data-testid={`card-interview-${position.toLowerCase().replace(/\s+/g, '-')}`}>
      <CardContent className="p-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="space-y-3 flex-1">
            <div className="flex flex-wrap items-center gap-2">
              <h3 className="text-lg font-heading font-semibold" data-testid={`text-interview-position-${position.toLowerCase().replace(/\s+/g, '-')}`}>
                {position}
              </h3>
              <Badge className={statusColors[status]} data-testid={`badge-status-${position.toLowerCase().replace(/\s+/g, '-')}`}>
                {status.replace("-", " ")}
              </Badge>
            </div>

            <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
              <div className="flex items-center gap-1">
                <Calendar className="h-4 w-4" />
                <span data-testid={`text-interview-date-${position.toLowerCase().replace(/\s+/g, '-')}`}>{date}</span>
              </div>
              <div className="flex items-center gap-1">
                <Clock className="h-4 w-4" />
                <span data-testid={`text-interview-duration-${position.toLowerCase().replace(/\s+/g, '-')}`}>{duration}</span>
              </div>
              {score !== undefined && (
                <div className="font-medium text-foreground" data-testid={`text-interview-score-${position.toLowerCase().replace(/\s+/g, '-')}`}>
                  Score: {score}%
                </div>
              )}
            </div>
          </div>

          <Button variant="outline" data-testid={`button-view-details-${position.toLowerCase().replace(/\s+/g, '-')}`}>
            <Eye className="h-4 w-4 mr-2" />
            View Details
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
