import Link from "next/link";
import { Calendar, CheckCircle2, Clock, XCircle, DollarSign, Star, ArrowRight, Shield, AlertCircle } from "lucide-react";
import { getMe } from "@/service/getMe";

export default async function DashboardMainPage() {
  const response = await getMe();
  const profile = response?.data || response;

  if (!profile || !profile.id) {
    return (
      <div className="flex flex-col items-center justify-center py-20 text-white">
        <h2 className="text-xl font-bold">Failed to load dashboard</h2>
        <p className="text-gray-300 mt-2">Could not retrieve your dashboard information.</p>
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
    <div className="space-y-8 max-w-full text-white">
      {/* Welcome Banner */}
      <div className="bg-linear-to-r from-slate-900 via-slate-800 to-slate-900 border border-slate-700 rounded-2xl p-6 md:p-8 shadow-sm flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
        <div className="space-y-2">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-blue-500/20 text-blue-300 border border-blue-500/30">
            <Shield className="w-3.5 h-3.5" /> {profile.role} Dashboard
          </div>
          <h1 className="text-2xl md:text-3xl font-bold text-white capitalize">
            Welcome back, {profile.name}!
          </h1>
          <p className="text-sm text-gray-300">
            Here is an overview of your recent bookings, activities, and account status.
          </p>
        </div>
        <Link
          href="/dashboard/bookings"
          className="px-5 py-2.5 bg-blue-600 hover:bg-blue-500 text-white font-semibold text-sm rounded-xl transition shadow-lg shadow-blue-600/20 flex items-center gap-2"
        >
          View All Bookings <ArrowRight className="w-4 h-4" />
        </Link>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Total Bookings */}
        <div className="bg-slate-900 border border-slate-700 rounded-xl p-5 shadow-sm space-y-2">
          <div className="flex items-center justify-between text-gray-400">
            <span className="text-sm font-medium">Total Bookings</span>
            <Calendar className="w-5 h-5 text-blue-400" />
          </div>
          <div className="text-3xl font-bold text-white">{totalBookings}</div>
          <p className="text-xs text-gray-400">All-time service requests</p>
        </div>

        {/* Completed / Paid */}
        <div className="bg-slate-900 border border-slate-700 rounded-xl p-5 shadow-sm space-y-2">
          <div className="flex items-center justify-between text-gray-400">
            <span className="text-sm font-medium">Completed / Paid</span>
            <CheckCircle2 className="w-5 h-5 text-green-400" />
          </div>
          <div className="text-3xl font-bold text-white">{completedBookings}</div>
          <p className="text-xs text-green-400/90 font-medium">Successfully finished</p>
        </div>

        {/* Active / Pending */}
        <div className="bg-slate-900 border border-slate-700 rounded-xl p-5 shadow-sm space-y-2">
          <div className="flex items-center justify-between text-gray-400">
            <span className="text-sm font-medium">Active / In Progress</span>
            <Clock className="w-5 h-5 text-amber-400" />
          </div>
          <div className="text-3xl font-bold text-white">{pendingBookings}</div>
          <p className="text-xs text-amber-400/90 font-medium">Ongoing or pending status</p>
        </div>

        {/* Cancelled */}
        <div className="bg-slate-900 border border-slate-700 rounded-xl p-5 shadow-sm space-y-2">
          <div className="flex items-center justify-between text-gray-400">
            <span className="text-sm font-medium">Cancelled / Declined</span>
            <XCircle className="w-5 h-5 text-red-400" />
          </div>
          <div className="text-3xl font-bold text-white">{cancelledBookings}</div>
          <p className="text-xs text-red-400/90 font-medium">Terminated bookings</p>
        </div>
      </div>

      {/* Recent Bookings & Reviews Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Recent Bookings (2 Cols) */}
        <div className="lg:col-span-2 space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-bold text-white">Recent Bookings</h2>
            <Link href="/dashboard/bookings" className="text-xs font-semibold text-blue-400 hover:underline">
              See All
            </Link>
          </div>

          <div className="space-y-3">
            {bookings.slice(0, 4).map((booking: any) => (
              <div key={booking.id} className="bg-slate-900 border border-slate-700 rounded-xl p-4 flex items-center justify-between gap-4 shadow-sm">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-mono text-gray-400">#{booking.id.slice(0, 6)}</span>
                    <span className={`px-2 py-0.5 rounded-full text-[10px] font-semibold border ${
                      booking.status === "COMPLETED" || booking.status === "PAID" 
                        ? "bg-green-500/20 text-green-300 border-green-500/30"
                        : booking.status === "IN_PROGRESS"
                        ? "bg-blue-500/20 text-blue-300 border-blue-500/30"
                        : "bg-amber-500/20 text-amber-300 border-amber-500/30"
                    }`}>
                      {booking.status}
                    </span>
                  </div>
                  <p className="text-sm font-medium text-white">{booking.address}</p>
                  <p className="text-xs text-gray-400">
                    {new Date(booking.scheduledAt).toLocaleString([], { dateStyle: "medium", timeStyle: "short" })}
                  </p>
                </div>

                <Link
                  href={`/dashboard/bookings/${booking.id}`}
                  className="px-3 py-1.5 bg-slate-800 hover:bg-slate-700 border border-slate-700 text-white text-xs font-semibold rounded-lg transition"
                >
                  Details
                </Link>
              </div>
            ))}

            {bookings.length === 0 && (
              <div className="bg-slate-900 border border-slate-700 rounded-xl p-8 text-center text-gray-400">
                No recent bookings available.
              </div>
            )}
          </div>
        </div>

        {/* Recent Reviews (1 Col) */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-bold text-white">Your Reviews</h2>
            <Link href="/dashboard/profile" className="text-xs font-semibold text-blue-400 hover:underline">
              View Profile
            </Link>
          </div>

          <div className="space-y-3">
            {reviews.slice(0, 3).map((review: any) => (
              <div key={review.id} className="bg-slate-900 border border-slate-700 rounded-xl p-4 space-y-2 shadow-sm">
                <div className="flex items-center justify-between">
                  <div className="flex items-center text-amber-400 gap-1">
                    {Array.from({ length: review.rating }).map((_, i) => (
                      <Star key={i} className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                    ))}
                  </div>
                  <span className="text-[10px] text-gray-400">{new Date(review.createdAt).toLocaleDateString()}</span>
                </div>
                <p className="text-xs text-gray-300 italic line-clamp-2">"{review.comment}"</p>
              </div>
            ))}

            {reviews.length === 0 && (
              <div className="bg-slate-900 border border-slate-700 rounded-xl p-8 text-center text-gray-400 text-xs">
                You haven't given any reviews yet.
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}