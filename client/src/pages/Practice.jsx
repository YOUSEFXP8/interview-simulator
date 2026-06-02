import Navigation from "@/components/Navigation";
import ResumeUpload from "@/components/ResumeUpload";

export default function Practice() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navigation />
      <main className="pt-28 pb-12">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <ResumeUpload />
        </div>
      </main>
    </div>
  );
}
