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

const activeServices = [
  { name: "Foto's", description: "Familiefoto's en herinneringen", href: "https://fotos.voshuizen14.nl", icon: "camera", active: true },
  { name: "Wachtwoorden", description: "Veilig wachtwoordbeheer", href: "https://vault.voshuizen14.nl", icon: "shield", active: true },
];

const comingSoon = [
  { name: "Recepten", description: "Onze favoriete recepten", href: "https://recepten.voshuizen14.nl", icon: "book", active: false },
  { name: "Bestanden", description: "Gedeelde bestanden", href: "https://bestanden.voshuizen14.nl", icon: "folder", active: false },
  { name: "Media", description: "Films en series", href: "https://media.voshuizen14.nl", icon: "play", active: false },
  { name: "Status", description: "Zijn alle diensten online?", href: "https://status.voshuizen14.nl", icon: "activity", active: false },
];

function WidgetFallback() {
  return (
    <div className="glass-card p-6 animate-pulse">
      <div className="h-3 w-16 rounded-full bg-accent/10 mb-5" />
      <div className="h-5 w-3/4 rounded-full bg-accent/5 mb-3" />
      <div className="h-4 w-1/2 rounded-full bg-accent/5" />
    </div>
  );
}

export default function Home() {
  return (
    <main className="min-h-screen px-4 py-8 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-4xl">

        {/* Header */}
        <header className="mb-10 text-center animate-entrance animate-entrance-1">
          <h1 className="font-display text-6xl sm:text-8xl font-bold tracking-tight mb-1">
            Voshuizen{" "}
            <span className="number-glow">14</span>
          </h1>
          <p className="text-muted text-xs tracking-[0.3em] uppercase mt-2">
            Lieren &middot; Welkom thuis
          </p>
        </header>

        {/* Info bar */}
        <div className="mb-10 animate-entrance animate-entrance-2">
          <div className="flex items-center justify-center gap-6 text-sm text-muted/80">
            <Clock />
            <span className="text-accent/30">|</span>
            <WeatherWidget />
          </div>
        </div>

        {/* News Hero */}
        <section className="mb-8 animate-hero animate-entrance-3">
          <Suspense fallback={<WidgetFallback />}>
            <NewsWidget />
          </Suspense>
        </section>

        {/* Two-column grid */}
        <section className="mb-6 grid grid-cols-1 gap-5 sm:grid-cols-2">
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
        <section className="mb-16 animate-entrance animate-entrance-6">
          <QuickLinks />
        </section>

        {/* Golden line */}
        <div className="golden-line mb-8 animate-entrance animate-entrance-7" />

        {/* Active services */}
        <section className="animate-entrance animate-entrance-7 mb-10">
          <h2 className="widget-label text-center mb-6">Services</h2>
          <div className="grid grid-cols-3 gap-3 sm:grid-cols-6">
            {activeServices.map((service) => (
              <ServiceCard key={service.name} {...service} />
            ))}
          </div>
        </section>

        {/* Coming soon */}
        <section className="animate-entrance animate-entrance-7">
          <h2 className="widget-label text-center mb-6">Binnenkort beschikbaar</h2>
          <div className="grid grid-cols-3 gap-3 sm:grid-cols-6">
            {comingSoon.map((service) => (
              <ServiceCard key={service.name} {...service} />
            ))}
          </div>
        </section>

        {/* Footer */}
        <footer className="mt-20 pb-8 text-center">
          <p className="text-[0.55rem] text-muted/30 tracking-[0.3em] uppercase">
            Voshuizen 14 &middot; Lieren
          </p>
        </footer>
      </div>
    </main>
  );
}
