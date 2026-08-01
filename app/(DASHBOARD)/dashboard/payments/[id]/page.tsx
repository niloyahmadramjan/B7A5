import Link from "next/link";
import { ArrowLeft, CheckCircle2, CreditCard, DollarSign, Calendar, MapPin, Wrench, User, FileText } from "lucide-react";
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
      <div className="flex flex-col items-center justify-center py-20 text-white space-y-4">
        <h2 className="text-xl font-bold">Payment Details Not Found</h2>
        <p className="text-gray-400 text-sm">Could not retrieve information for this payment transaction.</p>
        <Link
          href="/dashboard/payments"
          className="px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white text-xs font-semibold rounded-xl transition"
        >
          Back to Payments
        </Link>
      </div>
    );
  }

  const booking = paymentResult.booking || {};
  const service = booking.service || {};

  return (
    <div className="space-y-8 max-w-full text-white">
      {/* Top Bar with Back Button */}
      <div className="flex items-center justify-between">
        <Link
          href="/dashboard/payments"
          className="inline-flex items-center gap-2 text-sm text-gray-300 hover:text-white bg-slate-900 border border-slate-700 px-4 py-2 rounded-xl transition"
        >
          <ArrowLeft className="w-4 h-4" /> Back to Payments
        </Link>
        <span className="px-3 py-1 rounded-full text-xs font-semibold bg-green-500/20 text-green-300 border border-green-500/30">
          {paymentResult.status}
        </span>
      </div>

      {/* Main Payment Info Card */}
      <div className="bg-slate-900 border border-slate-700 rounded-2xl p-6 md:p-8 shadow-sm space-y-6">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 pb-6 border-b border-slate-800">
          <div>
            <p className="text-xs text-gray-400">Transaction ID</p>
            <h1 className="text-sm md:text-base font-mono font-semibold text-white mt-1 break-all">
              {paymentResult.transactionId}
            </h1>
          </div>
          <div className="text-left md:text-right">
            <p className="text-xs text-gray-400">Total Amount</p>
            <div className="text-2xl font-bold text-green-400 flex items-center md:justify-end gap-1 mt-0.5">
              <DollarSign className="w-6 h-6" /> {paymentResult.amount}
            </div>
          </div>
        </div>

        {/* Payment Metadata Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="bg-slate-800/50 border border-slate-700/60 p-4 rounded-xl space-y-1">
            <p className="text-xs text-gray-400">Payment Method</p>
            <p className="text-sm font-semibold text-white">{paymentResult.method}</p>
          </div>
          <div className="bg-slate-800/50 border border-slate-700/60 p-4 rounded-xl space-y-1">
            <p className="text-xs text-gray-400">Provider</p>
            <p className="text-sm font-semibold text-white">{paymentResult.provider}</p>
          </div>
          <div className="bg-slate-800/50 border border-slate-700/60 p-4 rounded-xl space-y-1">
            <p className="text-xs text-gray-400">Created At</p>
            <p className="text-sm font-semibold text-white">
              {new Date(paymentResult.createdAt).toLocaleString([], { dateStyle: "medium", timeStyle: "short" })}
            </p>
          </div>
        </div>
      </div>

      {/* Associated Booking & Service Details Section */}
      {booking.id && (
        <div className="bg-slate-900 border border-slate-700 rounded-2xl p-6 md:p-8 shadow-sm space-y-6">
          <h2 className="text-lg font-bold text-white flex items-center gap-2">
            <Wrench className="w-5 h-5 text-blue-400" /> Associated Booking & Service Details
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
            {/* Service Details */}
            <div className="space-y-4 bg-slate-800/40 p-5 rounded-xl border border-slate-700/50">
              <div className="space-y-1">
                <span className="text-[10px] uppercase tracking-wider font-semibold text-blue-400 bg-blue-500/10 px-2 py-0.5 rounded border border-blue-500/20">
                  Service Info
                </span>
                <h3 className="text-base font-bold text-white pt-1">{service.title || "N/A"}</h3>
                <p className="text-xs text-gray-300">{service.description || "No description provided."}</p>
              </div>
              <div className="flex items-center justify-between text-xs text-gray-300 pt-2 border-t border-slate-700/60">
                <span>Service Price:</span>
                <span className="font-bold text-white">${service.price || 0}</span>
              </div>
              <div className="flex items-center justify-between text-xs text-gray-300">
                <span>Duration:</span>
                <span className="font-semibold text-white">{service.duration ? `${service.duration} mins` : "N/A"}</span>
              </div>
            </div>

            {/* Booking Specifics */}
            <div className="space-y-3 bg-slate-800/40 p-5 rounded-xl border border-slate-700/50">
              <span className="text-[10px] uppercase tracking-wider font-semibold text-purple-400 bg-purple-500/10 px-2 py-0.5 rounded border border-purple-500/20">
                Booking Details
              </span>
              
              <div className="space-y-2.5 pt-1 text-xs">
                <div className="flex items-center gap-2 text-gray-300">
                  <Calendar className="w-4 h-4 text-gray-400 flex-shrink-0" />
                  <span>{booking.scheduledAt ? new Date(booking.scheduledAt).toLocaleString([], { dateStyle: "medium", timeStyle: "short" }) : "N/A"}</span>
                </div>
                <div className="flex items-center gap-2 text-gray-300">
                  <MapPin className="w-4 h-4 text-gray-400 flex-shrink-0" />
                  <span>{booking.address || "No address provided"}</span>
                </div>
                {booking.notes && (
                  <div className="flex items-start gap-2 text-gray-300">
                    <FileText className="w-4 h-4 text-gray-400 flex-shrink-0 mt-0.5" />
                    <span className="italic">Notes: "{booking.notes}"</span>
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