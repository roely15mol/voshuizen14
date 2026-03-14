import content from "@/data/content.json";

export default function Contact() {
  return (
    <section className="py-20 px-4 bg-gray-50">
      <div className="max-w-xl mx-auto text-center">
        <h2 className="font-[family-name:var(--font-display)] text-3xl sm:text-4xl font-semibold text-gray-900 mb-6">
          Contact
        </h2>
        <p className="text-gray-600 mb-6">
          Neem gerust contact met ons op.
        </p>
        <a
          href={`mailto:${content.contact.email}`}
          className="inline-flex items-center gap-2 px-6 py-3 bg-gray-900 text-white rounded-full text-sm font-medium hover:bg-gray-800 transition-colors"
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
              d="M21.75 6.75v10.5a2.25 2.25 0 0 1-2.25 2.25h-15a2.25 2.25 0 0 1-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25m19.5 0v.243a2.25 2.25 0 0 1-1.07 1.916l-7.5 4.615a2.25 2.25 0 0 1-2.36 0L3.32 8.91a2.25 2.25 0 0 1-1.07-1.916V6.75"
            />
          </svg>
          {content.contact.email}
        </a>
      </div>
    </section>
  );
}
