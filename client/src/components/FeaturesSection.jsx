import FeatureCard from "./FeatureCard";
import aiIcon from "@assets/generated_images/AI_questions_feature_icon_b406553c.png";
import resumeIcon from "@assets/generated_images/Resume_analysis_icon_914a2175.png";
import feedbackIcon from "@assets/generated_images/Feedback_feature_icon_905e2b71.png";

export default function FeaturesSection() {
  const features = [
    {
      icon: aiIcon,
      title: "AI-Powered Questions",
      description: "Get intelligent interview questions tailored to your resume and experience level.",
    },
    {
      icon: resumeIcon,
      title: "Resume Analysis",
      description: "Our AI analyzes your resume to ask relevant, role-specific questions.",
    },
    {
      icon: feedbackIcon,
      title: "Instant Feedback",
      description: "Receive constructive feedback on your answers to improve your performance.",
    },
  ];

  return (
    <section className="py-24 bg-background">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16 space-y-4">
          <h2 className="text-3xl md:text-4xl font-heading font-bold" data-testid="text-features-heading">
            Everything You Need to Ace Your Interview
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto" data-testid="text-features-subheading">
            Practice with confidence using our comprehensive interview preparation tools
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {features.map((feature) => (
            <FeatureCard key={feature.title} {...feature} />
          ))}
        </div>
      </div>
    </section>
  );
}
