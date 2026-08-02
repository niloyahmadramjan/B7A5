import Link from "next/link";
import { User, Mail, Phone, Shield, Calendar, MapPin, Star, Wrench } from "lucide-react";
import { BookingStatus } from "@/types/booking";
import { getMe } from "@/service/getMe";

const getStatusBadge = (status: BookingStatus) => {
  const statusMap: Record<BookingStatus, string> = {
    REQUESTED: "badge-requested",
    // PENDING: "badge-requested",
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

export default async function ProfilePage() {
  const response = await getMe();
  const profile = response?.data || response;

  if (!profile || !profile.id) {
    return (
      <div className="flex flex-col items-center justify-center py-20 text-[var(--color-ink)]">
        <h2 className="text-xl font-bold">Profile not found</h2>
        <p className="text-[var(--color-ink-muted)] mt-2">Could not load user profile information.</p>
      </div>
    );
  }

  return (
    <div className="space-y-8 max-w-full">
      {/* Page Header */}
      <div>
        <h1 className="text-2xl font-bold">My Profile</h1>
        <p className="text-sm text-[var(--color-ink-muted)] mt-1">Manage your account details, bookings, and history.</p>
      </div>

      {/* User Info Card */}
      <div className="card p-6">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 pb-6 border-b border-[var(--color-steel-200)]">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-full bg-[var(--color-mist)] border border-[var(--color-steel-200)] flex items-center justify-center text-2xl font-bold text-[var(--color-ink)] shadow-inner">
              {profile.name?.charAt(0).toUpperCase()}
            </div>
            <div>
              <h2 className="text-xl font-bold capitalize text-[var(--color-ink)]">{profile.name}</h2>
              <p className="text-sm text-[var(--color-ink-muted)] flex items-center gap-1 mt-1">
                <Shield className="w-3.5 h-3.5 text-[var(--color-signal)]" /> Role: <span className="text-[var(--color-ink)] font-medium">{profile.role}</span>
              </p>
            </div>
          </div>
          <div>
            <span className="px-3 py-1 rounded-full text-xs font-semibold bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20">
              {profile.status}
            </span>
          </div>
        </div>

        {/* Contact Details Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-6">
          <div className="flex items-center gap-3 text-sm text-[var(--color-ink-muted)] bg-[var(--color-mist)] p-3.5 rounded-lg border border-[var(--color-steel-200)]">
            <Mail className="w-5 h-5 text-[var(--color-steel)]" />
            <div>
              <p className="text-xs text-[var(--color-ink-muted)]">Email Address</p>
              <p className="font-medium text-[var(--color-ink)]">{profile.email}</p>
            </div>
          </div>

          <div className="flex items-center gap-3 text-sm text-[var(--color-ink-muted)] bg-[var(--color-mist)] p-3.5 rounded-lg border border-[var(--color-steel-200)]">
            <Phone className="w-5 h-5 text-[var(--color-steel)]" />
            <div>
              <p className="text-xs text-[var(--color-ink-muted)]">Phone Number</p>
              <p className="font-medium text-[var(--color-ink)]">{profile.phone || "Not provided"}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Bookings Section */}
      <div className="space-y-4">
        <h3 className="text-lg font-bold">My Bookings ({profile.bookingsAsCustomer?.length || 0})</h3>
        
        {profile.bookingsAsCustomer && profile.bookingsAsCustomer.length > 0 ? (
          <div className="grid grid-cols-1 gap-4">
            {profile.bookingsAsCustomer.map((booking: any) => (
              <div key={booking.id} className="card p-5 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 shadow-sm">
                <div className="space-y-1.5">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-mono text-[var(--color-ink-muted)]">ID: {booking.id.slice(0, 8)}...</span>
                    {getStatusBadge(booking.status)}
                  </div>
                  <div className="flex items-center gap-3 text-sm text-[var(--color-ink-muted)] pt-1">
                    <Calendar className="w-4 h-4 text-[var(--color-steel)]" />
                    <span>{new Date(booking.scheduledAt).toLocaleString([], { dateStyle: "medium", timeStyle: "short" })}</span>
                  </div>
                  <div className="flex items-center gap-3 text-sm text-[var(--color-ink-muted)]">
                    <MapPin className="w-4 h-4 text-[var(--color-steel)]" />
                    <span>{booking.address}</span>
                  </div>
                </div>

                <Link 
                  href={`/dashboard/bookings/${booking.id}`}
                  className="btn-secondary px-4 py-2 text-xs font-semibold rounded-lg transition"
                >
                  View Details
                </Link>
              </div>
            ))}
          </div>
        ) : (
          <div className="card p-8 text-center text-[var(--color-ink-muted)]">
            <Wrench className="w-8 h-8 mx-auto text-[var(--color-steel)] mb-2 animate-pulse" />
            No bookings found.
          </div>
        )}
      </div>

      {/* Reviews Section */}
      <div className="space-y-4">
        <h3 className="text-lg font-bold">My Reviews ({profile.reviews?.length || 0})</h3>
        
        {profile.reviews && profile.reviews.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {profile.reviews.map((review: any) => (
              <div key={review.id} className="card p-5 space-y-3 shadow-sm">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1 text-amber-500">
                    {Array.from({ length: review.rating }).map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-amber-500 text-amber-500" />
                    ))}
                    <span className="text-xs font-semibold text-[var(--color-ink)] ml-1.5">({review.rating}/5)</span>
                  </div>
                  <span className="text-xs text-[var(--color-ink-muted)]">{new Date(review.createdAt).toLocaleDateString()}</span>
                </div>
                <p className="text-sm text-[var(--color-ink-muted)] italic bg-[var(--color-mist)] p-3 rounded-lg border border-[var(--color-steel-200)]">
                  "{review.comment}"
                </p>
              </div>
            ))}
          </div>
        ) : (
          <div className="card p-8 text-center text-[var(--color-ink-muted)] text-xs">
            You haven't submitted any reviews yet.
          </div>
        )}
      </div>
    </div>
  );
}