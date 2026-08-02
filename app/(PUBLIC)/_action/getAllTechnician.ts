"use server";

const BASE_URL = process.env.BACKEND_API_URL;

export async function getAllTechnicians() {
  try {
    const response = await fetch(`${BASE_URL}/api/technician`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      cache: "no-store",
    });

    const result = await response.json();
    return result;
  } catch (error) {
    console.error("Error fetching technicians:", error);
    return { success: false, message: "Failed to fetch technicians", data: { data: [], meta: {} } };
  }
}