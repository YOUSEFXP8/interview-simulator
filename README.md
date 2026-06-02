# InterviewAI 🚀

InterviewAI is a state-of-the-art AI-powered interview coaching application. It allows candidates to upload their resumes, engage in realistic simulated interview sessions tailored to their backgrounds, receive real-time coaching feedback, and track their preparation scores over time.

---

## 🌟 Key Features

- **Resume-Aware Prompts:** The AI parses candidate resumes (PDF/DOCX) to generate tailored engineering questions matching their exact tech stacks and experience.
- **Glassmorphic UI:** Modern dark-theme visual aesthetics with glowing card elements, micro-animations, hover elevations, and customized vector icons.
- **Interactive Chat Coach:** Realistic chat dialogue flow with a pulsing connection indicator, sticky glass inputs, and support for keydown triggers.
- **Simulated Typing Indicator:** AI interviewer exhibits a bouncing-dots thinking indicator (1.5s delay) to feel responsive and real.
- **Analytics & History Logs:** Progress dashboard compiling stats cards (e.g. average score, total sessions) and timeline indicators.
- **Client-Side Auth Persistence:** A simulated authentication provider backed by `localStorage` to manage registration, sign-ins, and secure routing (protecting practice/history rooms).

---

## 📂 Project Structure

```
interview-simulator/
├── client/          # Frontend Client (React + Vite + Tailwind CSS v4)
├── server/          # Backend Server (.NET 8/9 C# Clean Architecture)
│   ├── API/         # Web API endpoints & controllers
│   ├── Application/ # Application core, CQRS handlers, services
│   ├── Domain/      # Domain entities & business rules
│   ├── Infrastructure/# Data contexts, DB migrations, exterior clients
│   └── Workers/     # Background job processing queues
└── README.md
```

---

## ⚡ Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (v18+)
- [.NET SDK](https://dotnet.microsoft.com/download) (v8.0 or newer)

---

### Client-Side Setup (React Frontend)

1. Navigate to the client directory:
   ```bash
   cd client
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Run the local development server:
   ```bash
   npm run dev
   ```
   *The application will launch on [http://localhost:5173](http://localhost:5173).*

4. Build client assets for production:
   ```bash
   npm run build
   ```

---

### Server-Side Setup (.NET Backend)

The server is structured using **Clean Architecture** patterns in C#.

1. Navigate to the server folder:
   ```bash
   cd server
   ```

2. Restore NuGet dependencies:
   ```bash
   dotnet restore
   ```

3. Run the Web API project:
   ```bash
   dotnet run --project API/API.csproj
   ```
   *The API will start up and host Hub services on [https://localhost:7265](https://localhost:7265).*

---

## 🔒 Authentication System Details

Currently, the client operates in **Mock Auth Mode** using `localStorage` to persist users.
- Protected client routes (`/practice`, `/interview`, `/history`) check the local session and automatically redirect unauthenticated traffic to `/login`.
- When connecting to the backend server, the [AuthContext.jsx](client/src/context/AuthContext.jsx) can be updated to fetch JWT authorization tokens from the C# Identity controllers.

---

## 🛠️ Built With

- **Frontend:** React 19, Vite 7, Tailwind CSS v4, Wouter (Routing), TanStack React Query (State Management), SignalR Client.
- **Backend:** C# .NET, ASP.NET Core Web API, SignalR Hubs.
