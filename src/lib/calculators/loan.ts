import { calculateEMI, EMIResult } from "./emi";

export type LoanType = "Home Loan" | "Car Loan" | "Personal Loan" | "Education Loan";

export interface LoanTypeInfo {
  defaultRate: number;
  defaultTenureYears: number;
  tip: string;
}

export const LOAN_TYPE_CONFIG: Record<LoanType, LoanTypeInfo> = {
  "Home Loan": {
    defaultRate: 8.5,
    defaultTenureYears: 20,
    tip: "Home loans typically offer long tenures and valuable tax benefits under Section 80C and Section 24 in many tax jurisdictions.",
  },
  "Car Loan": {
    defaultRate: 9.0,
    defaultTenureYears: 5,
    tip: "Car loans are secured against the vehicle with shorter 3 to 7-year terms to mitigate rapid automotive depreciation.",
  },
  "Personal Loan": {
    defaultRate: 13.0,
    defaultTenureYears: 3,
    tip: "Personal loans are unsecured credit requiring no collateral, but carry higher interest rates. Aim to prepay early.",
  },
  "Education Loan": {
    defaultRate: 10.5,
    defaultTenureYears: 7,
    tip: "Education loans often feature repayment moratoriums during your college tenure and tax deductions on interest paid.",
  },
};

export interface LoanResult extends EMIResult {
  loanType: LoanType;
  tip: string;
}

export function calculateLoan(
  principal: number,
  annualRate: number,
  tenureYears: number,
  loanType: LoanType = "Home Loan"
): LoanResult {
  const tenureMonths = tenureYears * 12;
  const emiResult = calculateEMI(principal, annualRate, tenureMonths);
  const tip = LOAN_TYPE_CONFIG[loanType]?.tip || "";

  return {
    ...emiResult,
    loanType,
    tip,
  };
}
