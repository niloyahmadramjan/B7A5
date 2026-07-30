export default function ServiceSkeleton() {
  return (
    <div
      className="
rounded-2xl
border
overflow-hidden
animate-pulse
"
      style={{
        backgroundColor: "var(--color-surface)",
        borderColor: "var(--color-steel-200)",
      }}
    >
      {/* Image */}

      <div
        className="
h-48
bg-gray-200
"
      />

      <div className="p-5 space-y-4">
        {/* Category */}

        <div
          className="
h-3
w-24
rounded
bg-gray-200
"
        />

        {/* Title */}

        <div
          className="
h-6
w-3/4
rounded
bg-gray-200
"
        />

        {/* Description */}

        <div className="space-y-2">
          <div
            className="
h-3
w-full
rounded
bg-gray-200
"
          />

          <div
            className="
h-3
w-5/6
rounded
bg-gray-200
"
          />

          <div
            className="
h-3
w-2/3
rounded
bg-gray-200
"
          />
        </div>

        {/* Price */}

        <div
          className="
h-7
w-28
rounded
bg-gray-200
"
        />

        {/* Button */}

        <div
          className="
h-10
w-full
rounded-xl
bg-gray-200
"
        />
      </div>
    </div>
  );
}
