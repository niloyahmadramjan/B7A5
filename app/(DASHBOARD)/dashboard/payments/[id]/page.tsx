import Link from "next/link";
import { ArrowLeft, DollarSign, Calendar, MapPin, Wrench, FileText } from "lucide-react";
import { getPaymentById } from "../../_action/paymentHistory";

interface PageProps {
  params: Promise<{ id: string }>;
}

export default async function PaymentDetailsPage({ params }: PageProps) {
  const { id } = await params;
  const response = await getPaymentById(id);
  
  const paymentResult = response?.data?.result || response?.data || response;

  if (!paymentResult || !paymentResult.id) {
    return (
      <div className="flex flex-col items-center justify-center py-20 text-[var(--color-ink)] space-y-4">
        <h2 className="text-xl font-bold">Payment Details Not Found</h2>
        <p className="text-[var(--color-ink-muted)] text-sm">Could not retrieve information for this payment transaction.</p>
        <Link
          href="/dashboard/payments"
          className="btn-primary px-4 py-2 text-xs font-semibold rounded-xl transition shadow-sm"
        >
          Back to Payments
        </Link>
      </div>
    );
  }

  const booking = paymentResult.booking || {};
  const service = booking.service || {};

  return (
    <div className="space-y-8 max-w-full">
      {/* Top Bar with Back Button */}
      <div className="flex items-center justify-between">
        <Link
          href="/dashboard/payments"
          className="inline-flex items-center gap-2 text-sm text-[var(--color-ink-muted)] hover:text-[var(--color-ink)] card px-4 py-2 transition"
        >
          <ArrowLeft className="w-4 h-4" /> Back to Payments
        </Link>
        <span className="badge badge-paid">
          {paymentResult.status}
        </span>
      </div>

      {/* Main Payment Info Card */}
      <div className="card p-6 md:p-8 space-y-6">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 pb-6 border-b border-[var(--color-steel-200)]">
          <div>
            <p className="text-xs text-[var(--color-ink-muted)]">Transaction ID</p>
            <h1 className="text-sm md:text-base font-mono font-semibold text-[var(--color-ink)] mt-1 break-all">
              {paymentResult.transactionId}
            </h1>
          </div>
          <div className="text-left md:text-right">
            <p className="text-xs text-[var(--color-ink-muted)]">Total Amount</p>
            <div className="text-2xl font-bold text-[var(--color-ink)] flex items-center md:justify-end gap-1 mt-0.5">
              <DollarSign className="w-6 h-6 text-emerald-500" /> ৳{paymentResult.amount?.toLocaleString()}
            </div>
          </div>
        </div>

        {/* Payment Metadata Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="bg-[var(--color-mist)] border border-[var(--color-steel-200)] p-4 rounded-xl space-y-1">
            <p className="text-xs text-[var(--color-ink-muted)]">Payment Method</p>
            <p className="text-sm font-semibold text-[var(--color-ink)]">{paymentResult.method}</p>
          </div>
          <div className="bg-[var(--color-mist)] border border-[var(--color-steel-200)] p-4 rounded-xl space-y-1">
            <p className="text-xs text-[var(--color-ink-muted)]">Provider</p>
            <p className="text-sm font-semibold text-[var(--color-ink)]">{paymentResult.provider}</p>
          </div>
          <div className="bg-[var(--color-mist)] border border-[var(--color-steel-200)] p-4 rounded-xl space-y-1">
            <p className="text-xs text-[var(--color-ink-muted)]">Created At</p>
            <p className="text-sm font-semibold text-[var(--color-ink)]">
              {new Date(paymentResult.createdAt).toLocaleString([], { dateStyle: "medium", timeStyle: "short" })}
            </p>
          </div>
        </div>
      </div>

      {/* Associated Booking & Service Details Section */}
      {booking.id && (
        <div className="card p-6 md:p-8 space-y-6">
          <h2 className="text-lg font-bold flex items-center gap-2">
            <Wrench className="w-5 h-5 text-[var(--color-signal)]" /> Associated Booking & Service Details
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
            {/* Service Details */}
            <div className="space-y-4 bg-[var(--color-mist)] p-5 rounded-xl border border-[var(--color-steel-200)]">
              <div className="space-y-1">
                <span className="text-[10px] uppercase tracking-wider font-semibold text-blue-600 dark:text-blue-400 bg-blue-500/10 px-2 py-0.5 rounded border border-blue-500/20">
                  Service Info
                </span>
                <h3 className="text-base font-bold text-[var(--color-ink)] pt-1">{service.title || "N/A"}</h3>
                <p className="text-xs text-[var(--color-ink-muted)]">{service.description || "No description provided."}</p>
              </div>
              <div className="flex items-center justify-between text-xs text-[var(--color-ink-muted)] pt-2 border-t border-[var(--color-steel-200)]">
                <span>Service Price:</span>
                <span className="font-bold text-[var(--color-ink)]">৳{service.price?.toLocaleString() || 0}</span>
              </div>
              <div className="flex items-center justify-between text-xs text-[var(--color-ink-muted)]">
                <span>Duration:</span>
                <span className="font-semibold text-[var(--color-ink)]">{service.duration ? `${service.duration} mins` : "N/A"}</span>
              </div>
            </div>

            {/* Booking Specifics */}
            <div className="space-y-3 bg-[var(--color-mist)] p-5 rounded-xl border border-[var(--color-steel-200)]">
              <span className="text-[10px] uppercase tracking-wider font-semibold text-purple-600 dark:text-purple-400 bg-purple-500/10 px-2 py-0.5 rounded border border-purple-500/20">
                Booking Details
              </span>
              
              <div className="space-y-2.5 pt-1 text-xs">
                <div className="flex items-center gap-2 text-[var(--color-ink-muted)]">
                  <Calendar className="w-4 h-4 text-[var(--color-steel)] flex-shrink-0" />
                  <span className="text-[var(--color-ink)]">{booking.scheduledAt ? new Date(booking.scheduledAt).toLocaleString([], { dateStyle: "medium", timeStyle: "short" }) : "N/A"}</span>
                </div>
                <div className="flex items-center gap-2 text-[var(--color-ink-muted)]">
                  <MapPin className="w-4 h-4 text-[var(--color-steel)] flex-shrink-0" />
                  <span className="text-[var(--color-ink)]">{booking.address || "No address provided"}</span>
                </div>
                {booking.notes && (
                  <div className="flex items-start gap-2 text-[var(--color-ink-muted)]">
                    <FileText className="w-4 h-4 text-[var(--color-steel)] flex-shrink-0 mt-0.5" />
                    <span className="italic text-[var(--color-ink)]">Notes: "{booking.notes}"</span>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}