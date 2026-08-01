import Link from "next/link";
import {
  DollarSign,
  Calendar,
  CreditCard,
  CheckCircle2,
  Clock,
  XCircle,
  ArrowUpRight,
} from "lucide-react";
import { getAllPayments } from "../_action/paymentHistory";

const getPaymentStatusBadge = (status: string) => {
  const styles: Record<string, string> = {
    PAID: "bg-green-500/20 text-green-300 border-green-500/30",
    SUCCESS: "bg-green-500/20 text-green-300 border-green-500/30",
    PENDING: "bg-amber-500/20 text-amber-300 border-amber-500/30",
    FAILED: "bg-red-500/20 text-red-300 border-red-500/30",
    CANCELLED: "bg-red-900/50 text-red-200 border-red-800",
  };
  return (
    <span
      className={`px-2.5 py-1 rounded-full text-xs font-semibold border ${styles[status] || "bg-gray-800 text-gray-200"}`}
    >
      {status}
    </span>
  );
};

export default async function PaymentHistoryPage() {
  const response = await getAllPayments();
  const payments = response?.data.result || response || [];

  return (
    <div className="space-y-8 max-w-full text-white">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-slate-900 border border-slate-700 rounded-2xl p-6 shadow-sm">
        <div>
          <h1 className="text-2xl font-bold text-white flex items-center gap-2">
            <CreditCard className="w-6 h-6 text-blue-400" /> Payment History
          </h1>
          <p className="text-sm text-gray-300 mt-1">
            View and track all transactions, earnings, and payment records.
          </p>
        </div>
        <div className="bg-slate-800 border border-slate-700 px-4 py-2 rounded-xl text-xs text-gray-300">
          Total Transactions:{" "}
          <span className="font-bold text-white">{payments.length || 0}</span>
        </div>
      </div>

      {/* Payments List / Table */}
      <div className="bg-slate-900 border border-slate-700 rounded-xl overflow-hidden shadow-sm">
        {payments.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-slate-800 bg-slate-800/50 text-gray-300 text-xs uppercase tracking-wider">
                  <th className="p-4 font-semibold">Transaction ID</th>
                  <th className="p-4 font-semibold">Amount</th>
                  <th className="p-4 font-semibold">Status</th>
                  <th className="p-4 font-semibold">Date</th>
                  <th className="p-4 font-semibold text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800 text-sm">
                {payments.map((payment: any) => (
                  <tr
                    key={payment.id || payment._id}
                    className="hover:bg-slate-800/40 transition"
                  >
                    <td className="p-4 font-mono text-xs text-gray-300">
                      #{payment.id ? payment.id.slice(0, 10) : "N/A"}...
                    </td>
                    <td className="p-4 font-bold text-white flex items-center gap-1">
                      <DollarSign className="w-4 h-4 text-green-400" />
                      {payment.amount || 0}
                    </td>
                    <td className="p-4">
                      {getPaymentStatusBadge(payment.status || "PAID")}
                    </td>
                    <td className="p-4 text-xs text-gray-300">
                      {payment.createdAt
                        ? new Date(payment.createdAt).toLocaleString([], {
                            dateStyle: "medium",
                            timeStyle: "short",
                          })
                        : "N/A"}
                    </td>
                    <td className="p-4 text-right">
                      <Link
                        href={`/dashboard/payments/${payment.id || ""}`}
                        className="inline-flex items-center gap-1 px-3 py-1.5 bg-slate-800 border border-slate-700 hover:bg-slate-700 text-white text-xs font-semibold rounded-lg transition"
                      >
                        Details <ArrowUpRight className="w-3.5 h-3.5" />
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="p-12 text-center text-gray-400 space-y-2">
            <CreditCard className="w-10 h-10 mx-auto text-gray-600 animate-pulse" />
            <p className="text-base font-medium text-white">
              No payment history found
            </p>
            <p className="text-xs text-gray-400">
              Transactions will appear here once payments are processed.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
