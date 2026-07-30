"use client";

import Link from "next/link";
import { ServiceItem } from "@/types/service";
import ServiceCard from "../service/ServiceCard";

interface ServiceGridProps {
  data: ServiceItem[];
}

export default function FeaturedServices({data}: ServiceGridProps) {
  return (
    <section className="py-16 sm:py-24 px-4 sm:px-6 lg:px-8" style={{ backgroundColor: "var(--color-mist)" }}>
      <div className="max-w-7xl mx-auto space-y-10">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-amber-600">
              Popular Categories
            </span>
            <h2
              className="text-3xl sm:text-4xl font-black mt-1"
              style={{ color: "var(--color-navy)", fontFamily: "var(--font-display)" }}
            >
              Featured Services
            </h2>
          </div>

          <Link
            href="/services"
            className="text-sm font-bold flex items-center gap-1 transition-all hover:gap-2"
            style={{ color: "var(--color-signal)" }}
          >
            View All Services
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
            </svg>
          </Link>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {data.map((service: ServiceItem) => (
            <ServiceCard key={service.id} service={service} />
          ))}
        </div>

      </div>
    </section>
  );
}