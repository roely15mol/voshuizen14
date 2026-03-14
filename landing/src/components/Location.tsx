import content from "@/data/content.json";

export default function Location() {
  const { address, visit } = content;
  const mapsUrl = `https://www.google.com/maps/search/?api=1&query=${address.mapsQuery}`;

  return (
    <section className="py-28 sm:py-36 px-6 bg-warm-100/50">
      <div className="max-w-4xl mx-auto">
        {/* Section header */}
        <p className="label-sm text-bark/40 text-center mb-4">
          Waar we zijn
        </p>
        <h2 className="heading-lg text-4xl sm:text-5xl text-warm-900 text-center mb-16">
          Locatie
        </h2>

        <div className="grid gap-8 sm:grid-cols-2">
          {/* Address card */}
          <div className="card-warm p-8 sm:p-10">
            <div className="flex items-start gap-4 mb-6">
              <div className="w-10 h-10 rounded-full bg-moss/10 flex items-center justify-center shrink-0 mt-0.5">
                <svg className="w-4 h-4 text-moss" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z" />
                </svg>
              </div>
              <div>
                <h3 className="font-display text-xl font-medium text-warm-900 mb-1">
                  Adres
                </h3>
              </div>
            </div>
            <address className="text-warm-800/60 not-italic leading-relaxed text-[0.95rem] mb-6 pl-14">
              {address.street}<br />
              {address.postalCode} {address.city}<br />
              {address.municipality}, {address.province}
            </address>
            <div className="pl-14">
              <a
                href={mapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-sm font-medium text-moss hover:text-moss/70 transition-colors group"
              >
                Bekijk op Google Maps
                <svg className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" />
                </svg>
              </a>
            </div>
          </div>

          {/* Visit card */}
          <div className="card-warm p-8 sm:p-10">
            <div className="flex items-start gap-4 mb-6">
              <div className="w-10 h-10 rounded-full bg-bark/5 flex items-center justify-center shrink-0 mt-0.5">
                <svg className="w-4 h-4 text-bark/60" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 18.75a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m3 0h6m-9 0H3.375a1.125 1.125 0 0 1-1.125-1.125V14.25m17.25 4.5a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m3 0h1.125c.621 0 1.129-.504 1.09-1.124a17.902 17.902 0 0 0-3.213-9.193 2.056 2.056 0 0 0-1.58-.86H14.25M16.5 18.75h-2.25m0-11.177v-.958c0-.568-.422-1.048-.987-1.106a48.554 48.554 0 0 0-10.026 0 1.106 1.106 0 0 0-.987 1.106v7.635m12-6.677v6.677m0 4.5v-4.5m0 0h-12" />
                </svg>
              </div>
              <div>
                <h3 className="font-display text-xl font-medium text-warm-900 mb-1">
                  Bereikbaarheid
                </h3>
              </div>
            </div>
            <p className="text-warm-800/60 leading-relaxed text-[0.95rem] pl-14">
              {visit.text}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
