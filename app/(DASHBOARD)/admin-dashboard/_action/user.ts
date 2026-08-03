'use server';

import { getAccessToken } from "@/utils/getAccessToken";
import { revalidatePath } from "next/cache";

export async function getAdminUsers(params: {
  page?: string;
  limit?: string;
  name?: string;
  email?: string;
  status?: string;
  role?: string;
}) {
  const { page = '1', limit = '10', name, email, status, role } = params;
  
  const baseUrl = process.env.BACKEND_API_URL || 'http://localhost:5000';
  const url = new URL(`${baseUrl}/api/admin/users`);
  
  url.searchParams.append('page', page);
  url.searchParams.append('limit', limit);
  if (name) url.searchParams.append('name', name);
  if (email) url.searchParams.append('email', email);
  if (status) url.searchParams.append('status', status);
  if (role) url.searchParams.append('role', role);

  try {
    const res = await fetch(url.toString(), {
      headers: {
        'Authorization': `Bearer ${await getAccessToken()}`,
        'Content-Type': 'application/json',
      },
      cache: 'no-store',
    });
    
    if (!res.ok) {
      return { success: false, data: { data: [], meta: { page: 1, limit: 10, total: 0, totalPages: 0 } } };
    }
    
    const result = await res.json();
    return result; 
  } catch (error) {
    console.error('Error fetching admin users:', error);
    return { success: false, data: { data: [], meta: { page: 1, limit: 10, total: 0, totalPages: 0 } } };
  }
}

export async function updateUserStatus(userId: string, newStatus: 'ACTIVE' | 'BANNED') {
  const baseUrl = process.env.BACKEND_API_URL || 'http://localhost:5000';
  const url = `${baseUrl}/api/admin/users/${userId}`;

  try {
   
    const res = await fetch(url, {
      method: 'PUT',
      headers: {
        'Authorization': `Bearer ${await getAccessToken()}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ status: newStatus }),
    });

    if (!res.ok) {
      return { success: false, message: 'Failed to update user status' };
    }

    revalidatePath('/admin-dashboard/users');
    return { success: true, message: 'User status updated successfully' };
  } catch (error) {
    console.error('Error updating user status:', error);
    return { success: false, message: 'An unexpected error occurred' };
  }
}