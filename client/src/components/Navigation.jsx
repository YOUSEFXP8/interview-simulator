import { Link, useLocation } from "wouter";
import { useAuth } from "@/context/AuthContext";

export default function Navigation() {
  const [location] = useLocation();
  const { user, logout } = useAuth();

  const links = [
    { href: "/", label: "Home" },
    { href: "/practice", label: "Practice" },
    { href: "/history", label: "History" },
  ];

  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-border bg-background/85 backdrop-blur">
      <nav className="mx-auto flex min-h-16 max-w-7xl flex-wrap items-center justify-between gap-4 px-4 py-3 sm:px-6">
        {/* Left: Logo */}
        <Link href="/" className="font-heading text-xl font-bold text-foreground">
          InterviewAI
        </Link>

        {/* Center: Navigation Links */}
        <div className="flex items-center gap-1.5 rounded-md border border-border bg-muted/70 p-1">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`rounded px-3 py-1.5 text-sm font-medium transition ${
                location === link.href
                  ? "bg-primary text-primary-foreground shadow-sm"
                  : "text-muted-foreground hover:bg-secondary hover:text-foreground"
              }`}
            >
              {link.label}
            </Link>
          ))}
        </div>

        {/* Right: Auth Options */}
        <div className="flex items-center gap-3">
          {user ? (
            <div className="flex items-center gap-4">
              <span className="hidden text-sm text-muted-foreground sm:inline-block">
                Hello, <span className="font-semibold text-foreground">{user.name}</span>
              </span>
              <button
                onClick={logout}
                className="rounded-md border border-border bg-card/75 px-3 py-1.5 text-sm font-semibold text-foreground transition-all hover:border-destructive/40 hover:bg-destructive/10 hover:text-destructive focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-destructive/30"
              >
                Sign Out
              </button>
            </div>
          ) : (
            <div className="flex items-center gap-2">
              <Link
                href="/login"
                className="rounded-md px-3 py-1.5 text-sm font-semibold text-muted-foreground transition hover:bg-secondary hover:text-foreground"
              >
                Sign In
              </Link>
              <Link
                href="/register"
                className="rounded-md bg-primary px-3 py-1.5 text-sm font-semibold text-primary-foreground shadow-sm shadow-primary/20 transition hover:bg-primary/90"
              >
                Sign Up
              </Link>
            </div>
          )}
        </div>
      </nav>
    </header>
  );
}
