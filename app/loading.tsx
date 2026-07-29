export default function GlobalLoading() {
  return (
    <div
      className="min-h-[85vh] w-full p-4 sm:p-8"
      style={{ backgroundColor: "var(--color-mist)" }}
    >
      <div className="max-w-7xl mx-auto space-y-8 animate-pulse">
        
        {/* Header / Hero Skeleton */}
        <div
          className="p-8 rounded-2xl space-y-4"
          style={{
            backgroundColor: "var(--color-surface)",
            borderRadius: "var(--radius-lg)",
            boxShadow: "var(--shadow-card)",
          }}
        >
          <div
            className="h-8 w-2/5 sm:w-1/4 rounded-md"
            style={{ backgroundColor: "var(--color-steel-200)" }}
          ></div>
          <div
            className="h-4 w-4/5 sm:w-2/4 rounded-md"
            style={{ backgroundColor: "var(--color-steel-200)" }}
          ></div>
        </div>

        {/* Filter Bar Placeholder */}
        <div
          className="h-14 w-full rounded-xl flex items-center justify-between px-6"
          style={{
            backgroundColor: "var(--color-surface)",
            borderRadius: "var(--radius-md)",
          }}
        >
          <div
            className="h-6 w-32 rounded-md"
            style={{ backgroundColor: "var(--color-steel-200)" }}
          ></div>
          <div className="flex gap-3">
            <div
              className="h-8 w-20 rounded-md"
              style={{ backgroundColor: "var(--color-steel-200)" }}
            ></div>
            <div
              className="h-8 w-20 rounded-md"
              style={{ backgroundColor: "var(--color-steel-200)" }}
            ></div>
          </div>
        </div>

        {/* Content Cards Grid Skeleton */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <div
              key={i}
              className="p-6 rounded-2xl space-y-4 border"
              style={{
                backgroundColor: "var(--color-surface)",
                borderColor: "var(--color-steel-200)",
                borderRadius: "var(--radius-lg)",
                boxShadow: "var(--shadow-card)",
              }}
            >
              {/* Image / Thumbnail Skeleton */}
              <div
                className="w-full h-44 rounded-xl"
                style={{
                  backgroundColor: "var(--color-steel-200)",
                  borderRadius: "var(--radius-md)",
                }}
              ></div>

              {/* Title & Subtitle */}
              <div className="space-y-2">
                <div
                  className="h-5 w-3/4 rounded"
                  style={{ backgroundColor: "var(--color-steel-200)" }}
                ></div>
                <div
                  className="h-4 w-1/2 rounded"
                  style={{ backgroundColor: "var(--color-steel-200)" }}
                ></div>
              </div>

              {/* Metadata Footer Skeleton */}
              <div className="pt-4 flex items-center justify-between border-t border-gray-100">
                <div
                  className="h-6 w-20 rounded-full"
                  style={{ backgroundColor: "var(--color-steel-200)" }}
                ></div>
                <div
                  className="h-8 w-24 rounded-lg"
                  style={{ backgroundColor: "var(--color-steel-200)" }}
                ></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}