import content from "@/data/content.json";

export default function Location() {
  const { address, delivery } = content;
  const mapsUrl = `https://www.google.com/maps/search/?api=1&query=${address.mapsQuery}`;

  return (
    <section className="py-20 px-4 bg-gray-50">
      <div className="max-w-3xl mx-auto">
        <h2 className="font-[family-name:var(--font-display)] text-3xl sm:text-4xl font-semibold text-gray-900 mb-10 text-center">
          Locatie
        </h2>

        <div className="grid gap-6 sm:grid-cols-2">
          {/* Address card */}
          <div className="card-overlay">
            <h3 className="font-semibold text-gray-900 mb-3">Adres</h3>
            <address className="text-gray-600 not-italic leading-relaxed">
              {address.street}
              <br />
              {address.postalCode} {address.city}
              <br />
              {address.municipality}, {address.province}
            </address>
            <a
              href={mapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 mt-4 text-sm font-medium hover:underline"
            >
              <svg
                className="w-4 h-4"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z"
                />
              </svg>
              Bekijk op Google Maps
            </a>
          </div>

          {/* Delivery card */}
          <div className="card-overlay">
            <h3 className="font-semibold text-gray-900 mb-3">
              Bezorginstructies
            </h3>
            <p className="text-gray-600 leading-relaxed">{delivery.text}</p>
          </div>
        </div>
      </div>
    </section>
  );
}
