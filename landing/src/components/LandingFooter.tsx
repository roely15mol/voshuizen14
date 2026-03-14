import content from "@/data/content.json";
import { getCurrentSeason } from "@/lib/seasons";

export default function LandingFooter() {
  const { data: season } = getCurrentSeason();
  const year = new Date().getFullYear();

  return (
    <footer className="py-10 px-4 border-t border-gray-200">
      <div className="max-w-3xl mx-auto text-center">
        <p className="text-gray-400 text-xs mb-3">{season.greeting}</p>
        <a
          href={content.dashboard.url}
          className="text-gray-400 text-xs hover:text-gray-600 transition-colors"
        >
          {content.dashboard.label}
        </a>
        <p className="text-gray-300 text-xs mt-4">
          &copy; {year} Voshuizen 14
        </p>
      </div>
    </footer>
  );
}
