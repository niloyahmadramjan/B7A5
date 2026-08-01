import Link from "next/link";
import { User, Mail, Phone, Shield, Calendar, MapPin, Star, FileText, CheckCircle, Clock } from "lucide-react";
import { BookingStatus } from "@/types/booking";
import { getMe } from "@/service/getMe";

const getStatusBadge = (status: BookingStatus) => {
  const styles: Record<string, string> = {
    REQUESTED: "bg-yellow-500/20 text-yellow-300 border-yellow-500/30",
    PENDING: "bg-yellow-500/20 text-yellow-300 border-yellow-500/30",
    ACCEPTED: "bg-blue-500/20 text-blue-300 border-blue-500/30",
    DECLINED: "bg-red-500/20 text-red-300 border-regetMyProfiled-500/30",
    PAID: "bg-purple-500/20 text-purple-300 border-purple-500/30",
    IN_PROGRESS: "bg-green-500/20 text-green-300 border-green-500/30",
    COMPLETED: "bg-gray-700 text-gray-200 border-gray-600",
    CANCELLED: "bg-red-900/50 text-red-200 border-red-800",
  };
  return (
    <span className={`px-2.5 py-1 rounded-full text-xs font-semibold border ${styles[status] || "bg-gray-800 text-gray-200"}`}>
      {status.replace("_", " ")}
    </span>
  );
};

export default async function ProfilePage() {
  const response = await getMe();
  const profile = response?.data || response;

  if (!profile || !profile.id) {
    return (
      <div className="flex flex-col items-center justify-center py-20 text-white">
        <h2 className="text-xl font-bold">Profile not found</h2>
        <p className="text-gray-300 mt-2">Could not load user profile information.</p>
      </div>
    );
  }

  return (
    <div className="space-y-8 max-w-full text-white">
      {/* Page Header */}
      <div>
        <h1 className="text-2xl font-bold text-white">My Profile</h1>
        <p className="text-sm text-gray-300">Manage your account details, bookings, and history.</p>
      </div>

      {/* User Info Card */}
      <div className="rounded-xl shadow-sm border border-slate-700 p-6 bg-slate-900 text-white">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 pb-6 border-b border-slate-800">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-full bg-slate-800 border border-slate-700 flex items-center justify-center text-2xl font-bold text-white shadow-inner">
              {profile.name?.charAt(0).toUpperCase()}
            </div>
            <div>
              <h2 className="text-xl font-bold text-white capitalize">{profile.name}</h2>
              <p className="text-sm text-gray-300 flex items-center gap-1 mt-1">
                <Shield className="w-3.5 h-3.5 text-blue-400" /> Role: <span className="text-white font-medium">{profile.role}</span>
              </p>
            </div>
          </div>
          <div>
            <span className="px-3 py-1 rounded-full text-xs font-semibold bg-green-500/20 text-green-300 border border-green-500/30">
              {profile.status}
            </span>
          </div>
        </div>

        {/* Contact Details Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-6">
          <div className="flex items-center gap-3 text-sm text-gray-300 bg-slate-800/50 p-3.5 rounded-lg border border-slate-700/60">
            <Mail className="w-5 h-5 text-gray-400" />
            <div>
              <p className="text-xs text-gray-400">Email Address</p>
              <p className="font-medium text-white">{profile.email}</p>
            </div>
          </div>

          <div className="flex items-center gap-3 text-sm text-gray-300 bg-slate-800/50 p-3.5 rounded-lg border border-slate-700/60">
            <Phone className="w-5 h-5 text-gray-400" />
            <div>
              <p className="text-xs text-gray-400">Phone Number</p>
              <p className="font-medium text-white">{profile.phone || "Not provided"}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Bookings Section */}
      <div className="space-y-4">
        <h3 className="text-lg font-bold text-white">My Bookings ({profile.bookingsAsCustomer?.length || 0})</h3>
        
        {profile.bookingsAsCustomer && profile.bookingsAsCustomer.length > 0 ? (
          <div className="grid grid-cols-1 gap-4">
            {profile.bookingsAsCustomer.map((booking: any) => (
              <div key={booking.id} className="rounded-xl border border-slate-700 p-5 bg-slate-900 shadow-sm flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div className="space-y-1.5">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-mono text-gray-400">ID: {booking.id.slice(0, 8)}...</span>
                    {getStatusBadge(booking.status)}
                  </div>
                  <div className="flex items-center gap-3 text-sm text-gray-300 pt-1">
                    <Calendar className="w-4 h-4 text-gray-400" />
                    <span>{new Date(booking.scheduledAt).toLocaleString([], { dateStyle: "medium", timeStyle: "short" })}</span>
                  </div>
                  <div className="flex items-center gap-3 text-sm text-gray-300">
                    <MapPin className="w-4 h-4 text-gray-400" />
                    <span>{booking.address}</span>
                  </div>
                </div>

                <Link 
                  href={`/dashboard/bookings/${booking.id}`}
                  className="px-4 py-2 bg-slate-800 border border-slate-700 text-white text-xs font-semibold rounded-lg hover:bg-slate-700 transition"
                >
                  View Details
                </Link>
              </div>
            ))}
          </div>
        ) : (
          <div className="p-8 text-center bg-slate-900 border border-slate-700 rounded-xl text-gray-400">
            No bookings found.
          </div>
        )}
      </div>

      {/* Reviews Section */}
      <div className="space-y-4">
        <h3 className="text-lg font-bold text-white">My Reviews ({profile.reviews?.length || 0})</h3>
        
        {profile.reviews && profile.reviews.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {profile.reviews.map((review: any) => (
              <div key={review.id} className="rounded-xl border border-slate-700 p-5 bg-slate-900 shadow-sm space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1 text-amber-400">
                    {Array.from({ length: review.rating }).map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                    ))}
                    <span className="text-xs font-semibold text-white ml-1.5">({review.rating}/5)</span>
                  </div>
                  <span className="text-xs text-gray-400">{new Date(review.createdAt).toLocaleDateString()}</span>
                </div>
                <p className="text-sm text-gray-200 italic bg-slate-800/50 p-3 rounded-lg border border-slate-700/50">
                  "{review.comment}"
                </p>
              </div>
            ))}
          </div>
        ) : (
          <div className="p-8 text-center bg-slate-900 border border-slate-700 rounded-xl text-gray-400">
            You haven't submitted any reviews yet.
          </div>
        )}
      </div>
    </div>
  );
}