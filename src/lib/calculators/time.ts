export interface TimeResult {
  hours: number;
  minutes: number;
  seconds: number;
  daysPassed: number;
  formatted24: string;
  formatted12: string;
  totalSeconds: number;
}

export interface TimeDiffResult {
  hours: number;
  minutes: number;
  seconds: number;
  totalSeconds: number;
  formatted: string;
}

export function padZero(num: number): string {
  return num.toString().padStart(2, "0");
}

export function format12Hour(hours: number, minutes: number, seconds: number): string {
  const period = hours >= 12 ? "PM" : "AM";
  const h12 = hours % 12 === 0 ? 12 : hours % 12;
  return `${padZero(h12)}:${padZero(minutes)}:${padZero(seconds)} ${period}`;
}

export function addSubtractTime(
  startH: number,
  startM: number,
  startS: number,
  deltaH: number,
  deltaM: number,
  deltaS: number,
  operation: "+" | "-" = "+"
): TimeResult {
  const startTotalSeconds = startH * 3600 + startM * 60 + startS;
  const deltaTotalSeconds = deltaH * 3600 + deltaM * 60 + deltaS;

  let finalSeconds =
    operation === "+"
      ? startTotalSeconds + deltaTotalSeconds
      : startTotalSeconds - deltaTotalSeconds;

  let daysPassed = 0;
  if (finalSeconds < 0) {
    const daysBack = Math.ceil(Math.abs(finalSeconds) / 86400);
    finalSeconds += daysBack * 86400;
    daysPassed = -daysBack;
  } else {
    daysPassed = Math.floor(finalSeconds / 86400);
    finalSeconds = finalSeconds % 86400;
  }

  const hours = Math.floor(finalSeconds / 3600);
  const minutes = Math.floor((finalSeconds % 3600) / 60);
  const seconds = finalSeconds % 60;

  const formatted24 = `${padZero(hours)}:${padZero(minutes)}:${padZero(seconds)}`;
  const formatted12 = format12Hour(hours, minutes, seconds);

  return {
    hours,
    minutes,
    seconds,
    daysPassed,
    formatted24,
    formatted12,
    totalSeconds: finalSeconds,
  };
}

export function calculateTimeDifference(
  h1: number,
  m1: number,
  s1: number,
  h2: number,
  m2: number,
  s2: number
): TimeDiffResult {
  const t1 = h1 * 3600 + m1 * 60 + s1;
  const t2 = h2 * 3600 + m2 * 60 + s2;

  let diff = Math.abs(t2 - t1);
  const hours = Math.floor(diff / 3600);
  const minutes = Math.floor((diff % 3600) / 60);
  const seconds = diff % 60;

  const formatted = `${hours}h ${minutes}m ${seconds}s`;

  return {
    hours,
    minutes,
    seconds,
    totalSeconds: diff,
    formatted,
  };
}
