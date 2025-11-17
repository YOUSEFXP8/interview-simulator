import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Send, Pause, Play, Square } from "lucide-react";
import ChatMessage from "./ChatMessage";
import TypingIndicator from "./TypingIndicator";

interface Message {
  id: string;
  role: "ai" | "user";
  content: string;
  timestamp: string;
}

export default function InterviewChat() {
  //todo: remove mock functionality
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      role: "ai",
      content: "Hello! I'll be conducting your interview today based on your resume. Let's start with an introductory question: Can you tell me about yourself and what attracted you to this role?",
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    },
  ]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [timer, setTimer] = useState(0);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const interval = setInterval(() => {
      if (!isPaused) {
        setTimer((prev) => prev + 1);
      }
    }, 1000);
    return () => clearInterval(interval);
  }, [isPaused]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isTyping]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
  };

  const handleSend = () => {
    if (!input.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      role: "user",
      content: input,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setIsTyping(true);

    //todo: remove mock functionality
    setTimeout(() => {
      const mockResponses = [
        "That's a great answer! Can you elaborate on a specific project where you demonstrated leadership?",
        "Interesting perspective. How do you handle conflicts in a team environment?",
        "Can you walk me through your problem-solving process with a recent technical challenge?",
        "What are your greatest strengths and how do they apply to this position?",
      ];

      const aiMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: "ai",
        content: mockResponses[Math.floor(Math.random() * mockResponses.length)],
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };

      setMessages((prev) => [...prev, aiMessage]);
      setIsTyping(false);
    }, 2000);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const handleEndInterview = () => {
    console.log("Interview ended");
  };

  return (
    <div className="flex flex-col h-screen">
      <div className="border-b bg-background/80 backdrop-blur-md sticky top-0 z-10">
        <div className="max-w-4xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between gap-4">
            <div className="space-y-1">
              <h2 className="text-lg font-heading font-semibold" data-testid="text-interview-title">
                Mock Interview Session
              </h2>
              <div className="flex items-center gap-2">
                <Badge variant="secondary" data-testid="badge-timer">
                  {formatTime(timer)}
                </Badge>
                <Badge variant="outline" data-testid="badge-status">
                  {isPaused ? "Paused" : "In Progress"}
                </Badge>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <Button
                size="icon"
                variant="outline"
                onClick={() => {
                  setIsPaused(!isPaused);
                  console.log(isPaused ? "Resumed" : "Paused");
                }}
                data-testid="button-pause-resume"
              >
                {isPaused ? <Play className="h-4 w-4" /> : <Pause className="h-4 w-4" />}
              </Button>
              <Button
                variant="destructive"
                onClick={handleEndInterview}
                data-testid="button-end-interview"
              >
                <Square className="h-4 w-4 mr-2" />
                End Interview
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto bg-background">
        <div className="max-w-4xl mx-auto px-6 py-8 space-y-6">
          {messages.map((message) => (
            <ChatMessage key={message.id} {...message} />
          ))}
          {isTyping && <TypingIndicator />}
          <div ref={messagesEndRef} />
        </div>
      </div>

      <div className="border-t bg-background sticky bottom-0">
        <div className="max-w-4xl mx-auto px-6 py-4">
          <Card>
            <div className="flex gap-2 p-2">
              <Textarea
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyPress}
                placeholder="Type your answer here... (Press Enter to send, Shift+Enter for new line)"
                className="resize-none border-0 focus-visible:ring-0 min-h-[60px]"
                data-testid="input-message"
              />
              <Button
                size="icon"
                onClick={handleSend}
                disabled={!input.trim()}
                className="self-end"
                data-testid="button-send"
              >
                <Send className="h-4 w-4" />
              </Button>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
