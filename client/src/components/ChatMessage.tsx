import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Bot, User } from "lucide-react";

interface ChatMessageProps {
  role: "ai" | "user";
  content: string;
  timestamp?: string;
}

export default function ChatMessage({ role, content, timestamp }: ChatMessageProps) {
  const isAI = role === "ai";

  return (
    <div
      className={`flex gap-4 ${isAI ? "justify-start" : "justify-end"}`}
      data-testid={`message-${role}`}
    >
      {isAI && (
        <Avatar className="w-8 h-8 flex-shrink-0" data-testid="avatar-ai">
          <AvatarFallback className="bg-primary text-primary-foreground">
            <Bot className="h-4 w-4" />
          </AvatarFallback>
        </Avatar>
      )}

      <div className={`flex flex-col gap-1 max-w-[70%] ${isAI ? "items-start" : "items-end"}`}>
        <div
          className={`px-4 py-3 rounded-2xl ${
            isAI
              ? "bg-card border border-card-border"
              : "bg-primary text-primary-foreground"
          }`}
          data-testid={`text-message-content-${role}`}
        >
          <p className="text-sm leading-relaxed">{content}</p>
        </div>
        {timestamp && (
          <span className="text-xs text-muted-foreground px-2" data-testid={`text-timestamp-${role}`}>
            {timestamp}
          </span>
        )}
      </div>

      {!isAI && (
        <Avatar className="w-8 h-8 flex-shrink-0" data-testid="avatar-user">
          <AvatarFallback className="bg-secondary">
            <User className="h-4 w-4" />
          </AvatarFallback>
        </Avatar>
      )}
    </div>
  );
}
