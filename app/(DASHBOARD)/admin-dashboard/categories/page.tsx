
import { getCategories } from '../_action/category';
import CategoriesClient from './CategoriesClient';

export default async function CategoriesPage({
  searchParams,
}: {
  searchParams: Promise<{ page?: string; limit?: string; searchTerm?: string }>;
}) {
  const resolvedSearchParams = await searchParams;
  const page = Number(resolvedSearchParams.page) || 1;
  const limit = Number(resolvedSearchParams.limit) || 10;
  const searchTerm = resolvedSearchParams.searchTerm || '';

  const res = await getCategories(page, limit, searchTerm);

  return (
    <div className="w-full p-6">
      <CategoriesClient initialData={res.data} />
    </div>
  );
}