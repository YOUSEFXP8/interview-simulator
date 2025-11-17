import { Card, CardContent } from "@/components/ui/card";

export default function StatsCard({ icon: Icon, label, value, iconColor = "text-primary" }) {
  return (
    <Card data-testid={`card-stat-${label.toLowerCase().replace(/\s+/g, '-')}`}>
      <CardContent className="p-6">
        <div className="flex items-center justify-between gap-4">
          <div className="space-y-1">
            <p className="text-sm text-muted-foreground" data-testid={`text-stat-label-${label.toLowerCase().replace(/\s+/g, '-')}`}>
              {label}
            </p>
            <p className="text-3xl font-heading font-bold" data-testid={`text-stat-value-${label.toLowerCase().replace(/\s+/g, '-')}`}>
              {value}
            </p>
          </div>
          <div className={`w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center ${iconColor}`}>
            <Icon className="h-6 w-6" data-testid={`icon-stat-${label.toLowerCase().replace(/\s+/g, '-')}`} />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
