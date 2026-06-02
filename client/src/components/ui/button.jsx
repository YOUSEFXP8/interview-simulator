export function Button({ className = "", size = "default", variant = "default", ...props }) {
  const sizeClass = size === "lg" ? "min-h-12 px-6 py-3 text-base" : "min-h-10 px-4 py-2 text-sm";
  const variantClass =
    variant === "outline"
      ? "border border-border bg-card/70 text-foreground shadow-sm hover:border-primary/70 hover:bg-secondary"
      : "bg-primary text-primary-foreground shadow-sm shadow-primary/20 hover:bg-primary/90";

  return (
    <button
      className={`inline-flex items-center justify-center rounded-md font-semibold transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:cursor-not-allowed disabled:bg-muted disabled:text-muted-foreground disabled:shadow-none ${sizeClass} ${variantClass} ${className}`}
      {...props}
    />
  );
}
