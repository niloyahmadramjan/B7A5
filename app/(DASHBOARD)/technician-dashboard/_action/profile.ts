'use server';

import { getAccessToken } from '@/utils/getAccessToken';
import { revalidatePath } from 'next/cache';
import { cookies } from 'next/dist/server/request/cookies';

const BASE_URL = process.env.BACKEND_API_URL;

// Fetch profile data
export async function getMyProfile() {

  try {
    const response = await fetch(`${BASE_URL}/api/technician/my-profile`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${await getAccessToken()}`
      },
      cache: 'no-store',
    });

    const result = await response.json();

    if (!response.ok || !result.success) {
      throw new Error(result.message || 'Failed to fetch profile');
    }

    return { success: true, data: result.data };
  } catch (error: any) {
    return { success: false, message: error.message || 'Something went wrong' };
  }
}

// Update profile data via PUT request
export async function updateTechnicianProfile(formData: {
  name: string;
  bio: string;
  experience: number;
  location: string;
}) {

  try {
    const response = await fetch(`${BASE_URL}/api/technician/profile`, { // Adjust endpoint if different
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${await getAccessToken()}`
      },
      body: JSON.stringify(formData),
    });

    const result = await response.json();

    if (!response.ok || !result.success) {
      throw new Error(result.message || 'Failed to update profile');
    }

    revalidatePath('/dashboard/profile');
    return { success: true, message: result.message || 'Profile updated successfully' };
  } catch (error: any) {
    return { success: false, message: error.message || 'Something went wrong' };
  }
}