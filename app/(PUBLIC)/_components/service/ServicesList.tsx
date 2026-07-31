import { getPublicServices } from "@/app/(PUBLIC)/_action/getServices";
import ServiceCard from "./ServiceCard";
import { ServiceItem } from "@/types/service";
import Pagination from "./Pagination";

export default async function ServiceGrid({
  searchParams,
}: {
  searchParams?: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const query = await searchParams;
//   console.log(query);
  const result = await getPublicServices({query});
  const service = result.data.data
  // console.log(service, "from service list")

  return (
    <>
      {result.success? (
       <>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {service.map((service: ServiceItem) => (
            <ServiceCard
              key={service.id}
              service={service}
            />
          ))}
        </div>
        <Pagination meta={result.data.meta}/>
       </>
      ) : (
        <div
          className="text-center py-16 px-4 rounded-2xl border"
          style={{
            backgroundColor: "var(--color-surface)",
            borderColor: "var(--color-steel-200)",
            borderRadius: "var(--radius-lg)",
          }}
        >
          <svg
            className="w-12 h-12 mx-auto text-gray-300 mb-3"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>

          <h3 className="text-lg font-bold text-gray-800">
            No Services Found
          </h3>

          <p className="text-sm text-gray-500 mt-1">
            Try adjusting your search filters or price threshold.
          </p>
        </div>
      )}
    </>
  );
}
