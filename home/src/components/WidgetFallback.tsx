export default function WidgetFallback() {
  return (
    <div className="glass-card p-6 animate-pulse">
      <div className="h-3 w-16 rounded-full bg-accent/10 mb-5" />
      <div className="h-5 w-3/4 rounded-full bg-accent/5 mb-3" />
      <div className="h-4 w-1/2 rounded-full bg-accent/5" />
    </div>
  );
}
