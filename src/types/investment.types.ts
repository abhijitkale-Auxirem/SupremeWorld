export interface Investment {
  id: string;
  investorId: string;
  startupId: string;
  startupName: string;
  amount: number;
  currency: string;
  equity?: number;
  round: "pre-seed" | "seed" | "series-a" | "series-b" | "series-c" | "growth" | "ipo";
  status: "pending" | "active" | "exited" | "written-off";
  currentValue?: number;
  returnMultiple?: number;
  investedAt: string;
  exitedAt?: string;
  notes?: string;
}

export interface Deal {
  id: string;
  startupName: string;
  founderName: string;
  industry: string;
  stage: string;
  askAmount: number;
  valuation: number;
  currency: string;
  equity: number;
  description: string;
  pitchDeck?: string;
  traction: string;
  team: string;
  location: string;
  tags: string[];
  status: "open" | "closed" | "funded";
  interestedCount: number;
  createdAt: string;
}

export interface Portfolio {
  totalInvested: number;
  currentValue: number;
  totalReturn: number;
  returnPercentage: number;
  activeInvestments: number;
  exitedInvestments: number;
  currency: string;
}

export interface InvestmentReport {
  id: string;
  title: string;
  period: string;
  totalInvested: number;
  totalReturn: number;
  topPerformer: string;
  status: "draft" | "published";
  createdAt: string;
}
