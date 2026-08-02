import Link from "next/link";
import {
  CreditCard,
  ArrowUpRight,
  Wrench,
} from "lucide-react";
import { getAllPayments } from "../_action/paymentHistory";

const getPaymentStatusBadge = (status: string) => {
  const statusMap: Record<string, string> = {
    PAID: "badge-paid",
    SUCCESS: "badge-paid",
    PENDING: "badge-requested",
    FAILED: "badge-declined",
    CANCELLED: "badge-cancelled",
  };

  return (
    <span className={`badge ${statusMap[status] || "badge-completed"}`}>
      {status}
    </span>
  );
};

export default async function PaymentHistoryPage() {
  const response = await getAllPayments();
  const payments = response?.data.result || response || [];

  return (
    <div className="space-y-8 max-w-full">
      {/* Page Header */}
      <div className="card p-6 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold flex items-center gap-2">
            <CreditCard className="w-6 h-6 text-[var(--color-signal)]" /> Payment History
          </h1>
          <p className="text-sm text-[var(--color-ink-muted)] mt-1">
            View and track all transactions, earnings, and payment records.
          </p>
        </div>
        <div className="bg-[var(--color-mist)] border border-[var(--color-steel-200)] px-4 py-2 rounded-xl text-xs text-[var(--color-ink-muted)]">
          Total Transactions:{" "}
          <span className="font-bold text-[var(--color-ink)]">{payments.length || 0}</span>
        </div>
      </div>

      {/* Payments List / Table */}
      <div className="card overflow-hidden">
        {payments.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-[var(--color-steel-200)] bg-[var(--color-mist)] text-[var(--color-ink-muted)] text-xs uppercase tracking-wider">
                  <th className="p-4 font-semibold">Transaction ID</th>
                  <th className="p-4 font-semibold">Amount</th>
                  <th className="p-4 font-semibold">Status</th>
                  <th className="p-4 font-semibold">Date</th>
                  <th className="p-4 font-semibold text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[var(--color-steel-200)] text-sm">
                {payments.map((payment: any) => (
                  <tr
                    key={payment.id || payment._id}
                    className="hover:bg-[var(--color-mist)]/50 transition"
                  >
                    <td className="p-4 font-mono text-xs text-[var(--color-ink-muted)]">
                      #{payment.id ? payment.id.slice(0, 10) : "N/A"}...
                    </td>
                    <td className="p-4 font-bold text-[var(--color-ink)]">
                      ৳{payment.amount?.toLocaleString() || 0}
                    </td>
                    <td className="p-4">
                      {getPaymentStatusBadge(payment.status || "PAID")}
                    </td>
                    <td className="p-4 text-xs text-[var(--color-ink-muted)]">
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
                        className="btn-secondary inline-flex items-center gap-1 px-3 py-1.5 text-xs font-semibold rounded-lg transition"
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
          <div className="card p-12 text-center text-[var(--color-ink-muted)] space-y-2">
            <Wrench className="w-10 h-10 mx-auto text-[var(--color-steel)] animate-pulse" />
            <p className="text-base font-medium text-[var(--color-ink)]">
              No payment history found
            </p>
            <p className="text-xs text-[var(--color-ink-muted)]">
              Transactions will appear here once payments are processed.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}