import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowRight, Brain, MessageSquare, FileText, History } from "lucide-react";
import { Link } from "wouter";

const features = [
  {
    icon: Brain,
    title: "AI-Powered Questions",
    description:
      "Get tailored technical and behavioral questions based on the role you select.",
  },
  {
    icon: MessageSquare,
    title: "Real-Time Feedback",
    description:
      "Understand how you performed with actionable insights after every response.",
  },
  {
    icon: FileText,
    title: "Resume Context",
    description:
      "Upload your resume so the interviewer can probe deeper into your real experience.",
  },
  {
    icon: History,
    title: "Session History",
    description:
      "Revisit previous interviews, track improvements, and share results with mentors.",
  },
];

export default function FeaturesSection() {
  return (
    <section className="py-24 bg-muted/30">
      <div className="max-w-6xl mx-auto px-6 space-y-12">
        <div className="space-y-4 text-center">
          <p className="text-sm font-semibold uppercase tracking-wide text-primary">
            Why InterviewAI
          </p>
          <h2
            className="text-3xl md:text-4xl font-heading font-bold"
            data-testid="text-features-heading"
          >
            Everything you need to practice with confidence
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            InterviewAI simulates a realistic interview room so you can stay sharp, receive
            instant feedback, and iterate on your answers fast.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          {features.map(({ icon: Icon, title, description }) => (
            <Card
              key={title}
              className="p-6 space-y-3 border-border/60 shadow-sm hover:shadow-lg transition-shadow"
            >
              <div className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 text-primary">
                <Icon className="h-5 w-5" />
              </div>
              <h3 className="text-xl font-semibold">{title}</h3>
              <p className="text-muted-foreground">{description}</p>
            </Card>
          ))}
        </div>

        <div className="text-center">
          <Link href="/interview">
            <Button variant="outline" size="lg" className="gap-2">
              Explore Interview Modes
              <ArrowRight className="h-4 w-4" />
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}

