import { getBookings } from "../_action/booking";
import BookingTable from "../_components/BookingTable";




export default async function BookingsPage() {
  const bookings = await getBookings();

  return (
    <div className="p-6 max-w-full mx-auto">
      <h1 className="text-2xl font-bold mb-6 text-gray-800">Technician Bookings</h1>
      <BookingTable initialBookings={bookings} />
    </div>
  );
}