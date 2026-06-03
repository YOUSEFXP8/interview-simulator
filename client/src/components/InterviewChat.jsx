import { useState, useEffect } from "react";
import { useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { apiFetch } from "@/utils/api";

function FeedbackPanel({ evaluation }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="mt-2 w-full max-w-lg rounded-xl border border-accent/25 bg-accent/5 overflow-hidden transition-all shadow-md">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between px-4 py-2.5 text-xs font-bold text-accent hover:bg-accent/10 transition-colors"
      >
        <span className="flex items-center gap-1.5">
          <span>💡</span> Real-time Performance Feedback
        </span>
        <span className="flex items-center gap-2">
          <span className="rounded-full bg-accent/15 px-2 py-0.5 font-extrabold text-[10px]">
            Score: {evaluation.score}%
          </span>
          <svg
            className={`h-4 w-4 transform transition-transform ${isOpen ? "rotate-180" : ""}`}
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth="2"
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
          </svg>
        </span>
      </button>

      {isOpen && (
        <div className="px-4 pb-3.5 pt-1.5 text-xs space-y-2.5 border-t border-accent/10 animate-in fade-in slide-in-from-top-1 duration-150 text-muted-foreground leading-relaxed">
          <div>
            <strong className="text-foreground">Strengths:</strong>
            <p className="mt-0.5">{evaluation.strengths}</p>
          </div>
          <div>
            <strong className="text-foreground">Weaknesses:</strong>
            <p className="mt-0.5">{evaluation.weaknesses}</p>
          </div>
          <div>
            <strong className="text-foreground">Coaching Tip:</strong>
            <p className="mt-0.5">{evaluation.feedback}</p>
          </div>
        </div>
      )}
    </div>
  );
}

