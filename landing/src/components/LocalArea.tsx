import Image from "next/image";
import content from "@/data/content.json";
import { getCurrentSeason } from "@/lib/seasons";

export default function LocalArea() {
  const { data: season } = getCurrentSeason();

  return (
    <section className="py-28 sm:py-36 px-6">
      <div className="max-w-5xl mx-auto">
        {/* Section header */}
        <p className="label-sm text-bark/40 text-center mb-4">
          In de omgeving
        </p>
        <h2 className="heading-lg text-4xl sm:text-5xl text-warm-900 text-center mb-6">
          De Veluwe &amp; Lieren
        </h2>
        <p className="text-warm-800/50 text-center mb-16 max-w-lg mx-auto text-[0.95rem] leading-relaxed font-light italic">
          &ldquo;{season.tip}&rdquo;
        </p>

        {/* Magazine-style grid: first two items large, rest small */}
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {content.localArea.map((area, i) => (
            <div
              key={area.name}
              className={`area-card group ${i === 0 ? "lg:col-span-2 lg:row-span-2" : ""}`}
            >
              <div className={`relative overflow-hidden ${i === 0 ? "h-64 sm:h-80 lg:h-full lg:min-h-[420px]" : "h-48"}`}>
                <Image
                  src={area.photo}
                  alt={area.name}
                  fill
                  className="object-cover area-card-img"
                  sizes={i === 0
                    ? "(max-width: 1024px) 100vw, 66vw"
                    : "(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  }
                />
                {/* Gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent" />

                {/* Text overlay */}
                <div className="absolute bottom-0 left-0 right-0 p-6">
                  <h3 className={`font-display font-medium text-white mb-1 ${i === 0 ? "text-2xl sm:text-3xl" : "text-lg"}`}>
                    {area.name}
                  </h3>
                  <p className={`text-white/70 font-light leading-relaxed ${i === 0 ? "text-sm max-w-md" : "text-xs"}`}>
                    {area.description}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
