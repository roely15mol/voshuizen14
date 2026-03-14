import Image from "next/image";
import content from "@/data/content.json";

export default function Welcome() {
  return (
    <section className="py-20 px-4">
      <div className="max-w-3xl mx-auto grid gap-10 sm:grid-cols-2 items-center">
        <div>
          <h2 className="font-[family-name:var(--font-display)] text-3xl sm:text-4xl font-semibold text-gray-900 mb-6">
            {content.welcome.title}
          </h2>
          <p className="text-gray-600 text-lg leading-relaxed">
            {content.welcome.text}
          </p>
        </div>
        <div className="relative h-64 sm:h-80 rounded-2xl overflow-hidden">
          <Image
            src="/photos/welcome.jpg"
            alt="De Veluwe bij Lieren"
            fill
            className="object-cover"
            sizes="(max-width: 640px) 100vw, 50vw"
          />
        </div>
      </div>
    </section>
  );
}
