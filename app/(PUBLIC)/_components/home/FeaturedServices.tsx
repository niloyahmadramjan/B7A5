"use client";

import Link from "next/link";
import { ServiceItem } from "@/types/service";
import ServiceCard from "../service/ServiceCard";

// Featured subset using your JSON schema format
const FEATURED_DEMO_DATA: ServiceItem[] = [
  {
    id: "05143b45-01d3-4b1b-b763-f660e7580af8",
    technicianId: "d4abb892-21b8-47a9-bf32-477c57f85286",
    categoryId: "d63e6204-3aba-499d-858a-aa1ac4483d7b",
    categoryName: "AC & Cooling",
    title: "AC Repair & Jet Cleaning",
    description: "Complete AC servicing, deep jet wash cleaning, and gas leak inspection by certified HVAC techs.",
    price: 500,
    duration: 180,
    rating: 4.9,
    reviewsCount: 38,
    createdAt: "2026-07-16T17:15:50.650Z",
    updatedAt: "2026-07-16T17:15:50.650Z",
  },
  {
    id: "12343b45-01d3-4b1b-b763-f660e7580af9",
    technicianId: "e5bbc892-21b8-47a9-bf32-477c57f85287",
    categoryId: "e74e6204-3aba-499d-858a-aa1ac4483d7c",
    categoryName: "Electrical",
    title: "Full House Electrical Safety Audit",
    description: "Comprehensive circuit breaker test, short-circuit diagnostic, and grounding inspection.",
    price: 1200,
    duration: 120,
    rating: 4.8,
    reviewsCount: 19,
    createdAt: "2026-07-16T17:15:50.650Z",
    updatedAt: "2026-07-16T17:15:50.650Z",
  },
  {
    id: "23443b45-01d3-4b1b-b763-f660e7580af0",
    technicianId: "f6ccc892-21b8-47a9-bf32-477c57f85288",
    categoryId: "f85e6204-3aba-499d-858a-aa1ac4483d7d",
    categoryName: "Plumbing",
    title: "Pipe Leak Detection & Repair",
    description: "Emergency high-pressure plumbing repair, fixture replacement, and line clog clearing.",
    price: 800,
    duration: 90,
    rating: 5.0,
    reviewsCount: 52,
    createdAt: "2026-07-16T17:15:50.650Z",
    updatedAt: "2026-07-16T17:15:50.650Z",
  },
];

export default function FeaturedServices() {
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
          {FEATURED_DEMO_DATA.map((service) => (
            <ServiceCard key={service.id} service={service} />
          ))}
        </div>

      </div>
    </section>
  );
}