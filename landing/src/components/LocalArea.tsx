import Image from "next/image";
import content from "@/data/content.json";
import { getCurrentSeason } from "@/lib/seasons";

export default function LocalArea() {
  const { data: season } = getCurrentSeason();

  return (
    <section className="py-20 px-4">
      <div className="max-w-4xl mx-auto">
        <h2 className="font-[family-name:var(--font-display)] text-3xl sm:text-4xl font-semibold text-gray-900 mb-4 text-center">
          De Veluwe &amp; Lieren
        </h2>
        <p className="text-gray-500 text-center mb-10 max-w-xl mx-auto">
          {season.tip}
        </p>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {content.localArea.map((area) => (
            <div key={area.name} className="area-card">
              <div className="relative h-48">
                <Image
                  src={area.photo}
                  alt={area.name}
                  fill
                  className="object-cover"
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                />
              </div>
              <div className="p-5">
                <h3 className="font-semibold text-gray-900 mb-1">
                  {area.name}
                </h3>
                <p className="text-gray-500 text-sm">{area.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
