import StatsCard from '../StatsCard';
import { CheckCircle } from 'lucide-react';

export default function StatsCardExample() {
  return (
    <div className="p-8 max-w-sm">
      <StatsCard
        icon={CheckCircle}
        label="Total Interviews"
        value={24}
      />
    </div>
  );
}
