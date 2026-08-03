'use server';

import { revalidatePath } from 'next/cache';
import { cookies } from 'next/dist/server/request/cookies';

const BASE_URL = process.env.BACKEND_API_URL;

export async function updateBookingStatus(bookingId: string, action: string) {
  try {
    const cookieStore = await cookies();
    const accessToken = cookieStore.get('accessToken')?.value || '';

    if (!accessToken) {
      return { success: false, message: 'You are not logged in' };
    }
    const response = await fetch(`${BASE_URL}/api/technician/bookings/${bookingId}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${accessToken}`, 
      },
      body: JSON.stringify({ action }),
    });

    const result = await response.json();

    if (!response.ok || !result.success) {
      throw new Error(result.message || 'Failed to update booking status');
    }

    revalidatePath('/technician-dashboard/bookings'); // Update with your actual route path
    return { success: true, message: result.message, data: result.data };
  } catch (error: any) {
    return { success: false, message: error.message || 'Something went wrong' };
  }
}

export async function getBookings(page: number = 1, limit: number = 10) {
  const cookieStore = await cookies();
  const accessToken = cookieStore.get('accessToken')?.value || '';

  if (!accessToken) {
    return { success: false, message: 'You are not logged in', data: [], meta: null };
  }

  try {
    const res = await fetch(`${BASE_URL}/api/technician/bookings?page=${page}&limit=${limit}`, {
      cache: 'no-store', 
      headers: {
        'Authorization': `Bearer ${accessToken}`,
      },
    });

    if (!res.ok) {
      throw new Error('Failed to fetch bookings');
    }

    const result = await res.json();
    return {
      success: true,
      data: result.data,
      meta: result.meta,
    };
  } catch (error: any) {
    return { success: false, message: error.message, data: [], meta: null };
  }
}