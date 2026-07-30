import Link from "next/link";

export default function NotFound() {
  return (
    <div
      className="min-h-[80vh] flex items-center justify-center px-4 py-16"
      style={{ backgroundColor: "var(--color-mist)" }}
    >
      <div
        className="max-w-lg w-full text-center p-8 sm:p-12 rounded-2xl border"
        style={{
          backgroundColor: "var(--color-surface)",
          borderColor: "var(--color-steel-200)",
          boxShadow: "var(--shadow-raised)",
          borderRadius: "var(--radius-lg)",
        }}
      >
        {/* Wrench / 404 Visual Icon */}
        <div
          className="w-20 h-20 mx-auto mb-6 rounded-full flex items-center justify-center"
          style={{ backgroundColor: "rgba(242, 84, 45, 0.1)" }}
        >
          <svg
            className="w-10 h-10"
            style={{ color: "var(--color-signal)" }}
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M11 4a2 2 0 114 0v1a1 1 0 001 1h3a1 1 0 011 1v3a1 1 0 01-1 1h-1a2 2 0 100 4h1a1 1 0 011 1v3a1 1 0 01-1 1h-3a1 1 0 00-1 1v1a2 2 0 11-4 0v-1a1 1 0 00-1-1H7a1 1 0 01-1-1v-3a1 1 0 00-1-1H4a2 2 0 110-4h1a1 1 0 001-1V7a1 1 0 011-1h3a1 1 0 001-1V4z"
            />
          </svg>
        </div>

        {/* Text Details */}
        <span
          className="text-sm font-bold tracking-widest uppercase mb-2 block"
          style={{ color: "var(--color-signal)" }}
        >
          Error 404
        </span>
        <h1
          className="text-3xl sm:text-4xl font-extrabold mb-3"
          style={{
            color: "var(--color-navy)",
            fontFamily: "var(--font-display)",
          }}
        >
          Page Not Found
        </h1>
        <p
          className="text-sm sm:text-base leading-relaxed mb-8"
          style={{ color: "var(--color-ink-muted)", fontFamily: "var(--font-body)" }}
        >
          Sorry, we couldn&apos;t find the page or service you were looking for. It might have been moved or doesn&apos;t exist.
        </p>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
          <Link
            href="/"
            className="w-full sm:w-auto px-6 py-3 font-semibold text-black text-sm transition-all duration-200 text-center"
            style={{
              backgroundColor: "var(--color-navy)",
              borderRadius: "var(--radius-md)",
            }}
          >
            Back to Home
          </Link>
          <Link
            href="/services"
            className="w-full sm:w-auto px-6 py-3 font-semibold text-sm border transition-all duration-200 text-center"
            style={{
              borderColor: "var(--color-steel-200)",
              color: "var(--color-ink)",
              borderRadius: "var(--radius-md)",
              backgroundColor: "var(--color-mist)",
            }}
          >
            Browse Services
          </Link>
        </div>
      </div>
    </div>
  );
}