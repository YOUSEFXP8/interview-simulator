import { useState } from "react";
import { useLocation } from "wouter";
import { Button } from "@/components/ui/button";

export default function ResumeUpload() {
  const [, navigate] = useLocation();
  const [fileName, setFileName] = useState("");
  const [error, setError] = useState("");

  const handleFileChange = (event) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const isValidType = file.type === "application/pdf" || file.name.toLowerCase().endsWith(".docx");
    const isValidSize = file.size <= 10 * 1024 * 1024;

    if (!isValidType) {
      setError("Upload a PDF or DOCX resume.");
      setFileName("");
      return;
    }

    if (!isValidSize) {
      setError("Resume must be 10MB or smaller.");
      setFileName("");
      return;
    }

    setError("");
    setFileName(file.name);
    sessionStorage.setItem("resumeName", file.name);
  };

  const handleClearFile = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setFileName("");
    sessionStorage.removeItem("resumeName");
  };

  const handleSkip = () => {
    sessionStorage.removeItem("resumeName");
    navigate("/interview");
  };

  return (
    <div className="mx-auto max-w-2xl space-y-8">
      <div className="text-center space-y-2">
        <h1 className="font-heading text-3xl font-extrabold tracking-tight text-foreground sm:text-4xl">
          Upload your resume
        </h1>
        <p className="max-w-md mx-auto text-sm text-muted-foreground leading-relaxed">
          Select your CV in PDF or DOCX format. The AI coach will use the file contents to guide the simulated discussion.
        </p>
      </div>

      <div className="rounded-2xl border border-border/80 bg-card/45 p-6 shadow-xl backdrop-blur-md">
        {!fileName ? (
          <label className="flex cursor-pointer flex-col items-center justify-center rounded-xl border-2 border-dashed border-border/75 bg-muted/20 px-6 py-10 text-center transition-all hover:border-primary/50 hover:bg-muted/40 group">
            <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 border border-primary/20 text-primary group-hover:scale-110 transition-transform">
              <svg className="h-6 w-6 animate-pulse" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 16.5V9.75m0 0l3 3m-3-3l-3 3M6.75 19.5a4.5 4.5 0 01-1.41-8.775 5.25 5.25 0 0110.233-2.33 3 3 0 013.758 3.848A3.752 3.752 0 0118 19.5H6.75z" />
              </svg>
            </div>
            <span className="text-base font-bold text-foreground">Click to upload CV</span>
            <span className="mt-1.5 text-xs text-muted-foreground max-w-xs">
              PDF or DOCX (max 10MB). Stored locally in this browser.
            </span>
            <input type="file" accept=".pdf,.docx" className="sr-only" onChange={handleFileChange} />
          </label>
        ) : (
          <div className="rounded-xl border border-primary/20 bg-primary/5 p-5 flex items-center justify-between gap-4 animate-in fade-in zoom-in-95 duration-200">
            <div className="flex items-center gap-3">
              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg bg-primary/15 border border-primary/30 text-primary">
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m2.25 0H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
                </svg>
              </div>
              <div className="min-w-0">
                <p className="text-sm font-semibold text-foreground truncate max-w-md">{fileName}</p>
                <p className="text-xs text-primary font-medium mt-0.5">Resume parsed successfully</p>
              </div>
            </div>
            <button
              onClick={handleClearFile}
              className="rounded-lg p-2 text-muted-foreground hover:bg-primary/10 hover:text-primary transition-colors"
              aria-label="Remove uploaded file"
            >
              <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        )}

        {error && (
          <div className="mt-4 flex items-center gap-2 rounded-lg border border-destructive/20 bg-destructive/10 p-3.5 text-xs text-destructive animate-in fade-in duration-200">
            <svg className="h-4 w-4 shrink-0" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
            <span>{error}</span>
          </div>
        )}

        {/* Action Button Row */}
        <div className="mt-6 flex flex-col sm:flex-row items-center justify-end gap-3 border-t border-border/60 pt-5">
          <Button
            variant="outline"
            onClick={handleSkip}
            className="w-full sm:w-auto"
          >
            Skip & Practice General
          </Button>
          <Button
            size="default"
            disabled={!fileName}
            onClick={() => navigate("/interview")}
            className="w-full sm:w-auto shadow-md shadow-primary/10"
          >
            Start Focused Interview
          </Button>
        </div>
      </div>
    </div>
  );
}
