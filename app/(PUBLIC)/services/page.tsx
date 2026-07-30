import ServicesList from "../_components/service/ServicesList";
import { Suspense } from "react";
import ServiceSkeleton from "../_components/service/ServiceSkeleton";

// async function servicePage(searchParams: SearchParams: Promise<{[key: string]: string|string[]|undefined}>) {

async function servicePage({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  return (
    <div
      className="min-h-screen py-10 px-4 sm:px-6 lg:px-8"
      style={{ backgroundColor: "var(--color-mist)" }}
    >
      <div className="max-w-7xl mx-auto space-y-8">
        <Suspense fallback={<ServiceSkeleton />}>
          <ServicesList searchParams={searchParams} />
        </Suspense>
      </div>
    </div>
  );
}

export default servicePage;
