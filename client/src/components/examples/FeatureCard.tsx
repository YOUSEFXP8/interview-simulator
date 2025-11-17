import FeatureCard from '../FeatureCard';
import aiIcon from '@assets/generated_images/AI_questions_feature_icon_b406553c.png';

export default function FeatureCardExample() {
  return (
    <div className="p-8 max-w-sm">
      <FeatureCard
        icon={aiIcon}
        title="AI-Powered Questions"
        description="Get intelligent interview questions tailored to your resume and experience level."
      />
    </div>
  );
}
