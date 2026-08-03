'use client';

import React, { useState } from 'react';
import { toast } from 'sonner';
import { Loader2, Eye, X } from 'lucide-react';
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

export default function BookingTable({ initialBookings }: { initialBookings: Booking[] }) {
  const [loadingId, setLoadingId] = useState<string | null>(null);
  
  // State for View Details Modal
  const [selectedBooking, setSelectedBooking] = useState<Booking | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleStatusChange = async (bookingId: string, newAction: string) => {
    setLoadingId(bookingId);
    const toastId = toast.loading('Updating booking status...');

    const res = await updateBookingStatus(bookingId, newAction);

    if (res.success) {
      toast.success(res.message, { id: toastId });
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
            {initialBookings.map((booking) => {
              const isLoading = loadingId === booking.id;
              const isPaid = booking.payment?.status === 'COMPLETED';

              return (
                <tr key={booking.id} className="hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors">
                  <td className="p-4 font-medium text-gray-900 dark:text-gray-100">
                    {booking.customer.name}
                    <div className="text-xs text-gray-500 dark:text-gray-500">{booking.customer.phone}</div>
                  </td>
                  <td className="p-4">
                    {booking.service.title}
                    <div className="text-xs text-gray-500 dark:text-gray-500">${booking.service.price}</div>
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
                    {/* VIEW DETAILS BUTTON */}
                    <button
                      onClick={() => openDetailsModal(booking)}
                      className="px-3 py-1 bg-gray-100 text-gray-700 rounded text-xs hover:bg-gray-200 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700 transition-colors inline-flex items-center"
                      title="View Details"
                    >
                      <Eye className="w-3 h-3 mr-1" /> View
                    </button>

                    {/* SERIAL FLOW ACTION BUTTONS */}
                    {booking.status === 'REQUESTED' && (
                      <>
                        <button
                          disabled={isLoading}
                          onClick={() => handleStatusChange(booking.id, 'ACCEPTED')}
                          className="px-3 py-1 bg-blue-600 text-white rounded text-xs hover:bg-blue-700 disabled:opacity-50 dark:bg-blue-600 dark:hover:bg-blue-500 transition-colors"
                        >
                          {isLoading && <Loader2 className="inline w-3 h-3 mr-1 animate-spin" />} Accept
                        </button>
                        <button
                          disabled={isLoading}
                          onClick={() => handleStatusChange(booking.id, 'DECLINED')}
                          className="px-3 py-1 bg-red-600 text-white rounded text-xs hover:bg-red-700 disabled:opacity-50 dark:bg-red-600 dark:hover:bg-red-500 transition-colors"
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
                        className="px-3 py-1 bg-amber-600 text-white rounded text-xs hover:bg-amber-700 disabled:opacity-40 dark:bg-amber-600 dark:hover:bg-amber-500 transition-colors"
                      >
                        {isLoading && <Loader2 className="inline w-3 h-3 mr-1 animate-spin" />} Start
                      </button>
                    )}

                    {booking.status === 'IN_PROGRESS' && (
                      <button
                        disabled={isLoading}
                        onClick={() => handleStatusChange(booking.id, 'COMPLETED')}
                        className="px-3 py-1 bg-emerald-600 text-white rounded text-xs hover:bg-emerald-700 disabled:opacity-50 dark:bg-emerald-600 dark:hover:bg-emerald-500 transition-colors"
                      >
                        {isLoading && <Loader2 className="inline w-3 h-3 mr-1 animate-spin" />} Complete
                      </button>
                    )}

                    {['REQUESTED', 'ACCEPTED', 'PAID'].includes(booking.status) && (
                      <button
                        disabled={isLoading}
                        onClick={() => handleStatusChange(booking.id, 'CANCELLED')}
                        className="px-3 py-1 bg-gray-200 text-gray-700 rounded text-xs hover:bg-gray-300 disabled:opacity-50 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700 transition-colors"
                      >
                        Cancel
                      </button>
                    )}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* BOOKING DETAILS MODAL */}
      {isModalOpen && selectedBooking && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4 animate-in fade-in duration-200">
          <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-xl shadow-xl w-full max-w-lg overflow-hidden transition-colors">
            
            {/* Modal Header */}
            <div className="flex items-center justify-between px-6 py-4 border-b border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-800/50">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
                Booking Information
              </h3>
              <button 
                onClick={closeModal}
                className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 transition-colors p-1"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Body */}
            <div className="px-6 py-5 space-y-4 max-h-[80vh] overflow-y-auto text-sm">
              
              {/* Status & Payment Row */}
              <div className="grid grid-cols-2 gap-4 pb-3 border-b border-gray-100 dark:border-gray-800">
                <div>
                  <span className="block text-xs text-gray-500 dark:text-gray-400">Current Status</span>
                  <span className="inline-block mt-1 px-2.5 py-1 text-xs font-bold rounded bg-blue-50 text-blue-700 dark:bg-blue-500/10 dark:text-blue-400">
                    {selectedBooking.status}
                  </span>
                </div>
                <div>
                  <span className="block text-xs text-gray-500 dark:text-gray-400">Payment Status</span>
                  <span className={`inline-block mt-1 px-2.5 py-1 text-xs font-semibold rounded-full ${
                    selectedBooking.payment?.status === 'COMPLETED' 
                      ? 'bg-green-100 text-green-700 dark:bg-green-500/10 dark:text-green-400' 
                      : 'bg-yellow-100 text-yellow-700 dark:bg-yellow-500/10 dark:text-yellow-400'
                  }`}>
                    {selectedBooking.payment?.status || 'UNPAID'}
                  </span>
                </div>
              </div>

              {/* Customer Details */}
              <div>
                <h4 className="text-xs font-semibold uppercase tracking-wider text-gray-400 dark:text-gray-500 mb-2">Customer Details</h4>
                <div className="bg-gray-50 dark:bg-gray-800/40 p-3 rounded-lg space-y-1 text-gray-700 dark:text-gray-300">
                  <p><strong className="text-gray-900 dark:text-gray-100">Name:</strong> {selectedBooking.customer.name}</p>
                  <p><strong className="text-gray-900 dark:text-gray-100">Email:</strong> {selectedBooking.customer.email}</p>
                  <p><strong className="text-gray-900 dark:text-gray-100">Phone:</strong> {selectedBooking.customer.phone}</p>
                </div>
              </div>

              {/* Service & Schedule Info */}
              <div>
                <h4 className="text-xs font-semibold uppercase tracking-wider text-gray-400 dark:text-gray-500 mb-2">Service & Schedule</h4>
                <div className="bg-gray-50 dark:bg-gray-800/40 p-3 rounded-lg space-y-1 text-gray-700 dark:text-gray-300">
                  <p><strong className="text-gray-900 dark:text-gray-100">Service:</strong> {selectedBooking.service.title} (${selectedBooking.service.price})</p>
                  <p><strong className="text-gray-900 dark:text-gray-100">Scheduled At:</strong> {new Date(selectedBooking.scheduledAt).toLocaleString()}</p>
                  <p><strong className="text-gray-900 dark:text-gray-100">Address:</strong> {selectedBooking.address}</p>
                </div>
              </div>

              {/* Additional Notes */}
              {selectedBooking.notes && (
                <div>
                  <h4 className="text-xs font-semibold uppercase tracking-wider text-gray-400 dark:text-gray-500 mb-2">Notes</h4>
                  <div className="bg-gray-50 dark:bg-gray-800/40 p-3 rounded-lg text-gray-700 dark:text-gray-300 italic">
                    "{selectedBooking.notes}"
                  </div>
                </div>
              )}

            </div>

            {/* Modal Footer */}
            <div className="px-6 py-3 border-t border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-800/50 flex justify-end">
              <button
                onClick={closeModal}
                className="px-4 py-2 bg-gray-200 text-gray-800 hover:bg-gray-300 dark:bg-gray-800 dark:text-gray-200 dark:hover:bg-gray-700 rounded-lg text-xs font-medium transition-colors"
              >
                Close
              </button>
            </div>

          </div>
        </div>
      )}
    </>
  );
}