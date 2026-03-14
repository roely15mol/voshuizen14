import { getCurrentSeason } from "@/lib/seasons";
import { HeroWeather } from "./HeroWeather";

export default function Hero() {
  const { data: season } = getCurrentSeason();

  return (
    <section
      className="hero-section"
      style={{ backgroundImage: `url(${season.heroPhoto})` }}
    >
      <div className="relative z-10 text-center px-6 max-w-2xl mx-auto">
        {/* Thin decorative line */}
        <div
          className="w-px h-16 mx-auto mb-8 animate-fade-in delay-1"
          style={{ background: `linear-gradient(180deg, transparent, ${season.accent})` }}
        />

        {/* Season label */}
        <p className="label-sm text-white/60 mb-6 animate-fade-up delay-1">
          {season.greeting}
        </p>

        {/* Main title */}
        <h1 className="heading-xl text-white text-7xl sm:text-9xl mb-4 animate-fade-up delay-2">
          Voshuizen
          <span
            className="block text-[0.6em] font-light tracking-[0.1em]"
            style={{ color: season.accent }}
          >
            14
          </span>
        </h1>

        {/* Subtitle */}
        <p className="label-sm text-white/50 mb-4 animate-fade-up delay-3">
          Lieren &middot; Veluwe
        </p>

        {/* Weather */}
        <div className="animate-fade-up delay-4">
          <HeroWeather accent={season.accent} />
        </div>

        {/* Bottom decorative line */}
        <div
          className="w-px h-12 mx-auto mt-8 animate-fade-in delay-5"
          style={{ background: `linear-gradient(180deg, ${season.accent}, transparent)` }}
        />
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 z-10 scroll-indicator">
        <svg
          className="w-5 h-5 text-white/40"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1}
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="m19.5 8.25-7.5 7.5-7.5-7.5"
          />
        </svg>
      </div>
    </section>
  );
}
