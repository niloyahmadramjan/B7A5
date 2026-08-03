"use server";

import { cookies } from "next/headers";
import { revalidatePath } from "next/cache";

interface Slot {
  dayOfWeek: number;
  startTime: string;
  endTime: string;
}

export async function updateAvailability(slots: Slot[]) {
  try {
    const cookieStore = await cookies();
    const accessToken = cookieStore.get("accessToken")?.value || "";
    
    if (!accessToken) {
      return { success: false, message: "You are not logged in" };
    }

    const response = await fetch(
      `${process.env.BACKEND_API_URL}/api/technician/availability`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `${accessToken}`,
        },
        body: JSON.stringify({ slots }),
      },
    );

    const result = await response.json();

    if (!response.ok) {
      return {
        success: false,
        message: result.message || "Failed to update availability",
      };
    }

    revalidatePath("/technician-dashboard/availability");
    return { success: true, message: "Availability updated successfully!" };
  } catch (error: any) {
    return { success: false, message: error.message || "Something went wrong" };
  }
}