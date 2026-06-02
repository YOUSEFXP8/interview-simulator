export default function Header() {
  return (
    <div className="flex h-15 items-center justify-between rounded-md border border-border bg-card p-5">
      <div>
        <h2 className="font-heading text-xl font-bold text-foreground">logo</h2>
      </div>

      <div className="flex gap-6 text-muted-foreground">
        <h2>Past Interviews</h2>
        <h2>User</h2>
      </div>
    </div>
  );
}
