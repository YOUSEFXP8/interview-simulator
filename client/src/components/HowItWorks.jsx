const steps = [
  {
    title: "Upload Resume",
    description: "Provide your resume in PDF or DOCX format to configure your personalized simulation workspace.",
  },
  {
    title: "Tailored Mock Interview",
    description: "Our AI model designs custom engineering questions mapping directly to your background.",
  },
  {
    title: "Rehearse Responses",
    description: "Provide answers to each follow-up question. Rehearse under timing conditions.",
  },
  {
    title: "Review Evaluation",
    description: "Get comprehensive metrics, estimated grading, and immediate coaching recommendations.",
  },
];

export default function HowItWorks() {
  return (
    <section id="how-it-works" className="relative py-24 bg-background scroll-mt-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <div className="max-w-3xl space-y-4">
          <span className="text-xs font-bold uppercase tracking-widest text-primary">Simple Workflow</span>
          <h2 className="font-heading text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            Ace your session in four steps
          </h2>
        </div>

        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {steps.map((step, index) => (
            <div
              key={step.title}
              className="glow-on-hover relative rounded-2xl border border-border/80 bg-card/40 p-6 shadow-md hover:bg-card/70 backdrop-blur-sm"
            >
              {/* Number Circle Badge */}
              <div className="mb-5 flex h-9 w-9 items-center justify-center rounded-full bg-gradient-to-br from-primary to-emerald-500 text-sm font-extrabold text-primary-foreground shadow-lg shadow-primary/20">
                {index + 1}
              </div>
              <h3 className="font-heading text-base font-bold text-card-foreground tracking-tight">{step.title}</h3>
              <p className="mt-2 text-xs leading-5 text-muted-foreground font-medium">{step.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
