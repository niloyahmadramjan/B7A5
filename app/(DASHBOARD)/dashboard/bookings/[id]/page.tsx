import Link from "next/link";
import { ArrowLeft, Clock, MapPin, Calendar, FileText, CreditCard, XCircle, MessageSquare, User, Phone, Star, Wrench } from "lucide-react";
import { getBookingById, cancelBookingAction, payBookingAction, submitReviewAction } from "../../_action/myBookings";
import { BookingStatus } from "@/types/booking";

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
    <span className={`badge text-sm px-3 py-1 ${statusMap[status] || "badge-completed"}`}>
      {status.replace("_", " ")}
    </span>
  );
};

export default async function BookingDetailsPage({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = await params;
  const booking = await getBookingById(resolvedParams.id);

  if (!booking || !booking.id) {
    return (
      <div className="flex flex-col items-center justify-center py-20 text-[var(--color-ink)]">
        <h2 className="text-xl font-bold">Booking not found</h2>
        <p className="text-[var(--color-ink-muted)] mt-2">The booking ID {resolvedParams.id} does not exist.</p>
        <Link href="/dashboard/bookings" className="text-[var(--color-signal)] mt-6 inline-flex items-center hover:underline">
          <ArrowLeft className="w-4 h-4 mr-2" /> Back to bookings
        </Link>
      </div>
    );
  }

  return (
    <div className="space-y-6 max-w-full">
      {/* Header & Back Button */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Link href="/dashboard/bookings" className="p-2 card hover:bg-[var(--color-mist)] transition">
            <ArrowLeft className="w-5 h-5 text-[var(--color-ink)]" />
          </Link>
          <div>
            <h1 className="text-2xl font-bold">Booking Details</h1>
            <p className="text-sm text-[var(--color-ink-muted)]">ID: {booking.id}</p>
          </div>
        </div>

        {/* Dynamic Header Actions */}
        <div className="flex items-center gap-3">
          {(booking.status === "REQUESTED" || booking.status === "IN_PROGRESS") && (
            <form action={cancelBookingAction.bind(null, booking.id)}>
              <button type="submit" className="inline-flex items-center gap-2 px-4 py-2 card border border-red-500/30 text-red-600 dark:text-red-400 text-sm font-semibold rounded-lg hover:bg-red-500/10 transition">
                <XCircle className="w-4 h-4" /> Cancel Booking
              </button>
            </form>
          )}

          {booking.status === "ACCEPTED" && (
            <form action={payBookingAction.bind(null, booking.id)}>
              <button type="submit" className="btn-primary inline-flex items-center gap-2 px-5 py-2 text-sm font-semibold rounded-lg shadow-sm">
                <CreditCard className="w-4 h-4" /> Pay Now
              </button>
            </form>
          )}
        </div>
      </div>

      {/* Main Content Card */}
      <div className="card p-6">
        <div className="flex justify-between items-start border-b border-[var(--color-steel-200)] pb-6 mb-6">
          <div>
            <h2 className="text-xl font-bold mb-1">{booking.service?.title}</h2>
            <p className="text-sm text-[var(--color-ink-muted)]">{booking.service?.description}</p>
          </div>
          <div>
            {getStatusBadge(booking.status)}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Details Section */}
          <div className="space-y-4">
            <h3 className="text-sm font-semibold text-[var(--color-ink-muted)] uppercase tracking-wider">Schedule & Location</h3>
            
            <div className="flex items-start gap-3 text-sm text-[var(--color-ink-muted)]">
              <Calendar className="w-5 h-5 text-[var(--color-steel)] mt-0.5" />
              <div>
                <p className="font-medium text-[var(--color-ink)]">Scheduled Date</p>
                <p className="text-[var(--color-ink-muted)]">{new Date(booking.scheduledAt).toLocaleString([], { dateStyle: "long", timeStyle: "short" })}</p>
              </div>
            </div>

            <div className="flex items-start gap-3 text-sm text-[var(--color-ink-muted)]">
              <MapPin className="w-5 h-5 text-[var(--color-steel)] mt-0.5" />
              <div>
                <p className="font-medium text-[var(--color-ink)]">Service Address</p>
                <p className="leading-relaxed text-[var(--color-ink-muted)]">{booking.address || "No address provided"}</p>
              </div>
            </div>

            <div className="flex items-start gap-3 text-sm text-[var(--color-ink-muted)]">
              <Clock className="w-5 h-5 text-[var(--color-steel)] mt-0.5" />
              <div>
                <p className="font-medium text-[var(--color-ink)]">Estimated Duration</p>
                <p className="text-[var(--color-ink-muted)]">{booking.service?.duration} Minutes</p>
              </div>
            </div>

            {/* Technician Info */}
            {booking.technician?.user && (
              <div className="pt-3 border-t border-[var(--color-steel-200)]">
                <p className="font-medium text-[var(--color-ink)] text-sm mb-2">Assigned Technician</p>
                <div className="flex items-center gap-3 text-sm text-[var(--color-ink-muted)]">
                  <User className="w-5 h-5 text-[var(--color-steel)]" />
                  <div>
                    <p className="font-medium text-[var(--color-ink)]">{booking.technician.user.name}</p>
                    <p className="text-xs text-[var(--color-ink-muted)]">{booking.technician.user.email}</p>
                  </div>
                </div>
                {booking.technician.user.phone && (
                  <div className="flex items-center gap-3 text-sm text-[var(--color-ink-muted)] mt-2">
                    <Phone className="w-5 h-5 text-[var(--color-steel)]" />
                    <p className="text-[var(--color-ink-muted)]">{booking.technician.user.phone}</p>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Pricing & Notes Section */}
          <div className="space-y-4">
            <h3 className="text-sm font-semibold text-[var(--color-ink-muted)] uppercase tracking-wider">Additional Info</h3>
            
            <div className="bg-[var(--color-mist)] p-4 rounded-lg border border-[var(--color-steel-200)]">
              <p className="text-sm font-medium text-[var(--color-ink)] mb-1">Total Amount</p>
              <p className="text-2xl font-bold text-[var(--color-ink)]">৳{booking.service?.price?.toLocaleString()}</p>
            </div>

            <div className="flex items-start gap-3 text-sm text-[var(--color-ink-muted)]">
              <FileText className="w-5 h-5 text-[var(--color-steel)] mt-0.5" />
              <div>
                <p className="font-medium text-[var(--color-ink)]">Customer Notes</p>
                <p className="italic text-[var(--color-ink-muted)] mt-1">
                  {booking.notes ? `"${booking.notes}"` : "No special instructions provided."}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Review Section */}
      {booking.status === "COMPLETED" && (
        <div id="review" className="card p-6">
          <div className="flex items-center gap-2 mb-4">
            <MessageSquare className="w-5 h-5 text-amber-500" />
            <h3 className="text-lg font-bold">
              {booking.review ? "Your Review" : "Leave a Review"}
            </h3>
          </div>

          {booking.review ? (
            <div className="bg-[var(--color-mist)] p-4 rounded-lg border border-[var(--color-steel-200)] space-y-2">
              <div className="flex items-center gap-1 text-amber-500">
                {Array.from({ length: booking.review.rating }).map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-amber-500 text-amber-500" />
                ))}
                <span className="text-sm font-semibold text-[var(--color-ink)] ml-2">({booking.review.rating}/5)</span>
              </div>
              <p className="text-[var(--color-ink-muted)] text-sm italic">"{booking.review.comment}"</p>
            </div>
          ) : (
            <>
              <p className="text-sm text-[var(--color-ink-muted)] mb-6">How was your service? Share your experience to help others.</p>
              
              <form action={submitReviewAction} className="max-w-2xl space-y-4">
                <input type="hidden" name="bookingId" value={booking.id} />
                
                <div>
                  <label htmlFor="rating" className="block text-sm font-medium text-[var(--color-ink)] mb-1">Rating</label>
                  <select 
                    id="rating"
                    name="rating" 
                    required 
                    className="w-full sm:w-64 px-3 py-2 bg-[var(--color-surface)] border border-[var(--color-steel-200)] text-[var(--color-ink)] rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-[var(--color-signal)]"
                  >
                    <option value="5">⭐⭐⭐⭐⭐ - Excellent</option>
                    <option value="4">⭐⭐⭐⭐ - Good</option>
                    <option value="3">⭐⭐⭐ - Average</option>
                    <option value="2">⭐⭐ - Poor</option>
                    <option value="1">⭐ - Terrible</option>
                  </select>
                </div>

                <div>
                  <label htmlFor="comment" className="block text-sm font-medium text-[var(--color-ink)] mb-1">Your Comment</label>
                  <textarea 
                    id="comment"
                    name="comment" 
                    required 
                    rows={3} 
                    className="w-full px-3 py-2 bg-[var(--color-surface)] border border-[var(--color-steel-200)] text-[var(--color-ink)] rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-[var(--color-signal)] placeholder:text-[var(--color-ink-muted)]" 
                    placeholder="Tell us what you liked about the service..."
                  />
                </div>

                <button 
                  type="submit" 
                  className="btn-primary px-5 py-2.5 text-sm font-semibold rounded-lg transition shadow-sm"
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