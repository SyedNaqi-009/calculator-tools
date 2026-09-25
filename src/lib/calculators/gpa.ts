export interface CourseInput {
  id: string;
  name?: string;
  grade: string;
  credits: number;
}

export interface GPAResult {
  gpa: number;
  totalCredits: number;
  totalQualityPoints: number;
  letterGradeEquivalent: string;
}

export const GRADE_SCALE: Record<string, number> = {
  "A+": 4.0,
  A: 4.0,
  "A-": 3.7,
  "B+": 3.3,
  B: 3.0,
  "B-": 2.7,
  "C+": 2.3,
  C: 2.0,
  "C-": 1.7,
  "D+": 1.3,
  D: 1.0,
  F: 0.0,
};

export function getLetterEquivalent(gpa: number): string {
  if (gpa >= 3.85) return "A";
  if (gpa >= 3.5) return "A-";
  if (gpa >= 3.15) return "B+";
  if (gpa >= 2.85) return "B";
  if (gpa >= 2.5) return "B-";
  if (gpa >= 2.15) return "C+";
  if (gpa >= 1.85) return "C";
  if (gpa >= 1.5) return "C-";
  if (gpa >= 1.15) return "D+";
  if (gpa >= 0.85) return "D";
  return "F";
}

export function calculateGPA(courses: CourseInput[]): GPAResult {
  let totalCredits = 0;
  let totalQualityPoints = 0;

  for (const course of courses) {
    const creds = Math.max(0, isNaN(course.credits) ? 0 : course.credits);
    const gradePoint = GRADE_SCALE[course.grade.toUpperCase()] ?? 0;

    totalCredits += creds;
    totalQualityPoints += gradePoint * creds;
  }

  const gpa = totalCredits > 0 ? totalQualityPoints / totalCredits : 0;
  const letterGradeEquivalent = getLetterEquivalent(gpa);

  return {
    gpa: Number(gpa.toFixed(2)),
    totalCredits,
    totalQualityPoints: Number(totalQualityPoints.toFixed(2)),
    letterGradeEquivalent,
  };
}
