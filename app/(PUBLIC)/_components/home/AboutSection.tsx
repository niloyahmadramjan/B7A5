"use client";

export default function AboutSection() {
  const highlights = [
    {
      title: "Verified Professionals",
      desc: "Every technician undergoes background checks and skill certifications before joining.",
    },
    {
      title: "Upfront & Clear Pricing",
      desc: "No hidden charges or unexpected fees. Pay exact quotes given prior to service.",
    },
    {
      title: "Service Warranty",
      desc: "7-day post-service protection to ensure long-lasting quality and complete peace of mind.",
    },
  ];

  return (
    <section id="about" className="py-16 sm:py-24 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        
        {/* Left Visual Card Grid */}
        <div className="lg:col-span-5 order-2 lg:order-1">
          <div
            className="p-8 rounded-3xl border space-y-6"
            style={{
              backgroundColor: "var(--color-surface)",
              borderColor: "var(--color-steel-200)",
              borderRadius: "var(--radius-lg)",
              boxShadow: "var(--shadow-card)",
            }}
          >
            <div className="w-12 h-12 rounded-2xl flex items-center justify-center bg-orange-100 text-orange-600 font-black text-xl">
              ✓
            </div>

            <h3 className="text-2xl font-bold" style={{ color: "var(--color-navy)", fontFamily: "var(--font-display)" }}>
              Committed to Safe & Honest Home Solutions
            </h3>

            <p className="text-sm leading-relaxed" style={{ color: "var(--color-ink-muted)" }}>
              We simplify home maintenance by connecting homeowners with skilled, punctual, and friendly local professionals across all technical fields.
            </p>

            <div className="pt-4 border-t space-y-3" style={{ borderColor: "var(--color-steel-200)" }}>
              <div className="flex items-center justify-between text-xs font-semibold">
                <span className="text-gray-500">Customer Satisfaction Rate</span>
                <span className="text-emerald-600">98.4%</span>
              </div>
              <div className="w-full h-2 bg-gray-100 rounded-full overflow-hidden">
                <div className="h-full bg-emerald-500 rounded-full w-[98.4%]" />
              </div>
            </div>
          </div>
        </div>

        {/* Right Content */}
        <div className="lg:col-span-7 space-y-6 order-1 lg:order-2">
          <span className="text-xs font-bold uppercase tracking-wider text-amber-600">
            About Our Platform
          </span>

          <h2
            className="text-3xl sm:text-4xl font-black leading-tight"
            style={{ color: "var(--color-navy)", fontFamily: "var(--font-display)" }}
          >
            We Make Home Maintenance Simple, Fast, and Worry-Free
          </h2>

          <p className="text-sm sm:text-base leading-relaxed" style={{ color: "var(--color-ink-muted)" }}>
            Finding a trusted technician shouldn't feel like a gamble. We bridged the gap between certified technicians and homeowners by building a platform rooted in transparency, quick response times, and quality assurance.
          </p>

          <div className="space-y-4 pt-2">
            {highlights.map((item, idx) => (
              <div key={idx} className="flex items-start gap-4">
                <div
                  className="w-6 h-6 rounded-full flex items-center justify-center shrink-0 mt-0.5 text-xs font-bold"
                  style={{
                    backgroundColor: "var(--status-accepted-bg)",
                    color: "var(--status-accepted-fg)",
                  }}
                >
                  ✓
                </div>
                <div>
                  <h4 className="text-base font-bold" style={{ color: "var(--color-navy)" }}>
                    {item.title}
                  </h4>
                  <p className="text-xs sm:text-sm text-gray-500 mt-0.5">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}