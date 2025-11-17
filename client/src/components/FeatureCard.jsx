import { Card, CardContent } from "@/components/ui/card";

export default function FeatureCard({ icon, title, description }) {
  return (
    <Card className="hover-elevate" data-testid={`card-feature-${title.toLowerCase().replace(/\s+/g, '-')}`}>
      <CardContent className="p-6 space-y-4">
        <div className="w-16 h-16 rounded-lg bg-primary/10 flex items-center justify-center">
          <img src={icon} alt={title} className="w-10 h-10" data-testid={`img-feature-icon-${title.toLowerCase().replace(/\s+/g, '-')}`} />
        </div>
        <h3 className="text-xl font-heading font-semibold" data-testid={`text-feature-title-${title.toLowerCase().replace(/\s+/g, '-')}`}>
          {title}
        </h3>
        <p className="text-muted-foreground" data-testid={`text-feature-description-${title.toLowerCase().replace(/\s+/g, '-')}`}>
          {description}
        </p>
      </CardContent>
    </Card>
  );
}
