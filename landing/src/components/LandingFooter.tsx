import content from "@/data/content.json";
import { getCurrentSeason } from "@/lib/seasons";

export default function LandingFooter() {
  const { data: season } = getCurrentSeason();
  const year = new Date().getFullYear();

  return (
    <footer className="py-16 px-6">
      <div className="max-w-3xl mx-auto">
        {/* Golden rule */}
        <div className="golden-rule mb-14" />

        <div className="text-center">
          {/* House name */}
          <p className="font-display text-2xl font-light text-warm-800/30 mb-3">
            Voshuizen 14
          </p>

          {/* Season greeting */}
          <p className="text-warm-800/25 text-xs tracking-wider mb-8 italic">
            {season.greeting}
          </p>

          {/* Dashboard link */}
          <a
            href={content.dashboard.url}
            className="inline-block text-warm-800/20 text-xs tracking-wider hover:text-warm-800/50 transition-colors duration-500"
          >
            {content.dashboard.label}
          </a>

          {/* Copyright */}
          <p className="text-warm-800/15 text-[0.6rem] tracking-[0.2em] uppercase mt-8">
            &copy; {year}
          </p>
        </div>
      </div>
    </footer>
  );
}
