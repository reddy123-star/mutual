
export enum UserRole {
  Admin = 'Admin',
  Investor = 'Investor',
  FinancialAdvisor = 'Financial Advisor',
  DataAnalyst = 'Data Analyst',
}

export enum MutualFundCategory {
  Equity = 'Equity',
  Debt = 'Debt',
  Hybrid = 'Hybrid',
  SolutionOriented = 'Solution Oriented',
  Other = 'Other',
}

export enum RiskLevel {
  Low = 'Low',
  Medium = 'Medium',
  High = 'High',
}

export interface PerformanceData {
  date: string;
  value: number;
}

export interface Holding {
  name: string;
  percentage: number;
}

export interface MutualFund {
  id: string;
  name:string;
  symbol: string;
  category: MutualFundCategory;
  risk: RiskLevel;
  description: string;
  aum: number; // Assets Under Management in millions
  nav: number; // Net Asset Value
  returns: {
    '1Y': number;
    '3Y': number;
    '5Y': number;
  };
  topHoldings: Holding[];
  historicalData: PerformanceData[];
}

export interface User {
  id: number;
  name: string;
  role: UserRole;
  email: string;
}

export interface Article {
  id: string;
  title: string;
  author: string;
  authorRole: UserRole;
  date: string;
  summary: string;
  content: string;
}
