import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { Link } from "wouter";
import interviewMockup from "@assets/generated_images/Interview_interface_mockup_b5071fcf.png";

export default function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center overflow-hidden bg-gradient-to-br from-primary via-primary/90 to-primary/70 dark:from-primary/90 dark:via-primary/80 dark:to-primary/60">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_50%,rgba(255,255,255,0.1),transparent_50%),radial-gradient(circle_at_70%_80%,rgba(255,255,255,0.05),transparent_50%)]" />
      
      <div className="max-w-7xl mx-auto px-6 py-24 relative z-10">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-heading font-bold text-white leading-tight">
              Master Your Interview Skills with AI
            </h1>
            <p className="text-lg md:text-xl text-white/90">
              Practice realistic interviews powered by AI. Upload your resume and get
              personalized questions tailored to your experience.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link href="/practice">
                <Button
                  size="lg"
                  className="bg-white text-primary hover:bg-white/90 border-0"
                  data-testid="button-start-practice"
                >
                  Start Practicing
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
              <Button
                size="lg"
                variant="outline"
                className="backdrop-blur-md bg-white/10 text-white border-white/30 hover:bg-white/20"
                data-testid="button-learn-more"
              >
                Learn More
              </Button>
            </div>
          </div>

          <div className="hidden md:block">
            <img
              src={interviewMockup}
              alt="Interview simulator interface"
              className="w-full h-auto rounded-lg shadow-2xl"
              data-testid="img-hero-mockup"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
