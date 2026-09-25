export type ActivityLevel = "sedentary" | "light" | "moderate" | "active" | "very_active";

export interface CalorieResult {
  bmr: number;
  maintenance: number;
  mildWeightLoss: number;
  moderateWeightLoss: number;
  extremeWeightLoss: number;
  mildWeightGain: number;
  moderateWeightGain: number;
}

const ACTIVITY_MULTIPLIERS: Record<ActivityLevel, number> = {
  sedentary: 1.2, // Little or no exercise
  light: 1.375, // Exercise 1-3 times/week
  moderate: 1.55, // Exercise 4-5 times/week
  active: 1.725, // Daily exercise or intense 3-4 times/week
  very_active: 1.9, // Intense exercise 6-7 times/week or physical job
};

export function calculateCalories(
  age: number,
  gender: "male" | "female",
  weightKg: number,
  heightCm: number,
  activityLevel: ActivityLevel = "moderate"
): CalorieResult {
  const safeAge = Math.max(10, Math.min(120, isNaN(age) ? 25 : age));
  const safeWeight = Math.max(20, isNaN(weightKg) ? 70 : weightKg);
  const safeHeight = Math.max(50, isNaN(heightCm) ? 170 : heightCm);

  // Mifflin-St Jeor Equation
  let bmr = 10 * safeWeight + 6.25 * safeHeight - 5 * safeAge;
  if (gender === "male") {
    bmr += 5;
  } else {
    bmr -= 161;
  }

  const multiplier = ACTIVITY_MULTIPLIERS[activityLevel] || 1.55;
  const maintenance = Math.round(bmr * multiplier);

  return {
    bmr: Math.round(bmr),
    maintenance,
    mildWeightLoss: Math.max(1200, maintenance - 250),
    moderateWeightLoss: Math.max(1200, maintenance - 500),
    extremeWeightLoss: Math.max(1200, maintenance - 1000),
    mildWeightGain: maintenance + 250,
    moderateWeightGain: maintenance + 500,
  };
}
