export interface TimeSlotOptions {
  startTime: string; // "09:00"
  endTime: string; // "17:00"
  interval?: number; // default 60 minutes
}

export function generateTimeSlots({
  startTime,
  endTime,
  interval = 60,
}: TimeSlotOptions): string[] {
  const slots: string[] = [];

  const [startHour, startMinute] = startTime.split(":").map(Number);

  const [endHour, endMinute] = endTime.split(":").map(Number);

  let currentMinutes = startHour * 60 + startMinute;

  const endMinutes = endHour * 60 + endMinute;

  while (currentMinutes < endMinutes) {
    const hour = Math.floor(currentMinutes / 60);

    const minute = currentMinutes % 60;

    const formattedHour = hour % 12 === 0 ? 12 : hour % 12;

    const amPm = hour >= 12 ? "PM" : "AM";

    const formattedMinute = minute.toString().padStart(2, "0");

    slots.push(`${formattedHour}:${formattedMinute} ${amPm}`);

    currentMinutes += interval;
  }

  return slots;
}
