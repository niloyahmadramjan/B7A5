import { Suspense } from 'react';
import UserFilters from '../_components/UserFilters';
import UserTable from '../_components/UserTable';
import Pagination from '../_components/Pagination';
import { getAdminUsers } from '../_action/user';

export default async function AdminUsersPage({
  searchParams,
}: {
  searchParams: Promise<{ page?: string; name?: string; email?: string; status?: string; role?: string }>;
}) {
  const resolvedParams = await searchParams;

  const response = await getAdminUsers({
    page: resolvedParams.page,
    name: resolvedParams.name,
    email: resolvedParams.email,
    status: resolvedParams.status,
    role: resolvedParams.role,
  });

  const users = response?.data?.data || [];
  const meta = response?.data?.meta || { page: 1, limit: 10, total: 0, totalPages: 1 };

  return (
    <div className="p-8 max-w-full mx-auto">
      <h1 className="text-2xl font-bold mb-6 text-foreground">Manage Users</h1>

      <UserFilters />

      <Suspense fallback={<div className="text-center py-12 text-muted-foreground">Loading users...</div>}>
        <UserTable users={users} />
      </Suspense>

      <Pagination meta={meta} />
    </div>
  );
}