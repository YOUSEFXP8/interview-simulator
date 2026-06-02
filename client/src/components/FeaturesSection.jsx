const features = [
  {
    title: "Resume-Aware Prompts",
    description: "Our system parses your unique experience to tailor real-world questions customized to your specific tech stack and role seniority.",
    icon: (
      <svg className="h-6 w-6 text-primary" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
      </svg>
    ),
  },
  {
    title: "Timed Practice Mode",
    description: "Rehearse under realistic conditions with a full-screen, clean chat workspace engineered to test your pacing and delivery.",
    icon: (
      <svg className="h-6 w-6 text-emerald-400" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
  },
  {
    title: "Progress Dashboard",
    description: "Track performance analytics, read through comprehensive history logs, and identify clear improvement targets over time.",
    icon: (
      <svg className="h-6 w-6 text-accent" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" d="M7.5 14.25v2.25m3-4.5v4.5m3-6.75v6.75m3-9v9M6 20.25h12A2.25 2.25 0 0020.25 18V6A2.25 2.25 0 0018 3.75H6A2.25 2.25 0 003.75 6v12A2.25 2.25 0 006 20.25z" />
      </svg>
    ),
  },
];

export default function FeaturesSection() {
  return (
    <section className="relative py-24 bg-card/15 border-y border-border/40">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <div className="max-w-3xl space-y-4">
          <span className="text-xs font-bold uppercase tracking-widest text-primary">Everything you need</span>
          <h2 className="font-heading text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            Features built for deliberate practice
          </h2>
        </div>
        
        <div className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {features.map(({ title, description, icon }) => (
            <article
              key={title}
              className="glow-on-hover rounded-2xl border border-border/80 bg-card/50 p-8 shadow-md hover:bg-card/80 backdrop-blur-sm"
            >
              <div className="inline-flex h-12 w-12 items-center justify-center rounded-xl bg-muted/90 border border-border/60 shadow-inner mb-6">
                {icon}
              </div>
              <h3 className="font-heading text-lg font-bold text-card-foreground tracking-tight">{title}</h3>
              <p className="mt-3 text-sm leading-6 text-muted-foreground font-medium">{description}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
