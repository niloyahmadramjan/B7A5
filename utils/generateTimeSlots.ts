export interface TimeSlotOptions {
  startTime: string; // "09:00"
  endTime: string;   // "17:00"
  interval?: number; // minutes
}

export interface TimeSlot {
  value: string; // Backend value: "09:00"
  label: string; // Display value: "9:00 AM"
}

export function generateTimeSlots({
  startTime,
  endTime,
  interval = 60,
}: TimeSlotOptions): TimeSlot[] {
  const slots: TimeSlot[] = [];

  const [startHour, startMinute] = startTime
    .split(":")
    .map(Number);

  const [endHour, endMinute] = endTime
    .split(":")
    .map(Number);

  let currentMinutes = startHour * 60 + startMinute;

  const endMinutes = endHour * 60 + endMinute;

  while (currentMinutes < endMinutes) {
    const hour = Math.floor(currentMinutes / 60);
    const minute = currentMinutes % 60;

    const formattedHour = hour % 12 === 0 ? 12 : hour % 12;

    const amPm = hour >= 12 ? "PM" : "AM";

    const formattedMinute = minute
      .toString()
      .padStart(2, "0");

    slots.push({
      value: `${hour.toString().padStart(2, "0")}:${formattedMinute}`,
      label: `${formattedHour}:${formattedMinute} ${amPm}`,
    });

    currentMinutes += interval;
  }

  return slots;
}