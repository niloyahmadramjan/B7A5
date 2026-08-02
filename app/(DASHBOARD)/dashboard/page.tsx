import Link from "next/link";
import { Calendar, CheckCircle2, Clock, XCircle, Star, ArrowRight, Shield } from "lucide-react";
import { getMe } from "@/service/getMe";

export default async function DashboardMainPage() {
  const response = await getMe();
  const profile = response?.data || response;

  if (!profile || !profile.id) {
    return (
      <div className="flex flex-col items-center justify-center py-20 text-[var(--color-ink)]">
        <h2 className="text-xl font-bold">Failed to load dashboard</h2>
        <p className="text-[var(--color-ink-muted)] mt-2">Could not retrieve your dashboard information.</p>
      </div>
    );
  }

  const bookings = profile.bookingsAsCustomer || [];
  const reviews = profile.reviews || [];

  const totalBookings = bookings.length;
  const completedBookings = bookings.filter((b: any) => b.status === "COMPLETED" || b.status === "PAID").length;
  const pendingBookings = bookings.filter((b: any) => b.status === "REQUESTED" || b.status === "PENDING" || b.status === "IN_PROGRESS").length;
  const cancelledBookings = bookings.filter((b: any) => b.status === "CANCELLED" || b.status === "DECLINED").length;

  return (
    <div className="space-y-8 max-w-full">
      {/* Welcome Banner */}
      <div className="card p-6 md:p-8 flex flex-col md:flex-row justify-between items-start md:items-center gap-6 bg-gradient-to-r from-[var(--color-surface)] via-[var(--color-surface)] to-[var(--color-mist)] border-[var(--color-steel-200)] shadow-sm">
        <div className="space-y-2">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-[var(--color-signal)]/10 text-[var(--color-signal)] border border-[var(--color-signal)]/20">
            <Shield className="w-3.5 h-3.5" /> {profile.role} Dashboard
          </div>
          <h1 className="text-2xl md:text-3xl font-bold capitalize">
            Welcome back, {profile.name}!
          </h1>
          <p className="text-sm text-[var(--color-ink-muted)]">
            Here is an overview of your recent bookings, activities, and account status.
          </p>
        </div>
        <Link
          href="/dashboard/bookings"
          className="btn-primary flex items-center gap-2 text-sm shadow-md"
        >
          View All Bookings <ArrowRight className="w-4 h-4" />
        </Link>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Total Bookings */}
        <div className="card p-5 space-y-2">
          <div className="flex items-center justify-between text-[var(--color-ink-muted)]">
            <span className="text-sm font-medium">Total Bookings</span>
            <Calendar className="w-5 h-5 text-[var(--color-steel)]" />
          </div>
          <div className="text-3xl font-bold">{totalBookings}</div>
          <p className="text-xs text-[var(--color-ink-muted)]">All-time service requests</p>
        </div>

        {/* Completed / Paid */}
        <div className="card p-5 space-y-2">
          <div className="flex items-center justify-between text-[var(--color-ink-muted)]">
            <span className="text-sm font-medium">Completed / Paid</span>
            <CheckCircle2 className="w-5 h-5 text-emerald-500" />
          </div>
          <div className="text-3xl font-bold">{completedBookings}</div>
          <p className="text-xs text-emerald-600 dark:text-emerald-400 font-medium">Successfully finished</p>
        </div>

        {/* Active / Pending */}
        <div className="card p-5 space-y-2">
          <div className="flex items-center justify-between text-[var(--color-ink-muted)]">
            <span className="text-sm font-medium">Active / In Progress</span>
            <Clock className="w-5 h-5 text-amber-500" />
          </div>
          <div className="text-3xl font-bold">{pendingBookings}</div>
          <p className="text-xs text-amber-600 dark:text-amber-400 font-medium">Ongoing or pending status</p>
        </div>

        {/* Cancelled */}
        <div className="card p-5 space-y-2">
          <div className="flex items-center justify-between text-[var(--color-ink-muted)]">
            <span className="text-sm font-medium">Cancelled / Declined</span>
            <XCircle className="w-5 h-5 text-red-500" />
          </div>
          <div className="text-3xl font-bold">{cancelledBookings}</div>
          <p className="text-xs text-red-600 dark:text-red-400 font-medium">Terminated bookings</p>
        </div>
      </div>

      {/* Recent Bookings & Reviews Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Recent Bookings (2 Cols) */}
        <div className="lg:col-span-2 space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-bold">Recent Bookings</h2>
            <Link href="/dashboard/bookings" className="text-xs font-semibold text-[var(--color-signal)] hover:underline">
              See All
            </Link>
          </div>

          <div className="space-y-3">
            {bookings.slice(0, 4).map((booking: any) => (
              <div key={booking.id} className="card p-4 flex items-center justify-between gap-4 shadow-sm">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-mono text-[var(--color-ink-muted)]">#{booking.id.slice(0, 6)}</span>
                    <span className={`badge ${
                      booking.status === "COMPLETED" || booking.status === "PAID" 
                        ? "badge-completed"
                        : booking.status === "IN_PROGRESS"
                        ? "badge-in-progress"
                        : "badge-requested"
                    }`}>
                      {booking.status}
                    </span>
                  </div>
                  <p className="text-sm font-medium">{booking.address}</p>
                  <p className="text-xs text-[var(--color-ink-muted)]">
                    {new Date(booking.scheduledAt).toLocaleString([], { dateStyle: "medium", timeStyle: "short" })}
                  </p>
                </div>

                <Link
                  href={`/dashboard/bookings/${booking.id}`}
                  className="btn-secondary px-3 py-1.5 text-xs rounded-lg transition"
                >
                  Details
                </Link>
              </div>
            ))}

            {bookings.length === 0 && (
              <div className="card p-8 text-center text-[var(--color-ink-muted)]">
                No recent bookings available.
              </div>
            )}
          </div>
        </div>

        {/* Recent Reviews (1 Col) */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-bold">Your Reviews</h2>
            <Link href="/dashboard/profile" className="text-xs font-semibold text-[var(--color-signal)] hover:underline">
              View Profile
            </Link>
          </div>

          <div className="space-y-3">
            {reviews.slice(0, 3).map((review: any) => (
              <div key={review.id} className="card p-4 space-y-2 shadow-sm">
                <div className="flex items-center justify-between">
                  <div className="flex items-center text-amber-500 gap-1">
                    {Array.from({ length: review.rating }).map((_, i) => (
                      <Star key={i} className="w-3.5 h-3.5 fill-amber-500 text-amber-500" />
                    ))}
                  </div>
                  <span className="text-[10px] text-[var(--color-ink-muted)]">{new Date(review.createdAt).toLocaleDateString()}</span>
                </div>
                <p className="text-xs text-[var(--color-ink-muted)] italic line-clamp-2">"{review.comment}"</p>
              </div>
            ))}

            {reviews.length === 0 && (
              <div className="card p-8 text-center text-[var(--color-ink-muted)] text-xs">
                You haven't given any reviews yet.
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}