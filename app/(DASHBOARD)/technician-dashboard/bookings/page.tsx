import { getBookings } from "../_action/booking";
import BookingTable from "../_components/BookingTable";


export default async function BookingsPage({
  searchParams,
}: {
  searchParams: Promise<{ page?: string; limit?: string }>;
}) {
  const resolvedSearchParams = await searchParams;
  const page = Number(resolvedSearchParams.page) || 1;
  const limit = Number(resolvedSearchParams.limit) || 10;

  const res = await getBookings(page, limit);

  return (
    <div className="w-full p-6 space-y-6">
      <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100">Manage Bookings</h1>
      <BookingTable
        initialBookings={res.success ? res.data : []} 
        meta={res.meta} 
      />
    </div>
  );
}