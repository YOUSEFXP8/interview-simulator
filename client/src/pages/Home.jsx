import { Link } from "wouter";
import FeaturesSection from "@/components/FeaturesSection";
import HeroSection from "@/components/HeroSection";
import HowItWorks from "@/components/HowItWorks";
import Navigation from "@/components/Navigation";
import { Button } from "@/components/ui/button";

export default function Home() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navigation />
      <HeroSection />
      <FeaturesSection />
      <HowItWorks />

      <section className="py-20 px-4 sm:px-6">
        <div className="mx-auto max-w-5xl rounded-3xl border border-primary/20 bg-gradient-to-br from-card/90 via-card/70 to-muted/95 p-12 text-center shadow-xl shadow-primary/5 relative overflow-hidden">
          {/* Subtle background blur glow inside card */}
          <div className="absolute -top-24 -left-24 -z-10 h-48 w-48 rounded-full bg-primary/10 blur-[80px]" />
          <div className="absolute -bottom-24 -right-24 -z-10 h-48 w-48 rounded-full bg-emerald-500/10 blur-[80px]" />
          
          <div className="mx-auto max-w-2xl space-y-6 relative z-10">
            <h2 className="font-heading text-3xl font-extrabold tracking-tight text-foreground sm:text-4xl">
              Ready to ace your next interview?
            </h2>
            <p className="text-base leading-7 text-muted-foreground">
              Start practicing today. Build deep confidence, master STAR formatting, and refine your answers one guided simulation at a time.
            </p>
            <div className="pt-4">
              <Link href="/practice">
                <Button size="lg" className="px-8 font-semibold shadow-md shadow-primary/10 hover:shadow-primary/25">
                  Start Your Practice Session
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      <footer className="py-10">
        <div className="mx-auto max-w-7xl px-4 text-center text-sm text-muted-foreground sm:px-6">
          &copy; 2026 InterviewAI. All rights reserved.
        </div>
      </footer>
    </div>
  );
}
