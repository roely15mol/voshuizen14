import { Suspense } from "react";
import { ServiceCard } from "@/components/ServiceCard";
import { WeatherWidget } from "@/components/WeatherWidget";
import { Clock } from "@/components/Clock";
import NewsWidget from "@/components/widgets/NewsWidget";
import QuoteWidget from "@/components/widgets/QuoteWidget";
import HistoryWidget from "@/components/widgets/HistoryWidget";
import FactWidget from "@/components/widgets/FactWidget";
import WasteWidget from "@/components/widgets/WasteWidget";
import QuickLinks from "@/components/widgets/QuickLinks";

const services = [
  {
    name: "Foto's",
    description: "Familiefoto's en herinneringen",
    href: "https://fotos.voshuizen14.nl",
    icon: "camera",
    active: false,
  },
  {
    name: "Recepten",
    description: "Onze favoriete recepten",
    href: "https://recepten.voshuizen14.nl",
    icon: "book",
    active: false,
  },
  {
    name: "Bestanden",
    description: "Gedeelde bestanden",
    href: "https://bestanden.voshuizen14.nl",
    icon: "folder",
    active: false,
  },
  {
    name: "Media",
    description: "Films en series",
    href: "https://media.voshuizen14.nl",
    icon: "play",
    active: false,
  },
  {
    name: "Wachtwoorden",
    description: "Veilig wachtwoordbeheer",
    href: "https://vault.voshuizen14.nl",
    icon: "shield",
    active: false,
  },
  {
    name: "Status",
    description: "Zijn alle diensten online?",
    href: "https://status.voshuizen14.nl",
    icon: "activity",
    active: false,
  },
];

function WidgetFallback() {
  return (
    <div className="glass-card p-5 animate-pulse">
      <div className="h-3 w-20 rounded-full bg-accent-light mb-4" />
      <div className="h-4 w-3/4 rounded-full bg-accent-light mb-2" />
      <div className="h-4 w-1/2 rounded-full bg-accent-light" />
    </div>
  );
}

export default function Home() {
  return (
    <main className="min-h-screen px-4 py-10 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-4xl">
        {/* Header */}
        <header className="mb-14 text-center animate-entrance animate-entrance-1">
          <div className="mb-5 inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-accent/10 shadow-lg shadow-accent/5">
            <svg className="h-7 w-7 text-accent" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" d="m2.25 12 8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25" />
            </svg>
          </div>
          <h1 className="font-display text-5xl sm:text-6xl font-semibold tracking-tight mb-3 bg-gradient-to-br from-foreground via-foreground to-muted bg-clip-text">
            Voshuizen 14
          </h1>
          <p className="text-muted text-base tracking-wide">
            Welkom thuis
          </p>
        </header>

        {/* Info bar */}
        <div className="mb-10 animate-entrance animate-entrance-2 flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-8 text-sm text-muted">
          <Clock />
          <WeatherWidget />
        </div>

        {/* Featured: News */}
        <section className="mb-5 animate-entrance animate-entrance-3">
          <Suspense fallback={<WidgetFallback />}>
            <NewsWidget />
          </Suspense>
        </section>

        {/* Two-column grid */}
        <section className="mb-5 grid grid-cols-1 gap-5 sm:grid-cols-2">
          <div className="space-y-5">
            <div className="animate-entrance animate-entrance-4">
              <QuoteWidget />
            </div>
            <div className="animate-entrance animate-entrance-5">
              <Suspense fallback={<WidgetFallback />}>
                <HistoryWidget />
              </Suspense>
            </div>
          </div>
          <div className="space-y-5">
            <div className="animate-entrance animate-entrance-4">
              <FactWidget />
            </div>
            <div className="animate-entrance animate-entrance-5">
              <Suspense fallback={<WidgetFallback />}>
                <WasteWidget />
              </Suspense>
            </div>
          </div>
        </section>

        {/* Quick links */}
        <section className="mb-12 animate-entrance animate-entrance-6">
          <QuickLinks />
        </section>

        {/* Services grid */}
        <section className="animate-entrance animate-entrance-7">
          <h2 className="widget-label mb-5">
            Services
          </h2>
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
            {services.map((service) => (
              <ServiceCard key={service.name} {...service} />
            ))}
          </div>
        </section>

        {/* Footer */}
        <footer className="mt-20 pb-8 text-center">
          <div className="inline-block h-px w-12 bg-accent/20 mb-4" />
          <p className="text-xs text-muted/60 tracking-widest uppercase">Voshuizen 14 &middot; Lieren</p>
        </footer>
      </div>
    </main>
  );
}
