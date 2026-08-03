'use server';

import { getAccessToken } from "@/utils/getAccessToken";

export async function getAdminBookings(params: {
  page?: string;
  limit?: string;
  status?: string;
  name?: string;
  date?: string;
}) {
  // console.log("1");
  const { page = '1', limit = '10', status, name, date } = params;
  // console.log("2");
  const baseUrl = process.env.BACKEND_API_URL || 'http://localhost:5000';
  // console.log("3");
  if (!process.env.BACKEND_API_URL) {
    // console.warn("⚠️ BACKEND_API_URL is missing in environment variables. Falling back to http://localhost:5000");
  }
// console.log("4");
  const url = new URL(`${baseUrl}/api/admin/bookings`);
  // console.log("5");
  url.searchParams.append('page', page);
  url.searchParams.append('limit', limit);
  if (status) url.searchParams.append('status', status);
  if (name) url.searchParams.append('name', name); 
  if (date) url.searchParams.append('date', date); 
// console.log("6");
  try {
    const token = await getAccessToken();
// console.log(url.toString());
    const res = await fetch(url.toString(), {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      cache: 'no-store',
    });
    // console.log("8");
    if (!res.ok) {
      // console.error(`Backend error: ${res.status} ${res.statusText}`);
      return { success: false, data: { data: [], meta: { page: 1, limit: 10, total: 0, totalPages: 0 } } };
    }
    // console.log("9");
    const result = await res.json();
    return result; 
  } catch (error) {
    // console.error('Error fetching admin bookings (Network/Fetch Failure):', error);
    return { success: false, data: { data: [], meta: { page: 1, limit: 10, total: 0, totalPages: 0 } } };
  }
}