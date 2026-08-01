import Link from "next/link";
import {
  Calendar,
  Eye,
  CreditCard,
  XCircle,
  Star,
  CheckCircle,
} from "lucide-react";

import {
  getMyBookings,
  cancelBookingAction,
  payBookingAction,
} from "../_action/myBookings";

import { BookingStatus } from "@/types/booking";

const getStatusBadge = (status: BookingStatus) => {
  const styles = {
    REQUESTED: "bg-yellow-100 text-yellow-700 border-yellow-200",

    ACCEPTED: "bg-blue-100 text-blue-700 border-blue-200",

    DECLINED: "bg-red-100 text-red-700 border-red-200",

    PAID: "bg-purple-100 text-purple-700 border-purple-200",

    IN_PROGRESS: "bg-green-100 text-green-700 border-green-200",

    COMPLETED: "bg-emerald-100 text-emerald-700 border-emerald-200",

    CANCELLED: "bg-gray-100 text-gray-700 border-gray-200",
  };

  return (
    <span
      className={`
        inline-flex items-center
        px-3 py-1
        rounded-full
        text-xs
        font-semibold
        border
        ${styles[status]}
      `}
    >
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
        <h1
          className="text-2xl font-bold"
          style={{
            color: "var(--color-text)",
          }}
        >
          Booking History
        </h1>

        <p
          className="text-sm mt-1"
          style={{
            color: "var(--color-muted)",
          }}
        >
          View and manage your service bookings.
        </p>
      </div>

      {/* Table Card */}
      <div
        className="
          rounded-2xl
          
          overflow-hidden
          shadow-sm bg-slate-900 
        "
       
      >
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr
                className="
                  text-sm
                  border-b bg-steel-500
                  text-steel-400
                "
               
              >
                <th className="px-6 py-4 text-left font-semibold">Service</th>

                <th className="px-6 py-4 text-left font-semibold">Schedule</th>

                <th className="px-6 py-4 text-left font-semibold">Address</th>

                <th className="px-6 py-4 text-left font-semibold">Status</th>

                <th className="px-6 py-4 text-right font-semibold">Actions</th>
              </tr>
            </thead>

            <tbody>
              {bookings.length > 0 ? (
                bookings.map((booking) => (
                  <tr
                    key={booking.id}
                    className="
                      transition
                      border-b
                      hover:bg-black/5
                    "
                    style={{
                      borderColor: "var(--color-steel-200)",
                    }}
                  >
                    {/* Service */}
                    <td className="px-6 py-5">
                      <p
                        className="font-semibold"
                        style={{
                          color: "var(--color-text)",
                        }}
                      >
                        {booking.service?.title}
                      </p>

                      <p
                        className="text-xs mt-1"
                        style={{
                          color: "var(--color-muted)",
                        }}
                      >
                        {booking.service?.category?.name}
                      </p>
                    </td>

                    {/* Date */}
                    <td className="px-6 py-5">
                      <div
                        className="
                          flex
                          items-center
                          gap-2
                          text-sm
                        "
                        style={{
                          color: "var(--color-muted)",
                        }}
                      >
                        <Calendar className="w-4 h-4" />

                        {new Date(booking.scheduledAt).toLocaleString([], {
                          dateStyle: "medium",
                          timeStyle: "short",
                        })}
                      </div>
                    </td>

                    {/* Address */}
                    <td
                      className="
                        px-6 py-5
                        text-sm
                        max-w-[180px]
                        truncate
                      "
                      style={{
                        color: "var(--color-muted)",
                      }}
                    >
                      {booking.address}
                    </td>

                    {/* Status */}
                    <td className="px-6 py-5">
                      {getStatusBadge(booking.status)}
                    </td>

                    {/* Actions */}
                    <td
                      className="
                        px-6 py-5
                        flex
                        justify-end
                        gap-2
                      "
                    >
                      {/* Cancel only REQUESTED */}
                      {booking.status === "REQUESTED" && (
                        <form
                          action={cancelBookingAction.bind(null, booking.id)}
                        >
                          <button
                            className="
                                inline-flex
                                items-center
                                gap-1.5
                                px-3
                                py-1.5
                                rounded-lg
                                text-xs
                                font-semibold
                              "
                            style={{
                              backgroundColor: "var(--color-danger-bg)",
                              color: "var(--color-danger)",
                            }}
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
                            className="
                                inline-flex
                                items-center
                                gap-1.5
                                px-3
                                py-1.5
                                rounded-lg
                                text-xs
                                font-semibold
                                text-white
                              "
                            style={{
                              backgroundColor: "var(--color-signal)",
                            }}
                          >
                            <CreditCard className="w-4 h-4" />
                            Pay Now
                          </button>
                        </form>
                      )}

                      {/* Review only if not reviewed */}
                      {
                        booking.status === "COMPLETED" &&   <Link
                          href={`/dashboard/bookings/${booking.id}#review`}
                          className="
                              inline-flex
                              items-center
                              gap-1.5
                              px-3
                              py-1.5
                              rounded-lg
                              text-xs
                              font-semibold
                            "
                          style={{
                            backgroundColor: "var(--color-warning-bg)",
                            color: "var(--color-warning)",
                          }}
                        >
                          <Star className="w-4 h-4" />
                          Review
                        </Link>
                      }

                      {/* Already reviewed */}
                      {/* {booking.status === "COMPLETED" && booking.review && (
                        <span
                          className="
                              inline-flex
                              items-center
                              gap-1
                              px-3
                              py-1.5
                              rounded-lg
                              text-xs
                              font-semibold
                            "
                          style={{
                            backgroundColor: "var(--color-success-bg)",
                            color: "var(--color-success)",
                          }}
                        >
                          <CheckCircle className="w-4 h-4" />
                          Reviewed
                        </span>
                      )} */}

                      {/* View */}
                      <Link
                        href={`/dashboard/bookings/${booking.id}`}
                        className="
                          inline-flex
                          items-center
                          gap-1.5
                          px-3
                          py-1.5
                          rounded-lg
                          text-xs
                          font-semibold
                        "
                        style={{
                          backgroundColor: "var(--color-steel-100)",
                          color: "var(--color-text)",
                        }}
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
                    className="
                        px-6
                        py-12
                        text-center
                        text-sm
                      "
                    style={{
                      color: "var(--color-muted)",
                    }}
                  >
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
