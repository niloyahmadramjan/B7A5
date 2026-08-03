'use client';

import { useRouter, useSearchParams } from 'next/navigation';

export default function Pagination({ meta }: { meta: { page: number; totalPages: number } }) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const handlePageChange = (newPage: number) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set('page', newPage.toString());
    router.push(`?${params.toString()}`);
  };

  if (meta.totalPages <= 1) return null;

  return (
    <div className="flex justify-center items-center gap-4 mt-6">
      <button
        disabled={meta.page <= 1}
        onClick={() => handlePageChange(meta.page - 1)}
        className="px-4 py-2 bg-gray-100 border rounded-md text-sm font-medium disabled:opacity-50"
      >
        Previous
      </button>
      <span className="text-sm text-gray-700">
        Page {meta.page} of {meta.totalPages}
      </span>
      <button
        disabled={meta.page >= meta.totalPages}
        onClick={() => handlePageChange(meta.page + 1)}
        className="px-4 py-2 bg-gray-100 border rounded-md text-sm font-medium disabled:opacity-50"
      >
        Next
      </button>
    </div>
  );
}