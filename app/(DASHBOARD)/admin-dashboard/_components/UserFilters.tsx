'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import { useTransition } from 'react';
import { Search, Filter, ShieldCheck, Mail } from 'lucide-react';

export default function UserFilters() {
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
    <div className="flex flex-wrap gap-4 mb-6 bg-card p-4 rounded-lg border border-border items-center shadow-sm">
      {/* Search by Name */}
      <div className="relative flex-1 min-w-[200px]">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
        <input
          type="text"
          placeholder="Filter by name..."
          defaultValue={searchParams.get('name') ?? ''}
          onChange={(e) => handleFilterChange('name', e.target.value)}
          className="w-full pl-9 pr-3 py-2 border border-input rounded-md text-sm bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
        />
      </div>

      {/* Filter by Email */}
      <div className="relative flex-1 min-w-[200px]">
        <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
        <input
          type="text"
          placeholder="Filter by email..."
          defaultValue={searchParams.get('email') ?? ''}
          onChange={(e) => handleFilterChange('email', e.target.value)}
          className="w-full pl-9 pr-3 py-2 border border-input rounded-md text-sm bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
        />
      </div>

      {/* Filter by Role */}
      <div className="relative min-w-[150px]">
        <ShieldCheck className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground pointer-events-none" />
        <select
          defaultValue={searchParams.get('role') ?? ''}
          onChange={(e) => handleFilterChange('role', e.target.value)}
          className="w-full pl-9 pr-3 py-2 border border-input rounded-md text-sm bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
        >
          <option value="">All Roles</option>
          <option value="CUSTOMER">Customer</option>
          <option value="TECHNICIAN">Technician</option>
          <option value="ADMIN">Admin</option>
        </select>
      </div>

      {/* Filter by Status */}
      <div className="relative min-w-[150px]">
        <Filter className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground pointer-events-none" />
        <select
          defaultValue={searchParams.get('status') ?? ''}
          onChange={(e) => handleFilterChange('status', e.target.value)}
          className="w-full pl-9 pr-3 py-2 border border-input rounded-md text-sm bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
        >
          <option value="">All Statuses</option>
          <option value="ACTIVE">Active</option>
          <option value="BANNED">Banned</option>
        </select>
      </div>

      {isPending && <span className="text-xs text-muted-foreground animate-pulse">Updating...</span>}
    </div>
  );
}