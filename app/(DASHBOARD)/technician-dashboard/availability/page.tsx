"use client";

import { useState } from "react";
import { Clock, Save } from "lucide-react";
import { toast } from "sonner"; // Sonner toast import
import { updateAvailability } from "../_action/updateAvailability";

const DAYS_OF_WEEK = [
  { label: "Sunday", value: 0 },
  { label: "Monday", value: 1 },
  { label: "Tuesday", value: 2 },
  { label: "Wednesday", value: 3 },
  { label: "Thursday", value: 4 },
  { label: "Friday", value: 5 },
  { label: "Saturday", value: 6 },
];

interface Slot {
  dayOfWeek: number;
  startTime: string;
  endTime: string;
}

export default function TechnicianAvailabilityPage() {
  const [slots, setSlots] = useState<Slot[]>([
    { dayOfWeek: 0, startTime: "09:00", endTime: "17:00" },
    { dayOfWeek: 1, startTime: "09:00", endTime: "17:00" },
    { dayOfWeek: 2, startTime: "09:00", endTime: "17:00" },
    { dayOfWeek: 3, startTime: "09:00", endTime: "17:00" },
    { dayOfWeek: 4, startTime: "09:00", endTime: "17:00" },
    { dayOfWeek: 5, startTime: "09:00", endTime: "17:00" },
    { dayOfWeek: 6, startTime: "09:00", endTime: "17:00" },
  ]);

  const [loading, setLoading] = useState(false);

  const handleSlotChange = (index: number, field: keyof Slot, value: any) => {
    const updated = [...slots];
    updated[index] = { ...updated[index], [field]: value };
    setSlots(updated);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const promise = updateAvailability(slots);

    toast.promise(promise, {
      loading: "Updating availability...",
      success: (res) => {
        if (!res.success) throw new Error(res.message);
        return res.message || "Availability updated successfully!";
      },
      error: (err) => err.message || "Failed to update availability",
    });

    const res = await promise;
    setLoading(false);
  };

  return (
    <div className="max-w-full  mx-auto space-y-6">
      {/* Header Section */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pb-6 border-b border-[var(--color-steel-200)]">
        <div>
          <h1 className="text-2xl font-bold text-[var(--color-navy)] flex items-center gap-2">
            <Clock className="w-6 h-6 text-[var(--color-signal)]" />
            Manage Weekly Availability
          </h1>
          <p className="text-sm text-[var(--color-ink-muted)] mt-1">
            Set your working hours for all 7 days of the week at once.
          </p>
        </div>
      </div>

      {/* Slots Form */}
      <form onSubmit={handleSubmit} className="space-y-4">
        {slots.map((slot, index) => {
          const currentDay = DAYS_OF_WEEK.find((d) => d.value === slot.dayOfWeek);

          return (
            <div key={slot.dayOfWeek} className="card p-4 sm:p-5 flex flex-col sm:flex-row items-center gap-4 transition-all">
              
              {/* Day Label */}
              <div className="w-full sm:w-1/3">
                <label className="block text-xs font-semibold text-[var(--color-ink-muted)] uppercase mb-1">Day</label>
                <div className="px-3 py-2 rounded-lg bg-[var(--color-mist)] border border-[var(--color-steel-200)] text-[var(--color-ink)] text-sm font-semibold flex items-center justify-between">
                  {currentDay?.label}
                  <span className="text-xs text-[var(--color-ink-muted)] font-normal">Day {slot.dayOfWeek}</span>
                </div>
              </div>

              {/* Start Time */}
              <div className="w-full sm:w-1/3">
                <label className="block text-xs font-semibold text-[var(--color-ink-muted)] uppercase mb-1">Start Time</label>
                <input
                  type="time"
                  value={slot.startTime}
                  onChange={(e) => handleSlotChange(index, "startTime", e.target.value)}
                  className="w-full px-3 py-2 rounded-lg bg-[var(--color-mist)] border border-[var(--color-steel-200)] text-[var(--color-ink)] text-sm focus:outline-none focus:border-[var(--color-signal)]"
                  required
                />
              </div>

              {/* End Time */}
              <div className="w-full sm:w-1/3">
                <label className="block text-xs font-semibold text-[var(--color-ink-muted)] uppercase mb-1">End Time</label>
                <input
                  type="time"
                  value={slot.endTime}
                  onChange={(e) => handleSlotChange(index, "endTime", e.target.value)}
                  className="w-full px-3 py-2 rounded-lg bg-[var(--color-mist)] border border-[var(--color-steel-200)] text-[var(--color-ink)] text-sm focus:outline-none focus:border-[var(--color-signal)]"
                  required
                />
              </div>

            </div>
          );
        })}

        {/* Submit Button */}
        <div className="flex justify-end pt-4">
          <button
            type="submit"
            disabled={loading}
            className="btn-primary flex items-center gap-2 cursor-pointer disabled:opacity-50"
          >
            <Save className="w-4 h-4" />
            {loading ? "Saving All Slots..." : "Save All 7 Days Availability"}
          </button>
        </div>
      </form>
    </div>
  );
}