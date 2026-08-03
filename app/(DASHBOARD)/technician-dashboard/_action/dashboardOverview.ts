'use server';

import { getAccessToken } from "@/utils/getAccessToken";

const BASE_URL = process.env.BACKEND_API_URL;

export async function getDashboardOverview() {

  try {
    const response = await fetch(`${BASE_URL}/api/technician/dashboard-overview`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${await getAccessToken()}`
      },
      cache: 'no-store',
    });

    const result = await response.json();

    if (!response.ok || !result.success) {
      throw new Error(result.message || 'Failed to fetch dashboard overview');
    }

    return { success: true, data: result.data };
  } catch (error: any) {
    return { success: false, message: error.message || 'Something went wrong', data: null };
  }
}