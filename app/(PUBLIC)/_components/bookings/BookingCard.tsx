"use client";
import { generateTimeSlots } from "@/utils/generateTimeSlots";
import { useState, useTransition } from "react";
import { customerBooking } from "../../_action/customerBooking";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

export default function BookingCard({ technician, service }: any) {
  const [selectedDate] = useState(new Date()); 
  const [time, setTime] = useState("");
  const [address, setAddress] = useState("");
  const [notes, setNotes] = useState("");

  const [pending, startTransition] = useTransition();

  const router = useRouter()

  const availability = technician.availability?.find(
    (item: any) => item.isAvailable,
  );

  const timeSlots = availability
    ? generateTimeSlots({
        startTime: availability.startTime,
        endTime: availability.endTime,
        interval: 60,
      })
    : [];

  const handleBooking = () => {
    if (!time) {
      // return alert("Please select a time");
      return toast.warning("Please select a time")
    }

    if (!address.trim()) {
      // return alert("Address is required");
      return toast.warning("Address is required")
    }

    const [hour, minute] = time.split(":").map(Number);

    const bookingDate = new Date(selectedDate);

    bookingDate.setHours(hour);
    bookingDate.setMinutes(minute);
    bookingDate.setSeconds(0);
    bookingDate.setMilliseconds(0);

    startTransition(async () => {
      const result = await customerBooking({
        serviceId: service.id,
        scheduledAt: bookingDate.toISOString(),
        address,
        notes,
      });

      if (result.success) {
        // alert("Booking created");
        toast.success("Booking created successfully!")
        router.push("/dashbaord/bookings")
      } else {
        // alert(result.message);
        toast.error(result.message)
      }
    });
  };

  return (
    <div
      className="p-6 rounded-2xl border sticky top-5"
      style={{
        backgroundColor: "var(--color-surface)",
        borderColor: "var(--color-steel-200)",
      }}
    >
      <h2 className="text-xl font-bold">Book Service</h2>

      <div className="mt-5">
        <h3 className="font-bold">{service.title}</h3>

        <p className="text-gray-500">{service.description}</p>

        <div className="mt-3 font-bold text-xl">৳{service.price}</div>
      </div>

      <div className="mt-5">
        <label className="text-sm font-semibold">Available Time</label>

        <select
          value={time}
          onChange={(e) => setTime(e.target.value)}
          className="w-full rounded-lg border p-3 bg-primary"
        >
          <option value="">Select Time</option>

          {timeSlots.map((slot) => (
            <option key={slot.value} value={slot.value}>
              {slot.label}
            </option>
          ))}
        </select>
      </div>

      <div className="mt-4">
        <label className="text-sm font-semibold">Address</label>

        <input
          type="text"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          placeholder="Flat 3B, GEC Circle, Chattogram"
          className="w-full rounded-lg border p-3"
        />
      </div>

      <div className="mt-4">
        <label className="text-sm font-semibold">Notes</label>

        <textarea
          rows={4}
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
          placeholder="Need full house wiring inspection..."
          className="w-full rounded-lg border p-3"
        />
      </div>

      <button
        disabled={pending}
        onClick={handleBooking}
        className="w-full mt-5 py-3 rounded-xl text-white font-bold cursor-pointer"
        style={{
          backgroundColor: "var(--color-signal)",
        }}
      >
        {pending ? "Booking..." : "Confirm Booking"}
      </button>
    </div>
  );
}
