"use server";

type CustomerBookingPayload = {
  serviceId: string;
  scheduledAt: string;
  address: string;
  notes: string;
};

export async function customerBooking(data: CustomerBookingPayload) {
  try {
    const res = await fetch(`${process.env.BACKEND_API_URL}/api/bookings`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
      cache: "no-store",
    });

    const result = await res.json();

    if (!res.ok) {
      return {
        success: false,
        message: result?.message || "Booking failed",
      };
    }

    return {
      success: true,
      data: result,
    };
  } catch (error) {
    console.error("Customer booking error:", error);

    return {
      success: false,
      message: "Something went wrong. Please try again.",
    };
  }
}