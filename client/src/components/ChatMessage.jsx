import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";

const roleCopy = {
  ai: {
    name: "AI Interviewer",
    fallback: "AI",
  },
  user: {
    name: "You",
    fallback: "U",
  },
};

export default function ChatMessage({ role = "ai", content, timestamp }) {
  const meta = roleCopy[role] ?? roleCopy.ai;
  const isUser = role === "user";

  return (
    <div
      className={cn(
        "flex items-start gap-3",
        isUser ? "flex-row-reverse text-right" : "text-left"
      )}
    >
      <Avatar className="h-9 w-9 border">
        <AvatarFallback>{meta.fallback}</AvatarFallback>
      </Avatar>
      <div className={cn("space-y-1", isUser && "items-end flex flex-col")}>
        <div className="text-xs uppercase tracking-wide text-muted-foreground">
          {meta.name} • {timestamp}
        </div>
        <Card
          className={cn(
            "p-3 text-sm leading-relaxed shadow-sm",
            isUser
              ? "bg-primary text-primary-foreground"
              : "bg-muted/70 text-muted-foreground"
          )}
        >
          {content}
        </Card>
      </div>
    </div>
  );
}
