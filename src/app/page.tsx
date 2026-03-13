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
    <div className="rounded-xl border border-card-border bg-card-bg p-5 animate-pulse">
      <div className="h-4 w-24 rounded bg-card-border mb-3" />
      <div className="h-4 w-full rounded bg-card-border" />
    </div>
  );
}

export default function Home() {
  return (
    <main className="min-h-screen px-4 py-12 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-4xl">
        {/* Header */}
        <header className="mb-12 text-center">
          <div className="mb-4 inline-flex h-16 w-16 items-center justify-center rounded-2xl bg-accent-light">
            <svg className="h-8 w-8 text-accent" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" d="m2.25 12 8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25" />
            </svg>
          </div>
          <h1 className="mb-2 text-4xl font-bold tracking-tight">
            Voshuizen 14
          </h1>
          <p className="text-muted text-lg">
            Welkom thuis
          </p>
        </header>

        {/* Info bar */}
        <div className="mb-10 flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-8 text-sm text-muted">
          <Clock />
          <WeatherWidget />
        </div>

        {/* Featured: News */}
        <section className="mb-6">
          <Suspense fallback={<WidgetFallback />}>
            <NewsWidget />
          </Suspense>
        </section>

        {/* Two-column grid */}
        <section className="mb-6 grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div className="space-y-4">
            <QuoteWidget />
            <Suspense fallback={<WidgetFallback />}>
              <HistoryWidget />
            </Suspense>
          </div>
          <div className="space-y-4">
            <FactWidget />
            <Suspense fallback={<WidgetFallback />}>
              <WasteWidget />
            </Suspense>
          </div>
        </section>

        {/* Quick links */}
        <section className="mb-10">
          <QuickLinks />
        </section>

        {/* Services grid */}
        <section>
          <h2 className="mb-6 text-sm font-semibold uppercase tracking-wider text-muted">
            Services
          </h2>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {services.map((service) => (
              <ServiceCard key={service.name} {...service} />
            ))}
          </div>
        </section>

        {/* Footer */}
        <footer className="mt-16 text-center text-sm text-muted">
          <p>Voshuizen 14</p>
        </footer>
      </div>
    </main>
  );
}
