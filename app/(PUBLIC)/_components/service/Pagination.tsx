"use client";

import { MetaData } from "@/types/service";

interface PaginationProps {
  meta: MetaData;
  onPageChange: (newPage: number) => void;
}

export default function Pagination({ meta, onPageChange }: PaginationProps) {
  const { page, totalPages } = meta;

  if (totalPages <= 1) return null;

  return (
    <div className="flex items-center justify-center gap-2 mt-10">
      {/* Previous Button */}
      <button
        onClick={() => onPageChange(page - 1)}
        disabled={page === 1}
        className="px-4 py-2 rounded-lg border text-sm font-semibold transition-all disabled:opacity-40 disabled:cursor-not-allowed hover:bg-white"
        style={{
          borderColor: "var(--color-steel-200)",
          color: "var(--color-navy)",
          backgroundColor: "var(--color-surface)",
        }}
      >
        Previous
      </button>

      {/* Page Numbers */}
      {Array.from({ length: totalPages }, (_, i) => i + 1).map((pageNum) => (
        <button
          key={pageNum}
          onClick={() => onPageChange(pageNum)}
          className={`w-10 h-10 rounded-lg text-sm font-bold transition-all ${
            pageNum === page ? "text-white shadow-md" : "hover:bg-white text-gray-700"
          }`}
          style={{
            backgroundColor: pageNum === page ? "var(--color-navy)" : "transparent",
            borderColor: pageNum === page ? "transparent" : "var(--color-steel-200)",
          }}
        >
          {pageNum}
        </button>
      ))}

      {/* Next Button */}
      <button
        onClick={() => onPageChange(page + 1)}
        disabled={page === totalPages}
        className="px-4 py-2 rounded-lg border text-sm font-semibold transition-all disabled:opacity-40 disabled:cursor-not-allowed hover:bg-white"
        style={{
          borderColor: "var(--color-steel-200)",
          color: "var(--color-navy)",
          backgroundColor: "var(--color-surface)",
        }}
      >
        Next
      </button>
    </div>
  );
}