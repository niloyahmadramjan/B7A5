export default function ServiceSummary({ service }: any) {
  return (
    <div
      className="
rounded-2xl
border
p-6
"
      style={{
        backgroundColor: "var(--color-surface)",
        borderColor: "var(--color-steel-200)",
      }}
    >
      <h2 className="text-2xl font-bold">{service.title}</h2>

      <p className="text-sm text-gray-500 mt-2">{service.description}</p>

      <div
        className="
grid
grid-cols-3
gap-4
mt-6
"
      >
        <div>
          <p className="text-xs text-gray-500">Price</p>

          <p className="font-bold">৳{service.price}</p>
        </div>

        <div>
          <p className="text-xs text-gray-500">Duration</p>

          <p className="font-bold">{service.duration}</p>
        </div>

        <div>
          <p className="text-xs text-gray-500">Category</p>

          <p className="font-bold">{service.category}</p>
        </div>
      </div>
    </div>
  );
}
