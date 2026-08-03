import { getAdminBookings } from "../_action/booking";
import BookingCard from "../_components/BookingCard";
import BookingFilters from "../_components/BookingFilters";
import Pagination from "../_components/Pagination";


export default async function AdminBookingsPage({
  searchParams,
}: {
  searchParams: Promise<{ page?: string; status?: string; name?: string; date?: string }>;
}) {
  const resolvedParams = await searchParams;
  
  // Fetch data using Server Action
  const response = await getAdminBookings({
    name: resolvedParams.name,
    date: resolvedParams.date,
  });

  const bookings = response?.data?.data || [];
  const meta = response?.data?.meta || { page: 1, limit: 10, total: 0, totalPages: 1 };

  return (
    <div className="p-8 max-w-full mx-auto">
      <h1 className="text-2xl font-bold mb-6">Manage Bookings</h1>

      {/* Filter and Search Bar */}
      <BookingFilters />

      {/* Bookings Grid */}
      {bookings.length === 0 ? (
        <div className="text-center py-12  rounded-lg border text-gray-500">
          No bookings found.
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {bookings.map((booking: any) => (
            <BookingCard key={booking.id} booking={booking} />
          ))}
        </div>
      )}

      {/* Pagination */}
      <Pagination meta={meta} />
    </div>
  );
}