
export type Country = 'INDIA' | 'USA';

export enum TaxRegime {
  NEW = 'NEW_REGIME', // Default 2025-26
  OLD = 'OLD_REGIME'
}

export enum FilingStatus {
  SINGLE = 'Single',
  MARRIED_JOINT = 'Married Filing Jointly',
  HEAD_OF_HOUSEHOLD = 'Head of Household'
}

export interface TaxResult {
  grossIncome: number;
  totalDeductions: number;
  taxableIncome: number;
  totalTax: number;
  netIncome: number;
  effectiveRate: number;
  currency: string;
  // Flexible breakdown for different tax systems (e.g., Cess for India, FICA for US)
  breakdown: {
    label: string;
    value: number;
    highlight?: boolean;
    tooltip?: string;
  }[];
}

export interface ChatMessage {
  id: string;
  role: 'user' | 'model';
  text: string;
  timestamp: number;
}
