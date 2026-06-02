import { Link } from "wouter";
import { Button } from "@/components/ui/button";

export default function HeroSection() {
  return (
    <section className="relative overflow-hidden pt-36 pb-20 text-foreground">
      {/* Background glow effects */}
      <div className="absolute top-1/4 left-1/2 -z-10 h-[500px] w-[500px] -translate-x-1/2 rounded-full bg-primary/5 blur-[120px]" />
      
      <div className="mx-auto grid max-w-7xl items-center gap-12 px-4 sm:px-6 lg:grid-cols-12">
        <div className="max-w-3xl space-y-8 lg:col-span-7">
          <div className="inline-flex items-center gap-2.5 rounded-full border border-primary/20 bg-primary/5 px-4 py-1.5 text-sm font-medium text-primary">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-primary opacity-75"></span>
              <span className="relative inline-flex h-2 w-2 rounded-full bg-primary"></span>
            </span>
            AI-Powered Rehearsal Workspace
          </div>
          
          <h1 className="font-heading text-4xl font-extrabold tracking-tight text-foreground sm:text-5xl md:text-6xl leading-[1.1]">
            Practice interviews with <span className="bg-gradient-to-r from-primary to-emerald-400 bg-clip-text text-transparent">focused AI coaching</span>
          </h1>
          
          <p className="max-w-2xl text-lg leading-8 text-muted-foreground sm:text-xl">
            Upload your resume, start a realistic mock interview customized to your background, and get instant feedback on your answers.
          </p>
          
          <div className="flex flex-wrap items-center gap-4 pt-2">
            <Link href="/practice">
              <Button size="lg" className="px-8 font-semibold shadow-md shadow-primary/10 hover:shadow-primary/25">
                Start Practicing
              </Button>
            </Link>
            <a href="#how-it-works" className="inline-flex items-center justify-center rounded-md px-5 py-3 text-sm font-semibold text-muted-foreground hover:text-foreground transition-colors">
              How it works &rarr;
            </a>
          </div>
        </div>

        {/* Right side: Mockup Dialogue panel */}
        <div className="lg:col-span-5 float-animation">
          <div className="rounded-2xl border border-border/80 bg-card/60 p-5 shadow-2xl backdrop-blur-md relative">
            {/* Top Bar simulating a browser header / chat header */}
            <div className="mb-5 flex items-center justify-between border-b border-border/60 pb-3">
              <div className="flex items-center gap-3">
                <div className="relative flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 border border-primary/20">
                  <svg className="h-5 w-5 text-primary" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904L9 21l8.982-8.061C18.674 12.34 18.23 11 17.18 11H12.23a.75.75 0 01-.707-.496L12.5 5.5l-8.982 8.061C2.826 14.16 3.27 15.5 4.32 15.5h4.95a.75.75 0 01.707.496z" />
                  </svg>
                  <span className="absolute bottom-0 right-0 h-2.5 w-2.5 rounded-full bg-primary border-2 border-card" />
                </div>
                <div>
                  <div className="font-heading text-sm font-bold text-foreground">AI Coach</div>
                  <div className="text-xs text-muted-foreground">Session: Senior Frontend Dev</div>
                </div>
              </div>
              <div className="flex gap-1.5">
                <span className="h-2 w-2 rounded-full bg-red-500/60" />
                <span className="h-2 w-2 rounded-full bg-yellow-500/60" />
                <span className="h-2 w-2 rounded-full bg-green-500/60" />
              </div>
            </div>

            {/* Chat Bubble Flow */}
            <div className="space-y-4">
              {/* Question */}
              <div className="space-y-1">
                <span className="text-[10px] uppercase font-semibold tracking-wider text-muted-foreground">Interviewer</span>
                <div className="rounded-xl rounded-tl-none border border-border/80 bg-muted/65 p-3.5 text-sm leading-6 text-card-foreground">
                  Tell me about a project from your resume where you had a measurable engineering impact.
                </div>
              </div>

              {/* Answer */}
              <div className="space-y-1 text-right">
                <span className="text-[10px] uppercase font-semibold tracking-wider text-primary">Candidate</span>
                <div className="inline-block text-left rounded-xl rounded-tr-none bg-gradient-to-br from-primary to-emerald-600 p-3.5 text-sm leading-6 text-primary-foreground shadow-sm shadow-primary/10">
                  I optimized our data ingestion pipeline, reducing processing latency by 45% using Redis caching and message queues...
                </div>
              </div>

              {/* Feedback Popover */}
              <div className="rounded-xl border border-accent/20 bg-accent/5 p-3.5 text-xs text-accent-foreground shadow-sm flex gap-3 items-start animate-pulse">
                <div className="h-5 w-5 shrink-0 rounded-full bg-accent/20 flex items-center justify-center text-accent mt-0.5">
                  💡
                </div>
                <div>
                  <span className="font-semibold text-accent">Real-time Coaching Feedback:</span>
                  <p className="mt-1 leading-5 text-muted-foreground">Excellent STAR structure and clear metrics. Add a sentence describing how you monitored system stability post-launch to secure a perfect score.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
