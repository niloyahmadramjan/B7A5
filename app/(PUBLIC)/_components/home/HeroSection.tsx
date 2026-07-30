"use client";

import Link from "next/link";

export default function HeroSection() {
  return (
    <section
      className="relative overflow-hidden py-16 sm:py-24 px-4 sm:px-6 lg:px-8 border-b"
      style={{
        backgroundColor: "var(--color-surface)",
        borderColor: "var(--color-steel-200)",
      }}
    >
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        {/* Hero Left Text Content */}
        <div className="lg:col-span-7 space-y-6 text-center lg:text-left">

          <h1
            className="text-4xl sm:text-5xl lg:text-6xl font-black leading-tight tracking-tight"
            style={{ color: "var(--color-ink)", fontFamily: "var(--font-display)" }}
          >
            Expert Maintenance & Repairs at Your Doorstep
          </h1>

          <p
            className="text-base sm:text-lg max-w-2xl mx-auto lg:mx-0 leading-relaxed"
            style={{ color: "var(--color-ink)", fontFamily: "var(--font-body)" }}
          >
            Book background-checked technicians for AC repair, electrical setup, plumbing, and appliance servicing in just a few taps.
          </p>

          {/* Action CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-2">
            <Link
              href="/services"
              className="w-full sm:w-auto px-8 py-4 text-sm font-bold text-white rounded-xl shadow-lg transition-all duration-200 hover:opacity-90 active:scale-95 text-center"
              style={{
                backgroundColor: "var(--color-signal)",
                borderRadius: "var(--radius-sm)",
              }}
            >
              Explore All Services
            </Link>

            <Link
              href="#about"
              className="w-full sm:w-auto px-8 py-4 text-sm font-bold border rounded-xl transition-all duration-200 hover:bg-gray-400 text-center"
              style={{
                borderRadius: "var(--radius-sm)",
              }}
            >
              How It Works
            </Link>
          </div>

          {/* Key Stats Counter */}
          <div className="grid grid-cols-3 gap-4 pt-8 border-t" style={{ borderColor: "var(--color-steel-200)" }}>
            <div>
              <div className="text-2xl sm:text-3xl font-black" style={{ color: "var(--color-navy)" }}>
                5k+
              </div>
              <div className="text-xs font-medium" style={{ color: "var(--color-ink-muted)" }}>
                Services Done
              </div>
            </div>
            <div>
              <div className="text-2xl sm:text-3xl font-black" style={{ color: "var(--color-navy)" }}>
                4.9★
              </div>
              <div className="text-xs font-medium" style={{ color: "var(--color-ink-muted)" }}>
                User Rating
              </div>
            </div>
            <div>
              <div className="text-2xl sm:text-3xl font-black" style={{ color: "var(--color-navy)" }}>
                100+
              </div>
              <div className="text-xs font-medium" style={{ color: "var(--color-ink-muted)" }}>
                Vetted Techs
              </div>
            </div>
          </div>
        </div>

        {/* Hero Right Visual Banner / Card preview */}
        <div className="lg:col-span-5 flex justify-center">
          <div
            className="w-full max-w-md p-6 sm:p-8 rounded-3xl border shadow-xl relative"
            style={{
              backgroundColor: "var(--color-mist)",
              borderColor: "var(--color-steel-200)",
              borderRadius: "var(--radius-lg)",
            }}
          >
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold uppercase tracking-wider px-3 py-1 rounded-md bg-orange-100 text-orange-700">
                  Popular Booking
                </span>
                <span className="text-xs font-semibold text-emerald-600">Available Today</span>
              </div>

              <h3 className="text-xl font-bold" style={{ color: "var(--color-navy)" }}>
                AC Master Servicing & Jet Cleaning
              </h3>

              <p className="text-xs leading-relaxed" style={{ color: "var(--color-ink-muted)" }}>
                Includes outdoor unit washing, gas level test, filter replacement, and cooling audit.
              </p>

              <div className="p-4 rounded-xl border flex items-center justify-between bg-white" style={{ borderColor: "var(--color-steel-200)" }}>
                <div>
                  <div className="text-xs text-gray-400 font-medium">Standard Price</div>
                  <div className="text-2xl font-black  text-black">৳500</div>
                </div>
                <Link
                  href="/services"
                  className="px-4 py-2 text-xs font-bold text-white rounded-lg"
                  style={{ backgroundColor: "var(--color-signal)" }}
                >
                  Book Instant
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}