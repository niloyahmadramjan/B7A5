'use server';

import { getAccessToken } from '@/utils/getAccessToken';

const BASE_URL = process.env.BACKEND_API_URL;

// Get Categories (with pagination and search)
export async function getCategories(page: number = 1, limit: number = 10, searchTerm: string = '') {


  try {
    const res = await fetch(`${BASE_URL}/api/categories?page=${page}&limit=${limit}&searchTerm=${encodeURIComponent(searchTerm)}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${await getAccessToken()}`,
      },
      cache: 'no-store',
    });

    const result = await res.json();
    if (!res.ok || !result.success) {
      throw new Error(result.message || 'Failed to fetch categories');
    }

    return { success: true, data: result.data };
  } catch (error: any) {
    return { success: false, message: error.message, data: { data: [], total: 0, page: 1, limit: 10, totalPages: 1 } };
  }
}

// Create Category (POST)
export async function createCategory(formData: { name: string; description: string }) {
  
  try {
    const res = await fetch(`${BASE_URL}/api/categories`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${await getAccessToken()}`,
      },
      body: JSON.stringify(formData),
    });

    const result = await res.json();
    if (!res.ok || !result.success) {
      throw new Error(result.message || 'Failed to create category');
    }

    return { success: true, message: result.message || 'Category created successfully', data: result.data };
  } catch (error: any) {
    return { success: false, message: error.message };
  }
}

// Delete Category (DELETE)
export async function deleteCategory(id: string) {
 
  try {
    const res = await fetch(`${BASE_URL}/api/categories/${id}`, {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${await getAccessToken()}`,
      },
      next: { revalidate: 0 }, // Ensure the cache is not used for this request
    });

    const result = await res.json();
    if (!res.ok || !result.success) {
      throw new Error(result.message || 'Failed to delete category');
    }

    return { success: true, message: result.message || 'Category deleted successfully' };
  } catch (error: any) {
    return { success: false, message: error.message };
  }
}

export async function updateCategory(id: string, formData: { name: string; description: string }) {
  try {
    const res = await fetch(`${BASE_URL}/api/categories/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${await getAccessToken()}`,
      },
      body: JSON.stringify(formData),
    });

    const result = await res.json();
    if (!res.ok || !result.success) {
      throw new Error(result.message || 'Failed to update category');
    }

    return { success: true, message: result.message || 'Category updated successfully', data: result.data };
  } catch (error: any) {
    return { success: false, message: error.message };
  }
}   