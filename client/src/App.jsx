import { useEffect } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import * as signalR from "@microsoft/signalr";
import { Route, Switch, Redirect } from "wouter";

import { AuthProvider, useAuth } from "@/context/AuthContext";
import History from "@/pages/History";
import Home from "@/pages/Home";
import Interview from "@/pages/Interview";
import Login from "@/pages/Login";
import Register from "@/pages/Register";
import NotFound from "@/pages/not-found";
import Practice from "@/pages/Practice";

const queryClient = new QueryClient();

function useEvaluationHub() {
  useEffect(() => {
    const hubUrl = "https://localhost:7265/hubs/evaluation";
    if (!hubUrl) return undefined;

    const connection = new signalR.HubConnectionBuilder()
      .withUrl(hubUrl)
      .withAutomaticReconnect()
      .build();

    connection.on("EvaluationCompleted", (data) => {
      console.log("EvaluationCompleted:", data);
    });
    connection.start()
      .then(() => console.log("SignalR Connected"))
      .catch(err => console.error(err));

    return () => {
      connection.stop().catch(() => undefined);
    };
  }, []);
}

function ProtectedRoute({ path, component: Component }) {
  const { user, loading } = useAuth();

  return (
    <Route path={path}>
      {(params) => {
        if (loading) {
          return (
            <div className="flex min-h-screen items-center justify-center bg-background text-foreground">
              <div className="text-center space-y-4">
                <svg className="animate-spin h-10 w-10 text-primary mx-auto" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                </svg>
                <p className="text-muted-foreground text-sm font-medium animate-pulse">Verifying session...</p>
              </div>
            </div>
          );
        }
        return user ? <Component {...params} /> : <Redirect to="/login" />;
      }}
    </Route>
  );
}

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/login" component={Login} />
      <Route path="/register" component={Register} />
      <ProtectedRoute path="/practice" component={Practice} />
      <ProtectedRoute path="/interview" component={Interview} />
      <ProtectedRoute path="/history" component={History} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  useEvaluationHub();

  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <Router />
      </AuthProvider>
    </QueryClientProvider>
  );
}

export default App;
