import ChatMessage from '../ChatMessage';

export default function ChatMessageExample() {
  return (
    <div className="p-8 space-y-4 max-w-3xl">
      <ChatMessage
        role="ai"
        content="Hello! I'll be conducting your interview today. Let's start with a simple question: Can you tell me about yourself and your professional background?"
        timestamp="10:30 AM"
      />
      <ChatMessage
        role="user"
        content="Sure! I'm a software engineer with 5 years of experience in full-stack development. I've worked extensively with React, Node.js, and cloud technologies."
        timestamp="10:31 AM"
      />
    </div>
  );
}
