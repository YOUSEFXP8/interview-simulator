import Navigation from "@/components/Navigation";
import ResumeUpload from "@/components/ResumeUpload";

export default function Practice() {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <main className="pt-24 pb-12">
        <div className="max-w-7xl mx-auto px-6">
          <ResumeUpload />
        </div>
      </main>
    </div>
  );
}
