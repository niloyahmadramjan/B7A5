"use client";
import { usePathname, useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";
import React, { useRef } from "react";

function ServiceSearch() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const router = useRouter();
  const debouncedReference = useRef<ReturnType<typeof setTimeout> | null>(null);

  const updateQuery = (key: string, value: string) => {
    const params = new URLSearchParams(searchParams.toString());

    if (value) {
      params.set(key, value);
    } else {
      params.delete(key);
    }

    // filter change হলে page আবার 1 হবে
    params.set("page", "1");

    router.replace(`${pathname}?${params.toString()}`);
  };

  const handleChange = (value: string) => {
    if (debouncedReference.current) {
      clearTimeout(debouncedReference.current);
    }

    debouncedReference.current = setTimeout(() => {
      updateQuery("searchItem", value);
    }, 300);
  };

  const handleSort = (value: string) => {
    const params = new URLSearchParams(searchParams.toString());

    switch (value) {
      case "recommended":
        params.delete("sortBy");
        params.delete("sortOrder");
        break;

      case "price-low":
        params.set("sortBy", "price");
        params.set("sortOrder", "asc");
        break;

      case "price-high":
        params.set("sortBy", "price");
        params.set("sortOrder", "desc");
        break;
    }

    params.set("page", "1");

    router.replace(`${pathname}?${params.toString()}`);
  };

  //   const handleChange = (value: string) => {
  //     if (debouncedReference.current) {
  //       clearTimeout(debouncedReference.current);
  //     }
  //     debouncedReference.current = setTimeout(() => {
  //       const params = new URLSearchParams(searchParams.toString());
  //       if (value) {
  //         params.set("searchItem", value);
  //       } else {
  //         params.delete("searchItem");
  //       }
  //       router.replace(`${pathname}?${params.toString()}`);
  //     }, 200);
  //   };

  return (
    <div>
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
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
            <input
              type="text"
              placeholder="Search services (e.g. AC, wiring, leak)..."
              defaultValue={
                searchParams.get("searchItem")
                  ? searchParams.get("searchItem")?.toString()
                  : ""
              }
              onChange={(e) => handleChange(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 border text-sm rounded-xl focus:outline-none  transition-all"
              style={
                {
                  borderColor: "var(--color-steel-200)",
                  borderRadius: "var(--radius-sm)",
                  "--tw-ring-color": "var(--color-signal)",
                } as React.CSSProperties
              }
            />
          </div>

          {/* Category Select */}
          <div className="md:col-span-3">
            <select
              defaultValue={searchParams.get("category") ?? ""}
              onChange={(e) => updateQuery("category", e.target.value)}
              className="w-full px-4 py-2.5 border text-sm font-medium rounded-xl focus:outline-none focus:ring-2 transition-all duration-200 cursor-pointer"
              style={
                {
                  backgroundColor: "var(--color-surface)",
                  borderColor: "var(--color-steel-200)",
                  color: "var(--color-ink)",
                  borderRadius: "var(--radius-sm)",
                  "--tw-ring-color": "var(--color-signal)",
                } as React.CSSProperties
              }
            >
              <option value="">All Categories</option>
              <option value="Electrical">Electrical</option>
              <option value="Plumbing">Plumbing</option>
              <option value="Cleaning">Cleaning</option>
            </select>
          </div>

          {/* Sort Select */}
          <div className="md:col-span-4">
            <select
              defaultValue="recommended"
              onChange={(e) => handleSort(e.target.value)}
              className="w-full px-4 py-2.5 border text-sm font-medium rounded-xl focus:outline-none focus:ring-2 transition-all duration-200 cursor-pointer"
              style={
                {
                  backgroundColor: "var(--color-surface)",
                  borderColor: "var(--color-steel-200)",
                  color: "var(--color-ink)",
                  borderRadius: "var(--radius-sm)",
                  "--tw-ring-color": "var(--color-signal)",
                } as React.CSSProperties
              }
            >
              <option value="recommended">Sort by: Recommended</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
            </select>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ServiceSearch;
