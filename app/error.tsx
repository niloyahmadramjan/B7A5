"use client";

import { useEffect } from "react";
import Link from "next/link";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log the error to your monitoring service (e.g. Sentry)
    console.error("Unhandled Error Caught:", error);
  }, [error]);

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
        {/* Warning Icon */}
        <div
          className="w-20 h-20 mx-auto mb-6 rounded-full flex items-center justify-center"
          style={{
            backgroundColor: "var(--status-declined-bg)",
          }}
        >
          <svg
            className="w-10 h-10"
            style={{ color: "var(--status-declined-fg)" }}
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
            />
          </svg>
        </div>

        {/* Text */}
        <span
          className="text-xs font-bold tracking-wider uppercase mb-2 block"
          style={{ color: "var(--status-declined-fg)" }}
        >
          System Notice
        </span>
        <h1
          className="text-3xl font-extrabold mb-3"
          style={{
            color: "var(--color-navy)",
            fontFamily: "var(--font-display)",
          }}
        >
          Something Went Wrong!
        </h1>
        <p
          className="text-sm leading-relaxed mb-6"
          style={{ color: "var(--color-ink-muted)", fontFamily: "var(--font-body)" }}
        >
          An unexpected technical issue occurred while processing your request. Please try again or return to the homepage.
        </p>

        {/* Error Details snippet for debugging */}
        {error.message && (
          <div
            className="p-3 mb-6 rounded text-xs text-left font-mono overflow-x-auto border"
            style={{
              backgroundColor: "var(--color-mist)",
              borderColor: "var(--color-steel-200)",
              color: "var(--color-ink)",
            }}
          >
            <span className="font-semibold text-red-600 block mb-1">Details:</span>
            {error.message}
          </div>
        )}

        {/* Action Controls */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
          <button
            onClick={() => reset()}
            className="w-full sm:w-auto px-6 py-3 font-semibold text-white text-sm transition-all duration-200 flex items-center justify-center gap-2"
            style={{
              backgroundColor: "var(--color-signal)",
              borderRadius: "var(--radius-md)",
            }}
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
            </svg>
            Try Again
          </button>
          <Link
            href="/"
            className="w-full sm:w-auto px-6 py-3 font-semibold text-sm border transition-all duration-200 text-center"
            style={{
              borderColor: "var(--color-steel-200)",
              color: "var(--color-ink)",
              borderRadius: "var(--radius-md)",
              backgroundColor: "var(--color-surface)",
            }}
          >
            Go to Homepage
          </Link>
        </div>
      </div>
    </div>
  );
}