export default function InterviewChat() {
  const [, navigate] = useLocation();
  
  const sessionId = sessionStorage.getItem("currentSessionId");
  const role = sessionStorage.getItem("interviewRole") || "General Practice";
  const difficulty = sessionStorage.getItem("interviewDifficulty") || "Mid-Level";
  const resumeName = sessionStorage.getItem("resumeName");

  const [backendQuestions, setBackendQuestions] = useState([]);
  const [messages, setMessages] = useState([]);
  const [answer, setAnswer] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [isEnding, setIsEnding] = useState(false);

  // Load questions for the session
  useEffect(() => {
    if (!sessionId) {
      navigate("/practice", { replace: true });
      return;
    }

    const loadQuestions = async () => {
      try {
        const saved = sessionStorage.getItem("interviewQuestions");
        let list = [];
        
        if (saved) {
          list = JSON.parse(saved);
        } else {
          list = await apiFetch(`/api/question/session/${sessionId}`);
          if (list.length === 0) {
            list = await apiFetch("/api/question/generate", {
              method: "POST",
              body: JSON.stringify({
                interviewSessionId: sessionId,
                count: 4,
              }),
            });
          }
          sessionStorage.setItem("interviewQuestions", JSON.stringify(list));
        }

        setBackendQuestions(list);

        if (list.length > 0) {
          setMessages([
            {
              role: "ai",
              text: `Welcome. ${resumeName ? `I will use ${resumeName} as context. ` : ""}Let's begin: ${list[0].content}`,
              questionId: list[0].id,
            },
          ]);
        }
      } catch (err) {
        console.error("Failed to load questions", err);
        navigate("/practice", { replace: true });
      }
    };

    loadQuestions();
  }, [sessionId, role, difficulty, resumeName, navigate]);

  // Listen to SignalR evaluation completion notifications
  useEffect(() => {
    const handleEvaluationCompleted = async (e) => {
      const data = e.detail;
      const ansId = data.answerId || data.AnswerId;
      
      try {
        const details = await apiFetch(`/api/evaluation/${ansId}`);
        setMessages((current) =>
          current.map((msg) => {
            if (msg.role === "user" && msg.answerId === ansId) {
              return {
                ...msg,
                evaluating: false,
                evaluation: {
                  score: details.score,
                  strengths: details.strengths,
                  weaknesses: details.weaknesses,
                  feedback: details.feedback,
                },
              };
            }
            return msg;
          })
        );
      } catch (err) {
        console.error("Failed to fetch evaluation details", err);
      }
    };

    window.addEventListener("EvaluationCompleted", handleEvaluationCompleted);
    return () => window.removeEventListener("EvaluationCompleted", handleEvaluationCompleted);
  }, []);

  const sendAnswer = async () => {
    if (!answer.trim() || isTyping) return;
    
    const userText = answer.trim();
    
    // Find active question being answered
    const activeQuestion = [...messages].reverse().find(msg => msg.role === "ai" && msg.questionId);
    if (!activeQuestion) return;

    // Place user answer bubble immediately
    const tempMessageIndex = messages.length;
    setMessages((current) => [
      ...current,
      {
        role: "user",
        text: userText,
        questionId: activeQuestion.questionId,
        answerId: null,
        evaluating: true,
        evaluation: null,
      },
    ]);
    setAnswer("");
    setIsTyping(true);

    try {
      // 1. Submit answer to backend
      const answerDto = await apiFetch("/api/answer", {
        method: "POST",
        body: JSON.stringify({
          questionId: activeQuestion.questionId,
          content: userText,
        }),
      });

      // Update message with answerId
      setMessages((current) =>
        current.map((msg, index) =>
          index === tempMessageIndex ? { ...msg, answerId: answerDto.id } : msg
        )
      );

      // 2. Queue AI evaluation
      await apiFetch(`/api/evaluation/${answerDto.id}`, {
        method: "POST",
      });
    } catch (err) {
      console.error("Failed to submit answer or request evaluation", err);
      setMessages((current) =>
        current.map((msg, index) =>
          index === tempMessageIndex ? { ...msg, evaluating: false } : msg
        )
      );
    }

    // AI typing/thinking transition
    await new Promise((resolve) => setTimeout(resolve, 1500));

    // Move to next question
    const currentAnswerCount = messages.filter((msg) => msg.role === "user").length + 1;

    if (currentAnswerCount < backendQuestions.length) {
      const nextQ = backendQuestions[currentAnswerCount];
      setMessages((current) => [
        ...current,
        {
          role: "ai",
          text: nextQ.content,
          questionId: nextQ.id,
        },
      ]);
    } else {
      setMessages((current) => [
        ...current,
        {
          role: "ai",
          text: "Excellent work! You have finished all your practice questions. Click 'End Interview' above to complete the session and review your performance report.",
        },
      ]);
    }
    
    setIsTyping(false);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendAnswer();
    }
  };

  const endInterview = async () => {
    if (isEnding) return;
    setIsEnding(true);

    try {
      if (sessionId) {
        // Complete the session
        await apiFetch(`/api/interview/${sessionId}/complete`, {
          method: "PUT",
        });
      }
    } catch (err) {
      console.error("Failed to complete interview session on server", err);
    } finally {
      sessionStorage.removeItem("currentSessionId");
      sessionStorage.removeItem("interviewQuestions");
      sessionStorage.removeItem("interviewRole");
      sessionStorage.removeItem("interviewDifficulty");
      setIsEnding(false);
      navigate("/history", { replace: true });
    }
  };

  return (
    <div className="flex min-h-screen flex-col bg-background text-foreground animate-fade-in">
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
                {role} ({difficulty})
              </p>
            </div>
          </div>
          <Button
            variant="outline"
            onClick={endInterview}
            disabled={isEnding}
            className="border-destructive/30 text-destructive hover:bg-destructive/10 hover:border-destructive/60 hover:text-destructive shrink-0"
          >
            {isEnding ? "Saving..." : "End Interview"}
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

              {message.role === "user" && (
                <div className="w-full max-w-[min(38rem,92%)] flex justify-start">
                  {message.evaluating && (
                    <div className="mt-1 inline-flex items-center gap-1.5 text-[10px] text-muted-foreground bg-muted/20 border border-border px-2.5 py-1 rounded-md animate-pulse">
                      <svg className="animate-spin h-3 w-3 text-primary" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                      </svg>
                      Evaluating answer...
                    </div>
                  )}
                  {!message.evaluating && message.evaluation && (
                    <FeedbackPanel evaluation={message.evaluation} />
                  )}
                </div>
              )}
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
              disabled={isTyping || isEnding}
              className="min-h-16 flex-1 resize-none rounded-xl border border-border/80 bg-muted/30 p-3 text-sm text-foreground outline-none transition placeholder:text-muted-foreground/60 focus:border-primary focus:bg-muted/10 focus:ring-2 focus:ring-primary/20 disabled:opacity-50"
              placeholder={isTyping ? "AI Coach is preparing next response..." : "Type your response here... (Press Enter to send)"}
              aria-label="Interview answer text"
            />
            <Button
              disabled={!answer.trim() || isTyping || isEnding}
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
