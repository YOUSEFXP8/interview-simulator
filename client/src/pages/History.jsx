import Navigation from "@/components/Navigation";
import InterviewHistoryCard from "@/components/InterviewHistoryCard";
import StatsCard from "@/components/StatsCard";

export default function History() {
  const interviews = JSON.parse(localStorage.getItem("interviewHistory") || "[]");
  const scores = interviews.map((interview) => interview.score).filter(Number.isFinite);
  const averageScore = scores.length
    ? `${Math.round(scores.reduce((total, score) => total + score, 0) / scores.length)}%`
    : "0%";

  const stats = [
    { label: "Total Interviews", value: interviews.length },
    { label: "Average Score", value: averageScore },
    { label: "Completed", value: interviews.filter((interview) => interview.status === "completed").length },
    { label: "Best Score", value: scores.length ? `${Math.max(...scores)}%` : "0%" },
  ];

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navigation />
      <main className="mx-auto max-w-7xl space-y-8 px-4 pt-28 pb-12 sm:px-6">
        <div>
          <h1 className="font-heading text-3xl font-bold text-foreground">Interview History</h1>
          <p className="mt-2 text-muted-foreground">Track your progress and review past practice sessions.</p>
        </div>

        <div className="grid gap-6 md:grid-cols-4">
          {stats.map((stat) => (
            <StatsCard key={stat.label} {...stat} />
          ))}
        </div>

        <div className="space-y-4">
          <h2 className="font-heading text-xl font-semibold text-foreground">Recent Interviews</h2>
          {interviews.length ? (
            interviews.map((interview) => <InterviewHistoryCard key={interview.id} {...interview} />)
          ) : (
            <div className="rounded-lg border border-dashed border-border bg-card/70 p-8 text-center text-muted-foreground">
              Complete an interview to see it here.
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
