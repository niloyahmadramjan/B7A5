import Link from "next/link";
import { ArrowLeft, Clock, MapPin, Calendar, FileText, CreditCard, XCircle, MessageSquare, User, Phone, Star } from "lucide-react";
import { getBookingById, cancelBookingAction, payBookingAction, submitReviewAction } from "../../_action/myBookings";
import { BookingStatus } from "@/types/booking";

const getStatusBadge = (status: BookingStatus) => {
  const styles: Record<string, string> = {
    REQUESTED: "bg-yellow-500/20 text-yellow-300 border-yellow-500/30",
    PENDING: "bg-yellow-500/20 text-yellow-300 border-yellow-500/30",
    ACCEPTED: "bg-blue-500/20 text-blue-300 border-blue-500/30",
    DECLINED: "bg-red-500/20 text-red-300 border-red-500/30",
    PAID: "bg-purple-500/20 text-purple-300 border-purple-500/30",
    IN_PROGRESS: "bg-green-500/20 text-green-300 border-green-500/30",
    COMPLETED: "bg-gray-700 text-gray-200 border-gray-600",
    CANCELLED: "bg-red-900/50 text-red-200 border-red-800",
  };
  return (
    <span className={`px-3 py-1 rounded-full text-sm font-semibold border ${styles[status] || "bg-gray-800 text-gray-200"}`}>
      {status.replace("_", " ")}
    </span>
  );
};

