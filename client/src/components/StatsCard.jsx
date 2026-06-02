export default function StatsCard({ label, value }) {
  return (
    <div className="glow-on-hover rounded-xl border border-border/80 bg-card/50 p-5 shadow-md backdrop-blur-sm hover:bg-card/75">
      <p className="text-xs font-bold uppercase tracking-wider text-muted-foreground">{label}</p>
      <p className="mt-2.5 font-heading text-3xl font-extrabold text-primary tracking-tight">{value}</p>
    </div>
  );
}
