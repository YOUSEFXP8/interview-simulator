import InterviewHistoryCard from '../InterviewHistoryCard';

export default function InterviewHistoryCardExample() {
  return (
    <div className="p-8 max-w-3xl space-y-4">
      <InterviewHistoryCard
        date="Nov 15, 2025"
        position="Senior Frontend Developer"
        duration="32 min"
        status="completed"
        score={85}
      />
      <InterviewHistoryCard
        date="Nov 16, 2025"
        position="Product Manager"
        duration="45 min"
        status="completed"
        score={92}
      />
    </div>
  );
}
