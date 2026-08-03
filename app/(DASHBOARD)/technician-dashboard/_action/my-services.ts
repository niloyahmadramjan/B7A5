'use server';

import { getAccessToken } from '@/utils/getAccessToken';
import { revalidatePath } from 'next/cache';
import { cookies } from 'next/dist/server/request/cookies';

const BASE_URL = process.env.BACKEND_API_URL;



// 1. Get My Services
export async function getMyServices() {
  
  try {
    const response = await fetch(`${BASE_URL}/api/services/my-services`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${await getAccessToken()}`
      },
      cache: 'no-store',
    });

    const result = await response.json();

    if (!response.ok || !result.success) {
      throw new Error(result.message || 'Failed to fetch services');
    }

    return { success: true, data: result.data };
  } catch (error: any) {
    return { success: false, message: error.message || 'Something went wrong', data: [] };
  }
}

// 2. Update Service (PUT)
export async function updateServiceAction(serviceId: string, serviceData: {
  title: string;
  description: string;
  price: number;
  duration: number;
}) {
  try {
    const response = await fetch(`${BASE_URL}/api/services/my-services/${serviceId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${await getAccessToken()}`
      },
      body: JSON.stringify(serviceData),
    });

    const result = await response.json();

    if (!response.ok || !result.success) {
      throw new Error(result.message || 'Failed to update service');
    }

    revalidatePath('/dashboard/my-services');
    return { success: true, message: result.message || 'Service updated successfully' };
  } catch (error: any) {
    return { success: false, message: error.message || 'Something went wrong' };
  }
}

// 3. Delete Service (DELETE)
export async function deleteServiceAction(serviceId: string) {
  try {
    const response = await fetch(`${BASE_URL}/api/services/my-services/${serviceId}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${await getAccessToken()}`
      },
    });

    const result = await response.json();

    if (!response.ok || !result.success) {
      throw new Error(result.message || 'Failed to delete service');
    }

    revalidatePath('/dashboard/my-services');
    return { success: true, message: result.message || 'Service deleted successfully' };
  } catch (error: any) {
    return { success: false, message: error.message || 'Something went wrong' };
  }
}