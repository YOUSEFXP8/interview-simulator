import Navigation from "@/components/Navigation";
import HeroSection from "@/components/HeroSection";
import FeaturesSection from "@/components/FeaturesSection";
import HowItWorks from "@/components/HowItWorks";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";

export default function Home() {
  return (
    <div className="min-h-screen">
      <Navigation />
      <HeroSection />
      <FeaturesSection />
      <HowItWorks />
      
      <section className="py-24 bg-primary text-primary-foreground">
        <div className="max-w-4xl mx-auto px-6 text-center space-y-6">
          <h2 className="text-3xl md:text-4xl font-heading font-bold" data-testid="text-cta-heading">
            Ready to Ace Your Next Interview?
          </h2>
          <p className="text-lg opacity-90" data-testid="text-cta-description">
            Start practicing today with our AI-powered interview simulator. 
            Build confidence and improve your interview skills.
          </p>
          <Link href="/practice">
            <Button
              size="lg"
              className="bg-background text-foreground hover:bg-background/90"
              data-testid="button-cta-start"
            >
              Start Your Practice Interview
            </Button>
          </Link>
        </div>
      </section>

      <footer className="py-12 border-t">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <p className="text-muted-foreground" data-testid="text-footer">
            © 2025 InterviewAI. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}