export default async function BookingDetailsPage({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = await params;
  
  const booking = await getBookingById(resolvedParams.id);

  if (!booking || !booking.id) {
    return (
      <div className="flex flex-col items-center justify-center py-20 text-white">
        <h2 className="text-xl font-bold text-white">Booking not found</h2>
        <p className="text-gray-300 mt-2">The booking ID {resolvedParams.id} does not exist.</p>
        <Link href="/dashboard/bookings" className="text-blue-400 mt-6 inline-flex items-center hover:underline">
          <ArrowLeft className="w-4 h-4 mr-2" /> Back to bookings
        </Link>
      </div>
    );
  }

  return (
    <div className="space-y-6 max-w-full text-white">
      {/* Header & Back Button */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Link href="/dashboard/bookings" className="p-2 bg-slate-800 rounded-lg border border-slate-700 hover:bg-slate-700 transition">
            <ArrowLeft className="w-5 h-5 text-white" />
          </Link>
          <div>
            <h1 className="text-2xl font-bold text-white">Booking Details</h1>
            <p className="text-sm text-gray-300">ID: {booking.id}</p>
          </div>
        </div>

        {/* Dynamic Header Actions */}
        <div className="flex items-center gap-3">
          {(booking.status === "REQUESTED" || booking.status === "IN_PROGRESS") && (
            <form action={cancelBookingAction.bind(null, booking.id)}>
              <button type="submit" className="inline-flex items-center gap-2 px-4 py-2 bg-slate-800 border border-red-500/50 text-red-400 text-sm font-semibold rounded-lg hover:bg-red-950/50 transition">
                <XCircle className="w-4 h-4" /> Cancel Booking
              </button>
            </form>
          )}

          {booking.status === "ACCEPTED" && (
            <form action={payBookingAction.bind(null, booking.id)}>
              <button type="submit" className="inline-flex items-center gap-2 px-5 py-2 bg-blue-600 text-white text-sm font-semibold rounded-lg hover:bg-blue-500 transition shadow-sm">
                <CreditCard className="w-4 h-4" /> Pay Now
              </button>
            </form>
          )}
        </div>
      </div>

      {/* Main Content Card */}
      <div className="rounded-xl shadow-sm border border-slate-700 p-6 bg-slate-900 text-white">
        <div className="flex justify-between items-start border-b border-slate-800 pb-6 mb-6">
          <div>
            <h2 className="text-xl font-bold text-white mb-1">{booking.service?.title}</h2>
            <p className="text-sm text-gray-300">{booking.service?.description}</p>
          </div>
          <div>
            {getStatusBadge(booking.status)}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Details Section */}
          <div className="space-y-4">
            <h3 className="text-sm font-semibold text-gray-300 uppercase tracking-wider">Schedule & Location</h3>
            
            <div className="flex items-start gap-3 text-sm text-gray-300">
              <Calendar className="w-5 h-5 text-gray-400 mt-0.5" />
              <div>
                <p className="font-medium text-white">Scheduled Date</p>
                <p className="text-gray-300">{new Date(booking.scheduledAt).toLocaleString([], { dateStyle: "long", timeStyle: "short" })}</p>
              </div>
            </div>

            <div className="flex items-start gap-3 text-sm text-gray-300">
              <MapPin className="w-5 h-5 text-gray-400 mt-0.5" />
              <div>
                <p className="font-medium text-white">Service Address</p>
                <p className="leading-relaxed text-gray-300">{booking.address || "No address provided"}</p>
              </div>
            </div>

            <div className="flex items-start gap-3 text-sm text-gray-300">
              <Clock className="w-5 h-5 text-gray-400 mt-0.5" />
              <div>
                <p className="font-medium text-white">Estimated Duration</p>
                <p className="text-gray-300">{booking.service?.duration} Minutes</p>
              </div>
            </div>

            {/* Technician Info */}
            {booking.technician?.user && (
              <div className="pt-3 border-t border-slate-800">
                <p className="font-medium text-white text-sm mb-2">Assigned Technician</p>
                <div className="flex items-center gap-3 text-sm text-gray-300">
                  <User className="w-5 h-5 text-gray-400" />
                  <div>
                    <p className="font-medium text-white">{booking.technician.user.name}</p>
                    <p className="text-xs text-gray-400">{booking.technician.user.email}</p>
                  </div>
                </div>
                {booking.technician.user.phone && (
                  <div className="flex items-center gap-3 text-sm text-gray-300 mt-2">
                    <Phone className="w-5 h-5 text-gray-400" />
                    <p className="text-gray-300">{booking.technician.user.phone}</p>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Pricing & Notes Section */}
          <div className="space-y-4">
            <h3 className="text-sm font-semibold text-gray-300 uppercase tracking-wider">Additional Info</h3>
            
            <div className="bg-slate-800/50 p-4 rounded-lg border border-slate-700">
              <p className="text-sm font-medium text-white mb-1">Total Amount</p>
              <p className="text-2xl font-bold text-white">৳{booking.service?.price?.toLocaleString()}</p>
            </div>

            <div className="flex items-start gap-3 text-sm text-gray-300">
              <FileText className="w-5 h-5 text-gray-400 mt-0.5" />
              <div>
                <p className="font-medium text-white">Customer Notes</p>
                <p className="italic text-gray-300 mt-1">
                  {booking.notes ? `"${booking.notes}"` : "No special instructions provided."}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Review Section (Show Form if not reviewed yet, or show existing review) */}
      {booking.status === "COMPLETED" && (
        <div id="review" className="rounded-xl shadow-sm border border-slate-700 bg-slate-900 p-6 text-white">
          <div className="flex items-center gap-2 mb-4">
            <MessageSquare className="w-5 h-5 text-amber-400" />
            <h3 className="text-lg font-bold text-white">
              {booking.review ? "Your Review" : "Leave a Review"}
            </h3>
          </div>

          {booking.review ? (
            <div className="bg-slate-800/50 p-4 rounded-lg border border-slate-700 space-y-2">
              <div className="flex items-center gap-1 text-amber-400">
                {Array.from({ length: booking.review.rating }).map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                ))}
                <span className="text-sm font-semibold text-white ml-2">({booking.review.rating}/5)</span>
              </div>
              <p className="text-gray-200 text-sm italic">"{booking.review.comment}"</p>
            </div>
          ) : (
            <>
              <p className="text-sm text-gray-300 mb-6">How was your service? Share your experience to help others.</p>
              
              <form action={submitReviewAction} className="max-w-2xl space-y-4">
                <input type="hidden" name="bookingId" value={booking.id} />
                
                <div>
                  <label htmlFor="rating" className="block text-sm font-medium text-gray-300 mb-1">Rating</label>
                  <select 
                    id="rating"
                    name="rating" 
                    required 
                    className="w-full sm:w-64 px-3 py-2 bg-slate-800 border border-slate-700 text-white rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-amber-500"
                  >
                    <option value="5">⭐⭐⭐⭐⭐ - Excellent</option>
                    <option value="4">⭐⭐⭐⭐ - Good</option>
                    <option value="3">⭐⭐⭐ - Average</option>
                    <option value="2">⭐⭐ - Poor</option>
                    <option value="1">⭐ - Terrible</option>
                  </select>
                </div>

                <div>
                  <label htmlFor="comment" className="block text-sm font-medium text-gray-300 mb-1">Your Comment</label>
                  <textarea 
                    id="comment"
                    name="comment" 
                    required 
                    rows={3} 
                    className="w-full px-3 py-2 bg-slate-800 border border-slate-700 text-white rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-amber-500 placeholder:text-gray-500" 
                    placeholder="Tell us what you liked about the service..."
                  />
                </div>

                <button 
                  type="submit" 
                  className="px-5 py-2.5 bg-white text-slate-900 text-sm font-semibold rounded-lg hover:bg-gray-200 transition"
                >
                  Submit Review
                </button>
              </form>
            </>
          )}
        </div>
      )}
    </div>
  );
}