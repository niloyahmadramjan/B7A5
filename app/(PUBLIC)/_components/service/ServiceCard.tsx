"use client";

import Link from "next/link";
import { ServiceItem } from "@/types/service";

interface ServiceCardProps {
  service: ServiceItem;
}

export default function ServiceCard({ service }: ServiceCardProps) {
  // Format minutes into hours & mins
  const formatDuration = (minutes: number) => {
    const hrs = Math.floor(minutes / 60);
    const mins = minutes % 60;
    if (hrs > 0 && mins > 0) return `${hrs}h ${mins}m`;
    if (hrs > 0) return `${hrs} ${hrs === 1 ? "hour" : "hours"}`;
    return `${mins} mins`;
  };

  // console.log(service.technicianId, "from service card");

  return (
    <div
      className="flex flex-col justify-between p-6 rounded-2xl border transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
      style={{
        backgroundColor: "var(--color-surface)",
        borderColor: "var(--color-steel-200)",
        borderRadius: "var(--radius-lg)",
        boxShadow: "var(--shadow-card)",
      }}
    >
      <div className="space-y-4">
        {/* Category & Rating Header */}
        <div className="flex items-center justify-between">
          <span
            className="text-xs font-bold uppercase tracking-wider px-2.5 py-1 rounded-md"
            style={{
              backgroundColor: "var(--status-accepted-bg)",
              color: "var(--status-accepted-fg)",
            }}
          >
            {service.categoryName || "General Service"}
          </span>

          <div className="flex items-center gap-1 text-xs font-semibold text-amber-500">
            <svg className="w-4 h-4 fill-current" viewBox="0 0 20 20">
              <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
            </svg>
            <span>{service.rating ?? "4.9"}</span>
            <span className="text-gray-400">
              ({service.reviewsCount ?? 24})
            </span>
          </div>
        </div>

        {/* Title & Description */}
        <div>
          <h3
            className="text-xl font-bold mb-2 transition-colors line-clamp-1"
            style={{
              color: "var(--color-ink)",
              fontFamily: "var(--font-display)",
            }}
          >
            {service.title}
          </h3>
          <p
            className="text-sm line-clamp-2 leading-relaxed"
            style={{
              color: "var(--color-ink-muted)",
              fontFamily: "var(--font-body)",
            }}
          >
            {service.description}
          </p>
        </div>

        {/* Duration badge */}
        <div
          className="flex items-center gap-2 text-xs font-medium"
          style={{ color: "var(--color-steel)" }}
        >
          <svg
            className="w-4 h-4"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
          Est. Time: {formatDuration(service.duration)}
        </div>
      </div>

      {/* Footer / Price & Action */}
      <div
        className="pt-6 mt-6 border-t flex items-center justify-between"
        style={{ borderColor: "var(--color-steel-200)" }}
      >
        <div>
          <span
            className="text-xs font-medium block"
            style={{ color: "var(--color-ink-muted)" }}
          >
            Starting at
          </span>
          <span
            className="text-2xl font-black"
            style={{
              color: "var(--color-ink)",
              fontFamily: "var(--font-display)",
            }}
          >
            ৳{service.price}
          </span>
        </div>

        <Link
          href={`/technicians/${service.technicianId}?serviceId=${service.id}`}
          className="px-4 py-2.5 text-xs font-bold text-white rounded-lg transition-all duration-200 active:scale-95 flex items-center gap-1.5"
          style={{
            backgroundColor: "var(--color-signal)",
            borderRadius: "var(--radius-sm)",
          }}
        >
          Book Now
          <svg
            className="w-3.5 h-3.5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M14 5l7 7m0 0l-7 7m7-7H3"
            />
          </svg>
        </Link>
      </div>
    </div>
  );
}
