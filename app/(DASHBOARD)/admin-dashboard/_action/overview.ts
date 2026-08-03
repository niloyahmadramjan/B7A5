'use server';

import { getAccessToken } from "@/utils/getAccessToken";

export async function getAdminOverview() {
  const baseUrl = process.env.BACKEND_API_URL || 'http://localhost:5000';
  const url = `${baseUrl}/api/admin/overview`;

  try {
    const token = await getAccessToken();
    const res = await fetch(url, {
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      cache: 'no-store', // Always fetch fresh dashboard data
    });

    if (!res.ok) {
      return { success: false, data: null };
    }

    const result = await res.json();
    return result;
  } catch (error) {
    console.error('Error fetching admin overview:', error);
    return { success: false, data: null };
  }
}