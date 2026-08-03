'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import { useTransition } from 'react';
import { Search, Calendar, Filter } from 'lucide-react';

export default function BookingFilters() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [isPending, startTransition] = useTransition();

  const handleFilterChange = (key: string, value: string) => {
    const params = new URLSearchParams(searchParams.toString());
    if (value) {
      params.set(key, value);
    } else {
      params.delete(key);
    }
    params.set('page', '1'); // Reset to page 1 on filter change
    
    startTransition(() => {
      router.push(`?${params.toString()}`);
    });
  };

  return (
    <div className="flex flex-wrap gap-4 mb-6  p-4 rounded-lg shadow-sm border items-center">
      {/* Search by Name */}
      <div className="relative flex-1 min-w-[220px]">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
        <input
          type="text"
          placeholder="Search customer name..."
          defaultValue={searchParams.get('name') ?? ''}
          onChange={(e) => handleFilterChange('name', e.target.value)}
          className="w-full pl-9 pr-3 py-2 border rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      {/* Filter by Status */}
      <div className="relative min-w-[180px]">
        <Filter className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
        <select
          defaultValue={searchParams.get('status') ?? ''}
          onChange={(e) => handleFilterChange('status', e.target.value)}
          className="w-full pl-9 pr-3 py-2 border rounded-md text-sm bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="">All Statuses</option>
          <option value="PAID">Paid</option>
          <option value="COMPLETED">Completed</option>
          <option value="ACCEPTED">Accepted</option>
          <option value="CANCELLED">Cancelled</option>
          <option value="IN_PROGRESS">In Progress</option>
        </select>
      </div>

      {/* Filter by Date */}
      <div className="relative min-w-[180px]">
        <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
        <input
          type="date"
          defaultValue={searchParams.get('date') ?? ''}
          onChange={(e) => handleFilterChange('date', e.target.value)}
          className="w-full pl-9 pr-3 py-2 border rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      {isPending && <span className="text-xs text-gray-500 animate-pulse">Updating...</span>}
    </div>
  );
}