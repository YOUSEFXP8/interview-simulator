export default function InterviewHistoryCard({ date, position, duration, status, score }) {
  const isCompleted = status === "completed";

  return (
    <article className="glow-on-hover rounded-xl border border-border/80 bg-card/45 p-6 shadow-md hover:bg-card/75 backdrop-blur-sm relative overflow-hidden before:absolute before:left-0 before:top-0 before:bottom-0 before:w-1 before:bg-primary/40">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="space-y-2">
          <h3 className="font-heading text-lg font-bold text-card-foreground tracking-tight">{position}</h3>
          <div className="flex flex-wrap items-center gap-2.5 text-xs text-muted-foreground font-medium">
            <span>{date}</span>
            <span>•</span>
            <span>{duration}</span>
            <span>•</span>
            <span className={`inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider ${
              isCompleted
                ? "bg-primary/10 text-primary border border-primary/20"
                : "bg-accent/10 text-accent border border-accent/20"
            }`}>
              {status}
            </span>
          </div>
        </div>
        
        {score !== undefined && (
          <div className="shrink-0 flex items-center gap-3">
            <span className="text-xs text-muted-foreground font-medium">Evaluation Score:</span>
            <div className="flex h-11 w-11 items-center justify-center rounded-full bg-primary/10 border border-primary/20 font-heading text-sm font-extrabold text-primary shadow-sm shadow-primary/5">
              {score}%
            </div>
          </div>
        )}
      </div>
    </article>
  );
}
