"use client";

import { useState } from "react";

export default function BookingCard({ service, technician }: any) {
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");

  return (
    <div
      className="p-6 rounded-2xl border sticky top-5"
      style={{
        backgroundColor: "var(--color-surface)",
        borderColor: "var(--color-steel-200)",
      }}
    >
      <h2 className="text-xl font-bold">Book Service</h2>

      {service && (
        <div className="mt-5">
          <h3 className="font-bold">{service.title}</h3>

          <p className="text-gray-500">{service.description}</p>

          <div className="mt-3 text-xl font-bold">৳{service.price}</div>
        </div>
      )}

      <div className="mt-5 space-y-3">
        <label>Select Date</label>

        <input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          className="
w-full border rounded-lg p-3
"
        />

        <label>Select Time</label>

        <select
          className="
w-full border rounded-lg p-3
"
          onChange={(e) => setTime(e.target.value)}
        >
          <option>09:00 AM</option>

          <option>11:00 AM</option>

          <option>02:00 PM</option>

          <option>04:00 PM</option>
        </select>

        <button
          className="
w-full
mt-5
py-3
rounded-xl
text-white
font-bold
"
          style={{
            backgroundColor: "var(--color-signal)",
          }}
        >
          Confirm Booking
        </button>
      </div>
    </div>
  );
}
