import { useState } from "react";
import { useLocation } from "wouter";
import { Button } from "@/components/ui/button";

const questions = [
  "Can you walk me through a project from your resume?",
  "How do you handle tight deadlines and changing requirements?",
  "Tell me about a time you solved a difficult technical problem.",
  "What would your teammates say is your biggest strength?",
];

export default function InterviewChat() {
  const [, navigate] = useLocation();
  const resumeName = sessionStorage.getItem("resumeName");
  
  const [messages, setMessages] = useState([
    {
      role: "ai",
      text: `Welcome. ${resumeName ? `I will use ${resumeName} as context. ` : ""}Let's begin: ${questions[0]}`,
    },
  ]);
  const [answer, setAnswer] = useState("");
  const [isTyping, setIsTyping] = useState(false);

  const sendAnswer = async () => {
    if (!answer.trim() || isTyping) return;
    
    const userText = answer.trim();
    
    // Add user answer bubble immediately
    setMessages((current) => [
      ...current,
      { role: "user", text: userText },
    ]);
    setAnswer("");
    setIsTyping(true);

    // Simulate AI thinking and typing latency for realism
    await new Promise((resolve) => setTimeout(resolve, 1500));

    // Calculate current questions answered (number of user answers in messages)
    const currentAnswerCount = messages.filter((msg) => msg.role === "user").length + 1;
    const nextQuestion = questions[Math.min(currentAnswerCount, questions.length - 1)];

    setMessages((current) => [
      ...current,
      { role: "ai", text: nextQuestion },
    ]);
    setIsTyping(false);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendAnswer();
    }
  };

  const endInterview = () => {
    const history = JSON.parse(localStorage.getItem("interviewHistory") || "[]");
    const session = {
      id: crypto.randomUUID ? crypto.randomUUID() : Math.random().toString(36).substring(2, 9),
      date: new Date().toLocaleDateString(),
      position: resumeName ? `Resume review: ${resumeName}` : "General practice",
      duration: "Practice session",
      status: "completed",
      score: Math.min(95, 70 + messages.filter((message) => message.role === "user").length * 5),
    };
    localStorage.setItem("interviewHistory", JSON.stringify([session, ...history].slice(0, 10)));
    navigate("/history");
  };

  return (
    <div className="flex min-h-screen flex-col bg-background text-foreground">
      {/* Premium Chat Header */}
      <header className="sticky top-0 z-40 border-b border-border/80 bg-background/80 p-4 backdrop-blur-md">
        <div className="mx-auto flex max-w-4xl items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="relative flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 border border-primary/20 text-primary">
              <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904L9 21l8.982-8.061C18.674 12.34 18.23 11 17.18 11H12.23a.75.75 0 01-.707-.496L12.5 5.5l-8.982 8.061C2.826 14.16 3.27 15.5 4.32 15.5h4.95a.75.75 0 01.707.496z" />
              </svg>
              <span className="absolute bottom-0 right-0 h-2.5 w-2.5 rounded-full bg-primary border-2 border-background animate-pulse" />
            </div>
            <div>
              <h1 className="font-heading text-sm font-bold text-foreground">Mock Interview Coach</h1>
              <p className="text-xs text-muted-foreground truncate max-w-[200px] sm:max-w-xs">
                {resumeName ? `Resume: ${resumeName}` : "General Practice Session"}
              </p>
            </div>
          </div>
          <Button
            variant="outline"
            onClick={endInterview}
            className="border-destructive/30 text-destructive hover:bg-destructive/10 hover:border-destructive/60 hover:text-destructive shrink-0"
          >
            End Interview
          </Button>
        </div>
      </header>

      {/* Message Flow */}
      <main className="mx-auto flex w-full max-w-4xl flex-1 flex-col gap-6 px-4 py-8 sm:px-6">
        <div className="flex-1 space-y-6 pb-24">
          {messages.map((message, index) => (
            <div
              key={`${message.role}-${index}`}
              className={`flex flex-col ${message.role === "user" ? "items-end" : "items-start"} space-y-1.5 animate-in fade-in slide-in-from-bottom-2 duration-300`}
            >
              <span className={`text-[10px] uppercase font-bold tracking-wider ${message.role === "user" ? "text-primary" : "text-muted-foreground"}`}>
                {message.role === "user" ? "You" : "AI Coach"}
              </span>
              <div
                className={`max-w-[min(38rem,92%)] rounded-2xl p-4 text-sm leading-6 shadow-md transition-all ${
                  message.role === "user"
                    ? "rounded-tr-none bg-gradient-to-br from-primary to-emerald-600 text-primary-foreground font-semibold shadow-primary/5"
                    : "rounded-tl-none border border-border/80 bg-card/65 text-card-foreground backdrop-blur-sm relative before:absolute before:left-0 before:top-0 before:bottom-0 before:w-1 before:bg-primary"
                }`}
              >
                {message.text}
              </div>
            </div>
          ))}

          {/* Typing Bouncing Dots */}
          {isTyping && (
            <div className="flex flex-col items-start space-y-1.5 animate-in fade-in duration-200">
              <span className="text-[10px] uppercase font-bold tracking-wider text-muted-foreground">AI Coach</span>
              <div className="rounded-2xl rounded-tl-none border border-border/80 bg-card/65 px-5 py-4 shadow-md backdrop-blur-sm">
                <div className="flex items-center gap-1.5 h-3">
                  <span className="typing-dot h-2 w-2 rounded-full bg-primary" />
                  <span className="typing-dot h-2 w-2 rounded-full bg-primary" />
                  <span className="typing-dot h-2 w-2 rounded-full bg-primary" />
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Input Panel */}
        <div className="fixed bottom-6 left-4 right-4 z-40 mx-auto max-w-4xl">
          <div className="flex flex-col gap-3 rounded-2xl border border-border/80 bg-card/75 p-3.5 shadow-2xl backdrop-blur-md sm:flex-row items-stretch">
            <textarea
              value={answer}
              onChange={(event) => setAnswer(event.target.value)}
              onKeyDown={handleKeyDown}
              disabled={isTyping}
              className="min-h-16 flex-1 resize-none rounded-xl border border-border/80 bg-muted/30 p-3 text-sm text-foreground outline-none transition placeholder:text-muted-foreground/60 focus:border-primary focus:bg-muted/10 focus:ring-2 focus:ring-primary/20 disabled:opacity-50"
              placeholder={isTyping ? "AI Coach is preparing next response..." : "Type your response here... (Press Enter to send)"}
              aria-label="Interview answer text"
            />
            <Button
              disabled={!answer.trim() || isTyping}
              onClick={sendAnswer}
              className="px-6 font-semibold flex items-center justify-center shrink-0 self-stretch sm:self-end h-10 shadow-md shadow-primary/10 hover:shadow-primary/25 disabled:shadow-none"
            >
              Send Response
            </Button>
          </div>
        </div>
      </main>
    </div>
  );
}
