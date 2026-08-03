'use client';

import React, { useState } from 'react';
import { toast } from 'sonner';
import { Loader2, Eye, X, ChevronLeft, ChevronRight } from 'lucide-react';
import { useRouter, useSearchParams } from 'next/navigation';
import { updateBookingStatus } from '../_action/booking';


interface Booking {
  id: string;
  status: string;
  scheduledAt: string;
  address: string;
  notes: string;
  customer: {
    name: string;
    email: string;
    phone: string;
  };
  service: {
    title: string;
    price: number;
  };
  payment: {
    status: string;
  } | null;
}

export default function BookingTable({ 
  initialBookings, 
  meta 
}: { 
  initialBookings: Booking[]; 
  meta?: { page: number; limit: number; total: number; totalPage: number } 
}) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [loadingId, setLoadingId] = useState<string | null>(null);
  const [isNavigating, setIsNavigating] = useState(false);
  
  // State for View Details Modal
  const [selectedBooking, setSelectedBooking] = useState<Booking | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const currentPage = meta?.page || 1;
  const totalPages = meta?.totalPage || 1;

  const handlePageChange = (newPage: number) => {
    if (newPage < 1 || newPage > totalPages) return;
    setIsNavigating(true);
    const params = new URLSearchParams(searchParams.toString());
    params.set('page', newPage.toString());
    router.push(`?${params.toString()}`);
    setIsNavigating(false);
  };

  const handleStatusChange = async (bookingId: string, newAction: string) => {
    setLoadingId(bookingId);
    const toastId = toast.loading('Updating booking status...');

    const res = await updateBookingStatus(bookingId, newAction);

    if (res.success) {
      toast.success(res.message, { id: toastId });
      router.refresh(); // Refresh data smoothly
    } else {
      toast.error(res.message, { id: toastId });
    }
    setLoadingId(null);
  };

  const openDetailsModal = (booking: Booking) => {
    setSelectedBooking(booking);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setSelectedBooking(null);
    setIsModalOpen(false);
  };

  return (
    <>
      <div className="overflow-x-auto rounded-lg border bg-primary-50 dark:bg-gray-900 border-gray-200 dark:border-gray-800 transition-colors">
        <table className="w-full text-left border-collapse text-sm">
          <thead className="bg-primary-100 dark:bg-gray-800/80 text-gray-700 dark:text-gray-300 uppercase tracking-wider text-xs transition-colors">
            <tr>
              <th className="p-4">Customer</th>
              <th className="p-4">Service</th>
              <th className="p-4">Scheduled At</th>
              <th className="p-4">Payment</th>
              <th className="p-4">Status</th>
              <th className="p-4 text-center">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200 dark:divide-gray-800 text-gray-600 dark:text-gray-400">
            {initialBookings.length === 0 ? (
              <tr>
                <td colSpan={6} className="p-8 text-center text-gray-400 text-xs">
                  No bookings found.
                </td>
              </tr>
            ) : (
              initialBookings.map((booking) => {
                const isLoading = loadingId === booking.id;
                const isPaid = booking.payment?.status === 'COMPLETED';

                return (
                  <tr key={booking.id} className="hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors">
                    <td className="p-4 font-medium text-gray-900 dark:text-gray-100">
                      {booking.customer.name}
                      <div className="text-xs text-gray-500">{booking.customer.phone}</div>
                    </td>
                    <td className="p-4">
                      {booking.service.title}
                      <div className="text-xs text-gray-500">${booking.service.price}</div>
                    </td>
                    <td className="p-4 text-gray-700 dark:text-gray-300">
                      {new Date(booking.scheduledAt).toLocaleString()}
                    </td>
                    <td className="p-4">
                      <span className={`px-2 py-1 text-xs font-semibold rounded-full ${
                        isPaid 
                          ? 'bg-green-100 text-green-700 dark:bg-green-500/10 dark:text-green-400' 
                          : 'bg-yellow-100 text-yellow-700 dark:bg-yellow-500/10 dark:text-yellow-400'
                      }`}>
                        {booking.payment?.status || 'UNPAID'}
                      </span>
                    </td>
                    <td className="p-4">
                      <span className="px-2.5 py-1 text-xs font-bold rounded bg-blue-50 text-blue-700 dark:bg-blue-500/10 dark:text-blue-400">
                        {booking.status}
                      </span>
                    </td>
                    <td className="p-4 text-center space-x-2">
                      <button
                        onClick={() => openDetailsModal(booking)}
                        className="px-3 py-1 bg-gray-100 text-gray-700 rounded text-xs hover:bg-gray-200 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700 transition-colors inline-flex items-center"
                        title="View Details"
                      >
                        <Eye className="w-3 h-3 mr-1" /> View
                      </button>

                      {booking.status === 'REQUESTED' && (
                        <>
                          <button
                            disabled={isLoading}
                            onClick={() => handleStatusChange(booking.id, 'ACCEPTED')}
                            className="px-3 py-1 bg-blue-600 text-white rounded text-xs hover:bg-blue-700 disabled:opacity-50 transition-colors"
                          >
                            {isLoading && <Loader2 className="inline w-3 h-3 mr-1 animate-spin" />} Accept
                          </button>
                          <button
                            disabled={isLoading}
                            onClick={() => handleStatusChange(booking.id, 'DECLINED')}
                            className="px-3 py-1 bg-red-600 text-white rounded text-xs hover:bg-red-700 disabled:opacity-50 transition-colors"
                          >
                            Decline
                          </button>
                        </>
                      )}

                      {(booking.status === 'ACCEPTED' || booking.status === 'PAID') && (
                        <button
                          disabled={isLoading || !isPaid}
                          onClick={() => handleStatusChange(booking.id, 'IN_PROGRESS')}
                          title={!isPaid ? "Payment required before progressing" : ""}
                          className="px-3 py-1 bg-amber-600 text-white rounded text-xs hover:bg-amber-700 disabled:opacity-40 transition-colors"
                        >
                          {isLoading && <Loader2 className="inline w-3 h-3 mr-1 animate-spin" />} Start
                        </button>
                      )}

                      {booking.status === 'IN_PROGRESS' && (
                        <button
                          disabled={isLoading}
                          onClick={() => handleStatusChange(booking.id, 'COMPLETED')}
                          className="px-3 py-1 bg-emerald-600 text-white rounded text-xs hover:bg-emerald-700 disabled:opacity-50 transition-colors"
                        >
                          {isLoading && <Loader2 className="inline w-3 h-3 mr-1 animate-spin" />} Complete
                        </button>
                      )}

                      {['REQUESTED', 'ACCEPTED', 'PAID'].includes(booking.status) && (
                        <button
                          disabled={isLoading}
                          onClick={() => handleStatusChange(booking.id, 'CANCELLED')}
                          className="px-3 py-1 bg-gray-200 text-gray-700 rounded text-xs hover:bg-gray-300 disabled:opacity-50 dark:bg-gray-800 dark:text-gray-300 transition-colors"
                        >
                          Cancel
                        </button>
                      )}
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>

        {/* PAGINATION FOOTER CONTROLS */}
        {meta && totalPages > 1 && (
          <div className="flex items-center justify-between p-4 border-t border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 text-xs">
            <span className="text-gray-500 dark:text-gray-400">
              Showing page <strong className="text-gray-900 dark:text-gray-100">{currentPage}</strong> of <strong className="text-gray-900 dark:text-gray-100">{totalPages}</strong> (Total {meta.total} bookings)
            </span>
            <div className="flex items-center gap-2">
              <button
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 1 || isNavigating}
                className="px-3 py-1.5 rounded-lg border border-gray-300 dark:border-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 disabled:opacity-40 transition-colors flex items-center gap-1"
              >
                <ChevronLeft className="w-3.5 h-3.5" /> Previous
              </button>
              <button
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={currentPage === totalPages || isNavigating}
                className="px-3 py-1.5 rounded-lg border border-gray-300 dark:border-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 disabled:opacity-40 transition-colors flex items-center gap-1"
              >
                Next <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Keep your existing Modal code here ... */}
    </>
  );
}