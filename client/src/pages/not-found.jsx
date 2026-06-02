import { Link } from "wouter";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background text-foreground">
      <div className="space-y-6 px-6 text-center">
        <h1 className="font-heading text-6xl font-bold text-primary">404</h1>
        <h2 className="font-heading text-2xl font-semibold">Page Not Found</h2>
        <p className="max-w-md text-muted-foreground">The page you are looking for does not exist or has been moved.</p>
        <Link href="/">
          <Button>Back to Home</Button>
        </Link>
      </div>
    </div>
  );
}
