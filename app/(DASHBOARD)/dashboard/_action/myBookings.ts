"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { Booking } from "@/types/booking";

const API_BASE_URL = process.env.BACKEND_API_URL;

const getToken = async () => {
  const cookieStore = await cookies();
  return cookieStore.get("accessToken")?.value;
};

// Fetch all bookings for the table
export async function getMyBookings(): Promise<Booking[]> {
  const accessToken = await getToken();

  const res = await fetch(`${API_BASE_URL}/api/bookings`, {
    headers: {
      Authorization: `${accessToken}`,
    },
    cache: "no-store",
  });

  if (!res.ok) return [];

  const json = await res.json();
  return json.data || [];
}

// Fetch a single booking by ID for the details page
export async function getBookingById(id: string): Promise<Booking | null> {
  const accessToken = await getToken();
  
  const res = await fetch(`${API_BASE_URL}/api/bookings/${id}`, {
    headers: { Authorization: `${accessToken}` },
    cache: "no-store",
  });

  if (!res.ok) return null;

  const json = await res.json();
  return json.data || null;
}

// ---------------- NEW ACTIONS ---------------- //

// Cancel Booking
export async function cancelBookingAction(bookingId: string) {
  const accessToken = await getToken();
  const res = await fetch(`${API_BASE_URL}/api/bookings/cancel/${bookingId}`, {
    method: "PATCH", 
    headers: { Authorization: `${accessToken}` },
  });

  if (res.ok) {
    revalidatePath("/dashboard/bookings");
    revalidatePath(`/dashboard/bookings/${bookingId}`);
  }
}

// Initiate Payment
export async function payBookingAction(bookingId: string) {
  const accessToken = await getToken();
  const res = await fetch(`${API_BASE_URL}/api/payments/create`, {
    method: "POST",
    headers: {
      Authorization: `${accessToken}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ bookingId: bookingId }),
  });
 

  if (!res.ok) {
    console.error("Failed to create payment");
    return;
  }

  const json = await res.json();
  console.log(json);

  if (json.data.result.checkoutUrl) {
    redirect(json.data.result.checkoutUrl);
  } else if (json.result?.checkoutUrl) {
    redirect(json.result.checkoutUrl); 
  }
}

// Submit a Review
export async function submitReviewAction(formData: FormData) {
  const accessToken = await getToken();
  const bookingId = formData.get("bookingId") as string;
  const rating = Number(formData.get("rating"));
  const comment = formData.get("comment") as string;

  const res = await fetch(`${API_BASE_URL}/api/reviews`, {
    method: "POST",
    headers: {
      Authorization: `${accessToken}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ bookingId, rating, comment }),
  });

  if (res.ok) {
    revalidatePath("/dashboard/bookings");
    revalidatePath(`/dashboard/bookings/${bookingId}`);
  }
}