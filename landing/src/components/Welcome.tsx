import Image from "next/image";
import content from "@/data/content.json";

export default function Welcome() {
  return (
    <section className="py-28 sm:py-36 px-6">
      <div className="max-w-5xl mx-auto">
        {/* Label */}
        <p className="label-sm text-bark/40 text-center mb-12">
          Over deze plek
        </p>

        {/* Editorial layout */}
        <div className="grid gap-12 lg:gap-20 lg:grid-cols-[1fr_1.2fr] items-center">
          {/* Text side */}
          <div className="order-2 lg:order-1">
            <h2 className="heading-lg text-4xl sm:text-5xl text-warm-900 mb-8">
              {content.welcome.title}
            </h2>
            <div className="section-divider bg-moss/30 mb-8" />
            <p className="text-warm-800/70 text-lg leading-[1.8] font-light">
              {content.welcome.text}
            </p>
          </div>

          {/* Photo side */}
          <div className="order-1 lg:order-2 relative">
            <div className="relative aspect-[4/5] rounded-2xl overflow-hidden">
              <Image
                src="/photos/welcome.jpg"
                alt="De Veluwe bij Lieren"
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 55vw"
                priority
              />
              {/* Subtle overlay gradient */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent" />
            </div>
            {/* Offset decorative border */}
            <div className="absolute -bottom-4 -right-4 w-full h-full rounded-2xl border border-warm-200 -z-10" />
          </div>
        </div>
      </div>
    </section>
  );
}
