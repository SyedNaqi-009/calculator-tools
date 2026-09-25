export interface DaysBetweenResult {
  totalDays: number;
  weeks: number;
  remainingDays: number;
  months: number;
  years: number;
  businessDays: number;
  weekendDays: number;
  hours: number;
  minutes: number;
  seconds: number;
}

export function calculateDaysBetween(
  startDateInput: string | Date,
  endDateInput: string | Date,
  includeEndDate = false
): DaysBetweenResult {
  const start = new Date(startDateInput);
  const end = new Date(endDateInput);

  if (isNaN(start.getTime()) || isNaN(end.getTime())) {
    throw new Error("Invalid dates provided.");
  }

  // Normalize to UTC midnight
  const d1 = new Date(Date.UTC(start.getFullYear(), start.getMonth(), start.getDate()));
  const d2 = new Date(Date.UTC(end.getFullYear(), end.getMonth(), end.getDate()));

  const isReversed = d2 < d1;
  const earlier = isReversed ? d2 : d1;
  const later = isReversed ? d1 : d2;

  let diffDays = Math.round((later.getTime() - earlier.getTime()) / (1000 * 60 * 60 * 24));
  if (includeEndDate) {
    diffDays += 1;
  }

  // Calculate business days & weekends
  let businessDays = 0;
  let weekendDays = 0;
  const current = new Date(earlier.getTime());
  const limit = includeEndDate ? diffDays : diffDays;

  for (let i = 0; i < limit; i++) {
    const dayOfWeek = current.getUTCDay();
    if (dayOfWeek === 0 || dayOfWeek === 6) {
      weekendDays++;
    } else {
      businessDays++;
    }
    current.setUTCDate(current.getUTCDate() + 1);
  }

  const weeks = Math.floor(diffDays / 7);
  const remainingDays = diffDays % 7;

  // Approximate calendar years and months
  const years = Number((diffDays / 365.25).toFixed(1));
  const months = Number((diffDays / 30.4375).toFixed(1));

  const hours = diffDays * 24;
  const minutes = hours * 60;
  const seconds = minutes * 60;

  return {
    totalDays: diffDays,
    weeks,
    remainingDays,
    months,
    years,
    businessDays,
    weekendDays,
    hours,
    minutes,
    seconds,
  };
}
