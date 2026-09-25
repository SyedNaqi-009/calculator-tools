export interface SemesterInput {
  id: string;
  name?: string;
  gpa: number;
  credits: number;
}

export interface CGPAResult {
  cgpa: number;
  totalCredits: number;
  percentageEquivalent: number;
}

export function calculateCGPA(semesters: SemesterInput[]): CGPAResult {
  let totalCredits = 0;
  let totalWeightedScore = 0;

  for (const sem of semesters) {
    const creds = Math.max(0, isNaN(sem.credits) ? 0 : sem.credits);
    const gpa = Math.max(0, Math.min(10, isNaN(sem.gpa) ? 0 : sem.gpa));

    totalCredits += creds;
    totalWeightedScore += gpa * creds;
  }

  const cgpa = totalCredits > 0 ? totalWeightedScore / totalCredits : 0;
  const percentageEquivalent = Number((cgpa * 9.5).toFixed(1));

  return {
    cgpa: Number(cgpa.toFixed(2)),
    totalCredits,
    percentageEquivalent,
  };
}
