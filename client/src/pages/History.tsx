import Navigation from "@/components/Navigation";
import StatsCard from "@/components/StatsCard";
import InterviewHistoryCard from "@/components/InterviewHistoryCard";
import { CheckCircle, Clock, TrendingUp, Award } from "lucide-react";

export default function History() {
  //todo: remove mock functionality
  const stats = [
    { icon: CheckCircle, label: "Total Interviews", value: 24 },
    { icon: TrendingUp, label: "Average Score", value: "87%" },
    { icon: Clock, label: "Total Time", value: "12h" },
    { icon: Award, label: "Best Score", value: "96%" },
  ];

  //todo: remove mock functionality
  const interviews = [
    {
      date: "Nov 15, 2025",
      position: "Senior Frontend Developer",
      duration: "32 min",
      status: "completed" as const,
      score: 85,
    },
    {
      date: "Nov 16, 2025",
      position: "Product Manager",
      duration: "45 min",
      status: "completed" as const,
      score: 92,
    },
    {
      date: "Nov 16, 2025",
      position: "Full Stack Engineer",
      duration: "28 min",
      status: "completed" as const,
      score: 78,
    },
    {
      date: "Nov 17, 2025",
      position: "Data Scientist",
      duration: "15 min",
      status: "in-progress" as const,
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <main className="pt-24 pb-12">
        <div className="max-w-7xl mx-auto px-6 space-y-8">
          <div className="space-y-2">
            <h1 className="text-3xl font-heading font-bold" data-testid="text-history-heading">
              Interview History
            </h1>
            <p className="text-muted-foreground" data-testid="text-history-description">
              Track your progress and review past interview sessions
            </p>
          </div>

          <div className="grid md:grid-cols-4 gap-6">
            {stats.map((stat) => (
              <StatsCard key={stat.label} {...stat} />
            ))}
          </div>

          <div className="space-y-4">
            <h2 className="text-xl font-heading font-semibold" data-testid="text-recent-heading">
              Recent Interviews
            </h2>
            <div className="space-y-4">
              {interviews.map((interview, index) => (
                <InterviewHistoryCard key={index} {...interview} />
              ))}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
