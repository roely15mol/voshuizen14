import content from "@/data/content.json";
import { getCurrentSeason } from "@/lib/seasons";

export default function Contact() {
  const { data: season } = getCurrentSeason();

  return (
    <section className="py-28 sm:py-36 px-6 bg-warm-100/50">
      <div className="max-w-xl mx-auto text-center">
        {/* Decorative element */}
        <div
          className="w-px h-12 mx-auto mb-10"
          style={{ background: `linear-gradient(180deg, transparent, ${season.accent})` }}
        />

        <p className="label-sm text-bark/40 mb-4">
          Neem contact op
        </p>
        <h2 className="heading-lg text-4xl sm:text-5xl text-warm-900 mb-6">
          Contact
        </h2>
        <p className="text-warm-800/50 mb-10 font-light">
          Neem gerust contact met ons op.
        </p>

        <a
          href={`mailto:${content.contact.email}`}
          className="inline-flex items-center gap-3 px-8 py-4 border border-warm-800 text-warm-800 rounded-full text-sm font-medium hover:bg-warm-800 hover:text-cream transition-all duration-300 group"
        >
          <svg
            className="w-4 h-4 opacity-50 group-hover:opacity-100 transition-opacity"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M21.75 6.75v10.5a2.25 2.25 0 0 1-2.25 2.25h-15a2.25 2.25 0 0 1-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25m19.5 0v.243a2.25 2.25 0 0 1-1.07 1.916l-7.5 4.615a2.25 2.25 0 0 1-2.36 0L3.32 8.91a2.25 2.25 0 0 1-1.07-1.916V6.75"
            />
          </svg>
          {content.contact.email}
        </a>
      </div>
    </section>
  );
}
