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
  { name: "Foto's", description: "Familiefoto's en herinneringen", href: "https://fotos.voshuizen14.nl", icon: "camera", active: false },
  { name: "Recepten", description: "Onze favoriete recepten", href: "https://recepten.voshuizen14.nl", icon: "book", active: false },
  { name: "Bestanden", description: "Gedeelde bestanden", href: "https://bestanden.voshuizen14.nl", icon: "folder", active: false },
  { name: "Media", description: "Films en series", href: "https://media.voshuizen14.nl", icon: "play", active: false },
  { name: "Wachtwoorden", description: "Veilig wachtwoordbeheer", href: "https://vault.voshuizen14.nl", icon: "shield", active: false },
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
    <main className="min-h-screen px-4 py-10 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-4xl">

        {/* Header */}
        <header className="mb-16 text-center animate-entrance animate-entrance-1">
          <div className="mb-6 inline-flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-accent/20 to-accent/5 shadow-lg shadow-accent/10 ring-1 ring-accent/10">
            <svg className="h-8 w-8 text-accent" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" d="m2.25 12 8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25" />
            </svg>
          </div>
          <h1 className="font-display text-5xl sm:text-7xl font-semibold tracking-tight mb-2">
            Voshuizen <span className="bg-gradient-to-r from-accent to-[#d4944e] bg-clip-text text-transparent">14</span>
          </h1>
          <p className="text-muted text-sm tracking-[0.2em] uppercase">
            Welkom thuis
          </p>
        </header>

        {/* Info bar */}
        <div className="mb-12 animate-entrance animate-entrance-2">
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-6 text-sm text-muted">
            <Clock />
            <span className="hidden sm:inline text-accent/30">|</span>
            <WeatherWidget />
          </div>
        </div>

        {/* Featured: News */}
        <section className="mb-6 animate-entrance animate-entrance-3">
          <Suspense fallback={<WidgetFallback />}>
            <NewsWidget />
          </Suspense>
        </section>

        {/* Golden divider */}
        <div className="golden-divider mx-auto w-2/3 my-6 animate-entrance animate-entrance-3" />

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
        <section className="mb-14 animate-entrance animate-entrance-6">
          <QuickLinks />
        </section>

        {/* Services grid */}
        <section className="animate-entrance animate-entrance-7">
          <div className="flex items-center gap-3 mb-5">
            <div className="h-px flex-1 bg-card-border" />
            <h2 className="widget-label shrink-0">Services</h2>
            <div className="h-px flex-1 bg-card-border" />
          </div>
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
            {services.map((service) => (
              <ServiceCard key={service.name} {...service} />
            ))}
          </div>
        </section>

        {/* Footer */}
        <footer className="mt-24 pb-10 text-center">
          <div className="golden-divider mx-auto w-16 mb-5" />
          <p className="text-[0.65rem] text-muted/50 tracking-[0.25em] uppercase">
            Voshuizen 14 &middot; Lieren
          </p>
        </footer>
      </div>
    </main>
  );
}
