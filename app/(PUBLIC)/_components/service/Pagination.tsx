"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { MetaData } from "@/types/service";

interface PaginationProps {
  meta: MetaData;
}

export default function Pagination({ meta }: PaginationProps) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const changePage = (page: number) => {
    const params = new URLSearchParams(searchParams.toString());

    params.set("page", String(page));

    router.replace(`${pathname}?${params.toString()}`);
  };

  if (meta.totalPages <= 1) return null;

  return (
    <div className="flex justify-end mt-10">
      <div className="flex items-center gap-2">
        {/* Previous */}

        <button
          disabled={meta.page === 1}
          onClick={() => changePage(meta.page - 1)}
          className="
px-4
py-2.5
rounded-xl
text-sm
font-semibold
border
transition-all
disabled:opacity-40
disabled:cursor-not-allowed
"
          style={{
            backgroundColor: "var(--color-surface)",
            borderColor: "var(--color-steel-200)",
            color: "var(--color-ink)",
          }}
        >
          Previous
        </button>

        {/* Pages */}

        {Array.from({ length: meta.totalPages }, (_, i) => i + 1).map(
          (page) => (
            <button
              key={page}
              onClick={() => changePage(page)}
              className="
w-10
h-10
rounded-xl
text-sm
font-bold
transition-all
"
              style={{
                backgroundColor:
                  meta.page === page
                    ? "var(--color-navy)"
                    : "var(--color-surface)",

                color: meta.page === page ? "black" : "var(--color-ink)",

                border: "1px solid var(--color-steel-200)",
              }}
            >
              {page}
            </button>
          ),
        )}

        {/* Next */}

        <button
          disabled={meta.page === meta.totalPages}
          onClick={() => changePage(meta.page + 1)}
          className="
px-4
py-2.5
rounded-xl
text-sm
font-semibold
border
transition-all
disabled:opacity-40
disabled:cursor-not-allowed
"
          style={{
            backgroundColor: "var(--color-surface)",
            borderColor: "var(--color-steel-200)",
            color: "var(--color-ink)",
          }}
        >
          Next
        </button>
      </div>
    </div>
  );
}
