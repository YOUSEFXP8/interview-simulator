import { useState, useEffect } from "react";
import { useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { apiFetch } from "@/utils/api";

export default function ResumeUpload() {
  const [, navigate] = useLocation();
  const [fileName, setFileName] = useState("");
  const [error, setError] = useState("");

  const [role, setRole] = useState("Software Engineer");
  const [difficulty, setDifficulty] = useState("Mid-Level");

  const [uploadedResumeId, setUploadedResumeId] = useState("");
  const [isUploading, setIsUploading] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [isStarting, setIsStarting] = useState(false);

  // Listen to SignalR processed notifications via global DOM events
  useEffect(() => {
    if (!uploadedResumeId) return;

    const handleProcessed = (e) => {
      const data = e.detail;
      // Match case-insensitively and support both camelCase and PascalCase
      const resId = data.resumeId || data.ResumeId;
      if (resId && resId.toLowerCase() === uploadedResumeId.toLowerCase()) {
        setIsProcessing(false);
        setFileName(sessionStorage.getItem("tempResumeName") || "resume.pdf");
        sessionStorage.setItem(
          "resumeName",
          sessionStorage.getItem("tempResumeName") || "resume.pdf",
        );
        sessionStorage.setItem("resumeId", uploadedResumeId);
      }
    };

    window.addEventListener("ResumeProcessed", handleProcessed);
    return () => window.removeEventListener("ResumeProcessed", handleProcessed);
  }, [uploadedResumeId]);

  const handleFileChange = async (event) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const isValidType =
      file.type === "application/pdf" ||
      file.name.toLowerCase().endsWith(".pdf");
    const isValidSize = file.size <= 10 * 1024 * 1024;

    if (!isValidType) {
      setError("Please upload a PDF resume.");
      setFileName("");
      return;
    }

    if (!isValidSize) {
      setError("Resume must be 10MB or smaller.");
      setFileName("");
      return;
    }

    setError("");
    setIsUploading(true);
    setFileName("");
    sessionStorage.setItem("tempResumeName", file.name);

    const formData = new FormData();
    formData.append("file", file);

    try {
  const response = await apiFetch("/api/resume", {
    method: "POST",
    body: formData,
  });

  setUploadedResumeId(response.id);
  setIsProcessing(true);
}catch (err) {
      setError("Failed to upload resume (Mock Mode Failed).");
      setFileName("");
      sessionStorage.removeItem("tempResumeName");
    } finally {
      setIsUploading(false);
    }
  };

  const handleClearFile = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setFileName("");
    setUploadedResumeId("");
    setIsProcessing(false);
    sessionStorage.removeItem("resumeName");
    sessionStorage.removeItem("resumeId");
    sessionStorage.removeItem("tempResumeName");
  };

  const handleStart = async (isGeneral) => {
  setIsStarting(true);
  setError("");

  try {
    if (isGeneral) {
      sessionStorage.removeItem("resumeName");
      sessionStorage.removeItem("resumeId");
    }

    const interview = await apiFetch("/api/interview", {
      method: "POST",
      body: JSON.stringify({
        role: isGeneral ? "General Practice" : role,
        difficulty: difficulty,
      }),
    });

    const questions = await apiFetch(
      "/api/question/generate",
      {
        method: "POST",
        body: JSON.stringify({
          interviewSessionId: interview.id,
          count: 5,
        }),
      }
    );

    sessionStorage.setItem(
      "currentSessionId",
      interview.id
    );

    sessionStorage.setItem(
      "interviewQuestions",
      JSON.stringify(questions)
    );

    sessionStorage.setItem(
      "interviewRole",
      interview.role
    );

    sessionStorage.setItem(
      "interviewDifficulty",
      interview.difficulty
    );

    navigate("/interview");
  } catch (err) {
    setError(
      err.message ||
      "Failed to start interview session."
    );
  } finally {
    setIsStarting(false);
  }
};

  return (
    <div className="mx-auto max-w-2xl space-y-8">
      <div className="text-center space-y-2">
        <h1 className="font-heading text-3xl font-extrabold tracking-tight text-foreground sm:text-4xl">
          Upload your resume
        </h1>
        <p className="max-w-md mx-auto text-sm text-muted-foreground leading-relaxed">
          Select your CV in PDF format. The AI coach will extract your skills
          and guide a custom discussion.
        </p>
      </div>

      {/* Role and Difficulty inputs */}
      <div className="rounded-2xl border border-border/80 bg-card/45 p-6 shadow-xl backdrop-blur-md space-y-4">
        <h3 className="font-heading text-base font-bold text-foreground">
          Interview Configuration
        </h3>
        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <label
              htmlFor="target-role"
              className="block text-xs font-semibold text-muted-foreground mb-1.5 uppercase tracking-wider"
            >
              Target Job Role
            </label>
            <input
              id="target-role"
              type="text"
              value={role}
              onChange={(e) => setRole(e.target.value)}
              placeholder="e.g. Software Engineer, Product Manager"
              disabled={isStarting || isUploading || isProcessing}
              className="block w-full rounded-md border border-border bg-muted/30 px-3.5 py-2 text-sm text-foreground placeholder:text-muted-foreground/50 transition focus:border-primary focus:bg-muted/10 focus:ring-2 focus:ring-primary/20 focus:outline-none disabled:opacity-50"
            />
          </div>
          <div>
            <label
              htmlFor="difficulty-level"
              className="block text-xs font-semibold text-muted-foreground mb-1.5 uppercase tracking-wider"
            >
              Difficulty Level
            </label>
            <select
              id="difficulty-level"
              value={difficulty}
              onChange={(e) => setDifficulty(e.target.value)}
              disabled={isStarting || isUploading || isProcessing}
              className="block w-full rounded-md border border-border bg-muted/30 px-3.5 py-2 text-sm text-foreground transition focus:border-primary focus:bg-muted/10 focus:ring-2 focus:ring-primary/20 focus:outline-none disabled:opacity-50"
            >
              <option value="Junior">Junior</option>
              <option value="Mid-Level">Mid-Level</option>
              <option value="Senior">Senior</option>
              <option value="Lead/Principal">Lead / Principal</option>
            </select>
          </div>
        </div>
      </div>

      <div className="rounded-2xl border border-border/80 bg-card/45 p-6 shadow-xl backdrop-blur-md">
        {/* Upload Zone States */}
        {!fileName && !isUploading && !isProcessing && (
          <label className="flex cursor-pointer flex-col items-center justify-center rounded-xl border-2 border-dashed border-border/75 bg-muted/20 px-6 py-10 text-center transition-all hover:border-primary/50 hover:bg-muted/40 group">
            <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 border border-primary/20 text-primary group-hover:scale-110 transition-transform">
              <svg
                className="h-6 w-6 animate-pulse"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="2"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 16.5V9.75m0 0l3 3m-3-3l-3 3M6.75 19.5a4.5 4.5 0 01-1.41-8.775 5.25 5.25 0 0110.233-2.33 3 3 0 013.758 3.848A3.752 3.752 0 0118 19.5H6.75z"
                />
              </svg>
            </div>
            <span className="text-base font-bold text-foreground">
              Click to upload CV
            </span>
            <span className="mt-1.5 text-xs text-muted-foreground max-w-xs">
              PDF format (max 10MB). Stored in the PostgreSQL database.
            </span>
            <input
              type="file"
              accept=".pdf"
              className="sr-only"
              onChange={handleFileChange}
            />
          </label>
        )}

        {isUploading && (
          <div className="rounded-xl border border-border bg-muted/15 p-8 flex flex-col items-center justify-center text-center space-y-4">
            <svg
              className="animate-spin h-8 w-8 text-primary"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              />
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
              />
            </svg>
            <div>
              <p className="text-sm font-semibold text-foreground">
                Uploading resume...
              </p>
              <p className="text-xs text-muted-foreground mt-0.5">
                Storing document securely on server
              </p>
            </div>
          </div>
        )}

        {isProcessing && (
          <div className="rounded-xl border border-primary/20 bg-primary/5 p-8 flex flex-col items-center justify-center text-center space-y-4">
            <svg
              className="animate-spin h-8 w-8 text-primary"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              />
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
              />
            </svg>
            <div>
              <p className="text-sm font-semibold text-foreground">
                Analyzing qualifications...
              </p>
              <p className="text-xs text-primary font-medium mt-0.5">
                AI is extracting skills from your resume context
              </p>
            </div>
          </div>
        )}

        {fileName && !isUploading && !isProcessing && (
          <div className="rounded-xl border border-primary/20 bg-primary/5 p-5 flex items-center justify-between gap-4 animate-in fade-in zoom-in-95 duration-200">
            <div className="flex items-center gap-3">
              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg bg-primary/15 border border-primary/30 text-primary">
                <svg
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="2"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m2.25 0H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z"
                  />
                </svg>
              </div>
              <div className="min-w-0">
                <p className="text-sm font-semibold text-foreground truncate max-w-[200px] sm:max-w-md">
                  {fileName}
                </p>
                <p className="text-xs text-primary font-medium mt-0.5">
                  Skills extracted & context set
                </p>
              </div>
            </div>
            <button
              onClick={handleClearFile}
              disabled={isStarting}
              className="rounded-lg p-2 text-muted-foreground hover:bg-primary/10 hover:text-primary transition-colors disabled:opacity-50"
              aria-label="Remove uploaded file"
            >
              <svg
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="2"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>
        )}

        {error && (
          <div className="mt-4 flex items-center gap-2 rounded-lg border border-destructive/20 bg-destructive/10 p-3.5 text-xs text-destructive animate-in fade-in duration-200">
            <svg
              className="h-4 w-4 shrink-0"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="2"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
              />
            </svg>
            <span>{error}</span>
          </div>
        )}

        {/* Action Button Row */}
        <div className="mt-6 flex flex-col sm:flex-row items-center justify-end gap-3 border-t border-border/60 pt-5">
          <Button
            variant="outline"
            onClick={() => handleStart(true)}
            disabled={isStarting || isUploading || isProcessing}
            className="w-full sm:w-auto min-h-10 flex items-center justify-center"
          >
            {isStarting && !fileName ? (
              <>
                <svg
                  className="animate-spin -ml-1 mr-2 h-4 w-4 text-foreground"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  />
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  />
                </svg>
                Loading...
              </>
            ) : (
              "Skip & Practice General"
            )}
          </Button>
          <Button
            size="default"
            disabled={!fileName || isStarting || isUploading || isProcessing}
            onClick={() => handleStart(false)}
            className="w-full sm:w-auto shadow-md shadow-primary/10 min-h-10 flex items-center justify-center"
          >
            {isStarting && fileName ? (
              <>
                <svg
                  className="animate-spin -ml-1 mr-2 h-4 w-4 text-primary-foreground"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  />
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  />
                </svg>
                Preparing...
              </>
            ) : (
              "Start Focused Interview"
            )}
          </Button>
        </div>
      </div>
    </div>
  );
}
