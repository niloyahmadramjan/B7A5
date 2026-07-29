"use client";

import { useState, useMemo } from "react";
import { ServicesApiResponse, ServiceItem } from "@/types/service";
import ServiceCard from "../_components/service/ServiceCard";
import Pagination from "../_components/service/Pagination";

// DEMO MOCK DATA — Easily swapped out with fetch('/api/services')
const MOCK_API_RESPONSE: ServicesApiResponse = {
  success: true,
  statusCode: 200,
  message: "Services fetched successfully",
  data: {
    data: [
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
      {
        id: "34543b45-01d3-4b1b-b763-f660e7580af1",
        technicianId: "d4abb892-21b8-47a9-bf32-477c57f85286",
        categoryId: "d63e6204-3aba-499d-858a-aa1ac4483d7b",
        categoryName: "AC & Cooling",
        title: "Split AC Compressor Replacement",
        description: "Professional replacement of non-functional inverter compressor with manufacturer warranty.",
        price: 3500,
        duration: 240,
        rating: 4.7,
        reviewsCount: 14,
        createdAt: "2026-07-16T17:15:50.650Z",
        updatedAt: "2026-07-16T17:15:50.650Z",
      },
      {
        id: "45643b45-01d3-4b1b-b763-f660e7580af2",
        technicianId: "a1abb892-21b8-47a9-bf32-477c57f85299",
        categoryId: "e74e6204-3aba-499d-858a-aa1ac4483d7c",
        categoryName: "Electrical",
        title: "Ceiling Fan & Light Fitting Installation",
        description: "Quick installation and load balancing for smart ceiling fans, chandeliers, and LED fixtures.",
        price: 350,
        duration: 45,
        rating: 4.9,
        reviewsCount: 61,
        createdAt: "2026-07-16T17:15:50.650Z",
        updatedAt: "2026-07-16T17:15:50.650Z",
      },
    ],
    meta: {
      page: 1,
      limit: 6,
      total: 5,
      totalPages: 1,
    },
  },
};

export default function ServicesPage() {
  // Search & Filter state
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("ALL");
  const [maxPrice, setMaxPrice] = useState<number>(4000);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [sortBy, setSortBy] = useState<"recommended" | "price-low" | "price-high">("recommended");

  // Extract unique categories for filter menu
  const categories = useMemo(() => {
    const cats = MOCK_API_RESPONSE.data.data.map((item) => item.categoryName || "General");
    return ["ALL", ...Array.from(new Set(cats))];
  }, []);

  // Filter & Sort Logic
  const filteredServices = useMemo(() => {
    return MOCK_API_RESPONSE.data.data
      .filter((service) => {
        const matchesSearch =
          service.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          service.description.toLowerCase().includes(searchQuery.toLowerCase());
        const matchesCategory =
          selectedCategory === "ALL" || service.categoryName === selectedCategory;
        const matchesPrice = service.price <= maxPrice;

        return matchesSearch && matchesCategory && matchesPrice;
      })
      .sort((a, b) => {
        if (sortBy === "price-low") return a.price - b.price;
        if (sortBy === "price-high") return b.price - a.price;
        return 0; // Default recommended
      });
  }, [searchQuery, selectedCategory, maxPrice, sortBy]);

  return (
    <div className="min-h-screen py-10 px-4 sm:px-6 lg:px-8" style={{ backgroundColor: "var(--color-mist)" }}>
      <div className="max-w-7xl mx-auto space-y-8">

        {/* Search & Top Filters Bar */}
        <div
          className="p-4 sm:p-6 rounded-2xl border space-y-4"
          style={{
            borderColor: "var(--color-steel-200)",
            boxShadow: "var(--shadow-card)",
            borderRadius: "var(--radius-lg)",
          }}
        >
          <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-center">
            
            {/* Search Input */}
            <div className="md:col-span-5 relative">
              <svg
                className="w-5 h-5 absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
              <input
                type="text"
                placeholder="Search services (e.g. AC, wiring, leak)..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 border text-sm rounded-xl focus:outline-none  transition-all"
                style={{
                  borderColor: "var(--color-steel-200)",
                  borderRadius: "var(--radius-sm)",
                  '--tw-ring-color': 'var(--color-signal)',
                } as React.CSSProperties}
              />
            </div>

            {/* Category Select */}
            <div className="md:col-span-3 ">
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="w-full px-3 py-2.5 border text-sm rounded-xl focus:outline-none  cursor-pointer"
                style={{
                    backgroundColor: "var(--color-surface)",
                  borderColor: "var(--color-steel-200)",
                  borderRadius: "var(--radius-sm)",
                  color: "var(--color-ink)",
                }}
              >
                {categories.map((cat) => (
                  <option key={cat} value={cat}>
                    {cat === "ALL" ? "All Categories" : cat}
                  </option>
                ))}
              </select>
            </div>

            {/* Sort Select */}
            <div className="md:col-span-4">
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as any)}
                className="w-full px-3 py-2.5 border text-sm rounded-xl focus:outline-none  cursor-pointer"
                style={{
                    backgroundColor: "var(--color-surface)",
                  borderColor: "var(--color-steel-200)",
                  borderRadius: "var(--radius-sm)",
                  color: "var(--color-ink)",
                }}
              >
                <option value="recommended">Sort by: Recommended</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
              </select>
            </div>
          </div>

          {/* Price Range Slider */}
          <div className="pt-2 border-t flex flex-col sm:flex-row items-center justify-between gap-4" style={{ borderColor: "var(--color-steel-200)" }}>
            <div className="flex items-center gap-3 w-full sm:w-auto">
              <span className="text-xs font-bold uppercase tracking-wider text-gray-500 whitespace-nowrap">
                Max Price: ৳{maxPrice}
              </span>
              <input
                type="range"
                min="300"
                max="5000"
                step="100"
                value={maxPrice}
                onChange={(e) => setMaxPrice(Number(e.target.value))}
                className="w-full sm:w-48 accent-orange-500 cursor-pointer"
              />
            </div>

            <div className="text-xs text-gray-500 font-medium self-end sm:self-center">
              Showing <span className="font-bold text-gray-900">{filteredServices.length}</span> services
            </div>
          </div>
        </div>

        {/* Services Grid */}
        {filteredServices.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredServices.map((service) => (
              <ServiceCard key={service.id} service={service} />
            ))}
          </div>
        ) : (
          /* Empty State */
          <div
            className="text-center py-16 px-4 rounded-2xl border"
            style={{
              backgroundColor: "var(--color-surface)",
              borderColor: "var(--color-steel-200)",
              borderRadius: "var(--radius-lg)",
            }}
          >
            <svg className="w-12 h-12 mx-auto text-gray-300 mb-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <h3 className="text-lg font-bold text-gray-800">No Services Found</h3>
            <p className="text-sm text-gray-500 mt-1">Try adjusting your search filters or price threshold.</p>
            <button
              onClick={() => {
                setSearchQuery("");
                setSelectedCategory("ALL");
                setMaxPrice(5000);
              }}
              className="mt-4 text-xs font-bold underline transition-colors"
              style={{ color: "var(--color-signal)" }}
            >
              Reset All Filters
            </button>
          </div>
        )}

        {/* Pagination Controls */}
        <Pagination
          meta={{
            page: currentPage,
            limit: MOCK_API_RESPONSE.data.meta.limit,
            total: filteredServices.length,
            totalPages: Math.ceil(filteredServices.length / MOCK_API_RESPONSE.data.meta.limit) || 1,
          }}
          onPageChange={(page) => setCurrentPage(page)}
        />
      </div>
    </div>
  );
}