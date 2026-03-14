import { getCurrentSeason } from "@/lib/seasons";
import { HeroWeather } from "./HeroWeather";

export default function Hero() {
  const { data: season } = getCurrentSeason();

  return (
    <section
      className="hero-section"
      style={{ backgroundImage: `url(${season.heroPhoto})` }}
    >
      <div className="card-overlay text-center max-w-lg mx-4 animate-fade-up">
        <h1
          className="font-[family-name:var(--font-display)] text-5xl sm:text-7xl font-bold tracking-tight text-gray-900 mb-2"
        >
          Voshuizen{" "}
          <span style={{ color: season.accent }}>14</span>
        </h1>
        <p className="text-gray-500 text-sm tracking-[0.3em] uppercase mt-2">
          Lieren &middot; Veluwe
        </p>
        <HeroWeather />
        <p className="text-gray-400 text-xs mt-2">{season.greeting}</p>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 scroll-indicator">
        <svg
          className="w-6 h-6 text-white/70"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M19.5 13.5 12 21m0 0-7.5-7.5M12 21V3"
          />
        </svg>
      </div>
    </section>
  );
}
