import Link from "next/link";
import {
  Calendar,
  Eye,
  CreditCard,
  XCircle,
  Star,
  Wrench,
} from "lucide-react";

import {
  getMyBookings,
  cancelBookingAction,
  payBookingAction,
} from "../_action/myBookings";

import { BookingStatus } from "@/types/booking";

const getStatusBadge = (status: BookingStatus) => {
  const statusMap: Record<BookingStatus, string> = {
    REQUESTED: "badge-requested",
    ACCEPTED: "badge-accepted",
    DECLINED: "badge-declined",
    PAID: "badge-paid",
    IN_PROGRESS: "badge-in-progress",
    COMPLETED: "badge-completed",
    CANCELLED: "badge-cancelled",
  };

  return (
    <span className={`badge ${statusMap[status] || "badge-completed"}`}>
      {status.replace("_", " ")}
    </span>
  );
};

export default async function BookingsListPage() {
  const bookings = await getMyBookings();

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold">
          Booking History
        </h1>
        <p className="text-sm mt-1 text-[var(--color-ink-muted)]">
          View and manage your service bookings.
        </p>
      </div>

      {/* Table Card */}
      <div className="card overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="text-sm border-b border-[var(--color-steel-200)] bg-[var(--color-mist)] text-[var(--color-ink-muted)]">
                <th className="px-6 py-4 text-left font-semibold">Service</th>
                <th className="px-6 py-4 text-left font-semibold">Schedule</th>
                <th className="px-6 py-4 text-left font-semibold">Address</th>
                <th className="px-6 py-4 text-left font-semibold">Status</th>
                <th className="px-6 py-4 text-right font-semibold">Actions</th>
              </tr>
            </thead>

            <tbody>
              {bookings.length > 0 ? (
                bookings.map((booking: any) => (
                  <tr
                    key={booking.id}
                    className="transition border-b border-[var(--color-steel-200)] hover:bg-[var(--color-mist)]/50"
                  >
                    {/* Service */}
                    <td className="px-6 py-5">
                      <p className="font-semibold text-[var(--color-ink)]">
                        {booking.service?.title}
                      </p>
                      <p className="text-xs mt-1 text-[var(--color-ink-muted)]">
                        {booking.service?.category?.name}
                      </p>
                    </td>

                    {/* Date */}
                    <td className="px-6 py-5">
                      <div className="flex items-center gap-2 text-sm text-[var(--color-ink-muted)]">
                        <Calendar className="w-4 h-4 text-[var(--color-steel)]" />
                        {new Date(booking.scheduledAt).toLocaleString([], {
                          dateStyle: "medium",
                          timeStyle: "short",
                        })}
                      </div>
                    </td>

                    {/* Address */}
                    <td className="px-6 py-5 text-sm max-w-[180px] truncate text-[var(--color-ink-muted)]">
                      {booking.address}
                    </td>

                    {/* Status */}
                    <td className="px-6 py-5">
                      {getStatusBadge(booking.status)}
                    </td>

                    {/* Actions */}
                    <td className="px-6 py-5 flex justify-end gap-2 items-center">
                      {/* Cancel only REQUESTED */}
                      {booking.status === "REQUESTED" && (
                        <form action={cancelBookingAction.bind(null, booking.id)}>
                          <button
                            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold bg-red-500/10 text-red-600 dark:text-red-400 border border-red-500/20 hover:bg-red-500/20 transition cursor-pointer"
                          >
                            <XCircle className="w-4 h-4" />
                            Cancel
                          </button>
                        </form>
                      )}

                      {/* Pay */}
                      {booking.status === "ACCEPTED" && (
                        <form action={payBookingAction.bind(null, booking.id)}>
                          <button
                            className="btn-primary inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold shadow-sm"
                          >
                            <CreditCard className="w-4 h-4" />
                            Pay Now
                          </button>
                        </form>
                      )}

                      {/* Review */}
                      {booking.status === "COMPLETED" && (
                        <Link
                          href={`/dashboard/bookings/${booking.id}#review`}
                          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold bg-amber-500/10 text-amber-600 dark:text-amber-400 border border-amber-500/20 hover:bg-amber-500/20 transition"
                        >
                          <Star className="w-4 h-4" />
                          Review
                        </Link>
                      )}

                      {/* View */}
                      <Link
                        href={`/dashboard/bookings/${booking.id}`}
                        className="btn-secondary inline-flex items-center gap-1.5 px-3 py-1.5 text-xs rounded-lg transition"
                      >
                        <Eye className="w-4 h-4" />
                        View
                      </Link>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan={5}
                    className="px-6 py-12 text-center text-sm text-[var(--color-ink-muted)]"
                  >
                    <Wrench className="w-8 h-8 mx-auto text-[var(--color-steel)] mb-2 animate-pulse" />
                    You have no bookings yet.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}