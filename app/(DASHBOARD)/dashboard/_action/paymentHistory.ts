"use server";

import { cookies } from "next/dist/server/request/cookies";

export async function getAllPayments() {
    const cookieStore = await cookies();
    const accessToken = cookieStore.get("accessToken")?.value;

    if (!accessToken) {
        return { success: false, message: "No access token found", data: [] };
    }
  try {
    const response = await fetch(`${process.env.BACKEND_API_URL}/api/payments`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `${accessToken}`,
      },
      cache: "no-store",
    });

    const result = await response.json();
    // console.log("Payment History Response:", result); // Log the response for debugging
    return result;
  } catch (error) {
    console.error("Error fetching payments:", error);
    return { success: false, message: "Failed to fetch payments", data: [] };
  }
}
export async function getPaymentById(id: string) {
    const cookieStore = await cookies();
    const accessToken = cookieStore.get("accessToken")?.value;

    if (!accessToken) {
        return { success: false, message: "No access token found", data: [] };
    }
  try {
    const response = await fetch(`${process.env.BACKEND_API_URL}/api/payments/${id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `${accessToken}`,
      },
      cache: "no-store",
    });

    const result = await response.json();
    return result;
  } catch (error) {
    console.error("Error fetching payments:", error);
    return { success: false, message: "Failed to fetch payments", data: [] };
  }
}