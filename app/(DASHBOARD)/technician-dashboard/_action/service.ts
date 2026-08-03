"use server";

import { revalidatePath } from "next/cache";
import { cookies } from "next/dist/server/request/cookies";

const BASE_URL = process.env.BACKEND_API_URL;

// Fetch categories with search query and pagination
export async function getCategories(
  search: string = "",
  page: number = 1,
  limit: number = 10,
) {
  try {
    const response = await fetch(
      `${BASE_URL}/api/categories?name=${encodeURIComponent(search)}&page=${page}&limit=${limit}`,
      {
        method: "GET",
        headers: { "Content-Type": "application/json" },
        cache: "no-store",
      },
    );

    const result = await response.json();

    if (!response.ok || !result.success) {
      throw new Error(result.message || "Failed to fetch categories");
    }

    return { success: true, data: result.data };
  } catch (error: any) {
    return {
      success: false,
      message: error.message || "Something went wrong",
      data: { data: [], totalPages: 1 },
    };
  }
}

// Create a new service
export async function createService(serviceData: {
  categoryId: string;
  title: string;
  description: string;
  price: number;
  duration: number;
}) {
  const cookieStore = await cookies();
  const accessToken = cookieStore.get("accessToken")?.value || "";
  if (!accessToken) {
    return {
      success: false,
      message: "Access token not found. Please log in again.",
    };
  }
  try {
    const response = await fetch(`${BASE_URL}/api/services`, {
      // Adjust endpoint as per your backend route
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
      body: JSON.stringify(serviceData),
    });

    const result = await response.json();

    if (!response.ok || !result.success) {
      throw new Error(result.message || "Failed to create service");
    }

    revalidatePath("/dashboard/services");
    return {
      success: true,
      message: result.message || "Service created successfully",
    };
  } catch (error: any) {
    return { success: false, message: error.message || "Something went wrong" };
  }
}
