import { Upload, Play, MessageSquare, BarChart } from "lucide-react";

export default function HowItWorks() {
  const steps = [
    {
      icon: Upload,
      title: "Upload Resume",
      description: "Upload your resume in PDF or DOCX format",
    },
    {
      icon: Play,
      title: "Start Interview",
      description: "Begin your personalized mock interview session",
    },
    {
      icon: MessageSquare,
      title: "Answer Questions",
      description: "Respond to AI-generated questions in real-time",
    },
    {
      icon: BarChart,
      title: "Review Performance",
      description: "Get detailed feedback and track your progress",
    },
  ];

  return (
    <section className="py-24 bg-card">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16 space-y-4">
          <h2 className="text-3xl md:text-4xl font-heading font-bold" data-testid="text-how-heading">
            How It Works
          </h2>
          <p className="text-lg text-muted-foreground" data-testid="text-how-subheading">
            Get started in four simple steps
          </p>
        </div>

        <div className="grid md:grid-cols-4 gap-8 relative">
          {steps.map((step, index) => {
            const Icon = step.icon;
            return (
              <div key={step.title} className="relative" data-testid={`card-step-${index + 1}`}>
                <div className="flex flex-col items-center text-center space-y-4">
                  <div className="w-16 h-16 rounded-lg bg-primary flex items-center justify-center text-primary-foreground">
                    <Icon className="h-8 w-8" data-testid={`icon-step-${index + 1}`} />
                  </div>
                  <div className="space-y-2">
                    <h3 className="text-lg font-heading font-semibold" data-testid={`text-step-title-${index + 1}`}>
                      {step.title}
                    </h3>
                    <p className="text-sm text-muted-foreground" data-testid={`text-step-description-${index + 1}`}>
                      {step.description}
                    </p>
                  </div>
                </div>
                {index < steps.length - 1 && (
                  <div className="hidden md:block absolute top-8 left-full w-full h-0.5 bg-border -translate-x-1/2" />
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
