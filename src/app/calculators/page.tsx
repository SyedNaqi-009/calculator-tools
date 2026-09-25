import { Metadata } from "next";
import { SITE_NAME, SITE_URL } from "@/lib/constants";
import { CalculatorsClient } from "./CalculatorsClient";

export const metadata: Metadata = {
  title: `All Calculators | ${SITE_NAME}`,
  description: "Browse our complete collection of free online calculators for finance, health, academic, and everyday utility.",
  alternates: {
    canonical: `${SITE_URL}/calculators`,
  }
};

export default function CalculatorsPage() {
  return <CalculatorsClient />;
}
