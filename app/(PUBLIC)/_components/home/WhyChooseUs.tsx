"use client";

export default function WhyChooseUs() {
  const features = [
    {
      icon: "⚡",
      title: "Fast Response Time",
      desc: "Technicians reach your location within 60 minutes for urgent repair requests.",
    },
    {
      icon: "🛡️",
      title: "Verified & Insured",
      desc: "All technicians are identity-checked and verified for safety compliance.",
    },
    {
      icon: "💳",
      title: "Transparent Pricing",
      desc: "Standardized service rates so you know the cost upfront before work begins.",
    },
    {
      icon: "🎧",
      title: "24/7 Support",
      desc: "Dedicated customer care team ready to assist with scheduling and issues.",
    },
  ];

  return (
    <section className="py-16 sm:py-24 px-4 sm:px-6 lg:px-8 border-t" style={{ borderColor: "var(--color-steel-200)" }}>
      <div className="max-w-7xl mx-auto space-y-12">
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <span className="text-xs font-bold uppercase tracking-wider text-amber-600">
            Why Choose Us
          </span>
          <h2
            className="text-3xl sm:text-4xl font-black"
            style={{ color: "var(--color-navy)", fontFamily: "var(--font-display)" }}
          >
            Built for Convenience & Peace of Mind
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((f, i) => (
            <div
              key={i}
              className="p-6 rounded-2xl border transition-all duration-300 hover:-translate-y-1"
              style={{
                backgroundColor: "var(--color-surface)",
                borderColor: "var(--color-steel-200)",
                borderRadius: "var(--radius-lg)",
                boxShadow: "var(--shadow-card)",
              }}
            >
              <div className="text-3xl mb-4">{f.icon}</div>
              <h3 className="text-lg font-bold mb-2" style={{ color: "var(--color-navy)" }}>
                {f.title}
              </h3>
              <p className="text-xs sm:text-sm leading-relaxed" style={{ color: "var(--color-ink-muted)" }}>
                {f.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}