export interface AgeResult {
  years: number;
  months: number;
  days: number;
  nextBirthdayDays: number;
  dayOfWeekBorn: string;
  totalDays: number;
  totalWeeks: number;
  totalMonths: number;
  totalHours: number;
  zodiacSign: string;
}

export function getZodiacSign(day: number, month: number): string {
  // month is 1-based (1 = Jan, 12 = Dec)
  if ((month === 3 && day >= 21) || (month === 4 && day <= 19)) return "Aries (♈)";
  if ((month === 4 && day >= 20) || (month === 5 && day <= 20)) return "Taurus (♉)";
  if ((month === 5 && day >= 21) || (month === 6 && day <= 20)) return "Gemini (♊)";
  if ((month === 6 && day >= 21) || (month === 7 && day <= 22)) return "Cancer (♋)";
  if ((month === 7 && day >= 23) || (month === 8 && day <= 22)) return "Leo (♌)";
  if ((month === 8 && day >= 23) || (month === 9 && day <= 22)) return "Virgo (♍)";
  if ((month === 9 && day >= 23) || (month === 10 && day <= 22)) return "Libra (♎)";
  if ((month === 10 && day >= 23) || (month === 11 && day <= 21)) return "Scorpio (♏)";
  if ((month === 11 && day >= 22) || (month === 12 && day <= 21)) return "Sagittarius (♐)";
  if ((month === 12 && day >= 22) || (month === 1 && day <= 19)) return "Capricorn (♑)";
  if ((month === 1 && day >= 20) || (month === 2 && day <= 18)) return "Aquarius (♒)";
  return "Pisces (♓)";
}

export function calculateAge(birthDateInput: string | Date, targetDateInput: string | Date = new Date()): AgeResult {
  const birth = new Date(birthDateInput);
  const target = new Date(targetDateInput);

  if (isNaN(birth.getTime()) || isNaN(target.getTime())) {
    throw new Error("Invalid date provided.");
  }

  if (target < birth) {
    throw new Error("Target date must be after birth date.");
  }

  const daysOfWeek = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
  const dayOfWeekBorn = daysOfWeek[birth.getUTCDay()];

  let years = target.getUTCFullYear() - birth.getUTCFullYear();
  let months = target.getUTCMonth() - birth.getUTCMonth();
  let days = target.getUTCDate() - birth.getUTCDate();

  if (days < 0) {
    months -= 1;
    // Days in previous month of target
    const prevMonthDays = new Date(Date.UTC(target.getUTCFullYear(), target.getUTCMonth(), 0)).getUTCDate();
    days += prevMonthDays;
  }

  if (months < 0) {
    years -= 1;
    months += 12;
  }

  const diffMs = target.getTime() - birth.getTime();
  const totalDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));
  const totalWeeks = Math.floor(totalDays / 7);
  const totalMonths = years * 12 + months;
  const totalHours = totalDays * 24;

  // Next birthday calculation
  let nextBirthdayYear = target.getUTCFullYear();
  let nextBirthday = new Date(Date.UTC(nextBirthdayYear, birth.getUTCMonth(), birth.getUTCDate()));

  if (nextBirthday < target) {
    nextBirthdayYear += 1;
    nextBirthday = new Date(Date.UTC(nextBirthdayYear, birth.getUTCMonth(), birth.getUTCDate()));
  }

  const nextBirthdayDiff = nextBirthday.getTime() - target.getTime();
  const nextBirthdayDays = Math.ceil(nextBirthdayDiff / (1000 * 60 * 60 * 24));

  const zodiacSign = getZodiacSign(birth.getUTCDate(), birth.getUTCMonth() + 1);

  return {
    years,
    months,
    days,
    nextBirthdayDays,
    dayOfWeekBorn,
    totalDays,
    totalWeeks,
    totalMonths,
    totalHours,
    zodiacSign,
  };
}
