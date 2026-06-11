export interface Business {
  id: string;
  ownerId: string;
  name: string;
  tagline: string;
  description: string;
  industry: string;
  stage: "idea" | "startup" | "growth" | "established" | "enterprise";
  founded: string;
  employees: string;
  revenue?: string;
  location: string;
  country: string;
  website?: string;
  logo?: string;
  images?: string[];
  tags: string[];
  isVerified: boolean;
  isFeatured: boolean;
  viewsCount: number;
  status: "active" | "inactive" | "pending";
  createdAt: string;
  updatedAt: string;
}

export interface Opportunity {
  id: string;
  businessId: string;
  businessName: string;
  title: string;
  type: "partnership" | "franchise" | "acquisition" | "collaboration" | "service";
  description: string;
  budget?: string;
  industry: string;
  location: string;
  deadline?: string;
  status: "open" | "closed" | "in-progress";
  applicantsCount: number;
  createdAt: string;
}

export interface Lead {
  id: string;
  businessId: string;
  name: string;
  email: string;
  phone?: string;
  company?: string;
  source: string;
  status: "new" | "contacted" | "qualified" | "negotiating" | "closed-won" | "closed-lost";
  notes?: string;
  value?: string;
  createdAt: string;
  updatedAt: string;
}

export interface Partnership {
  id: string;
  initiatorId: string;
  partnerId: string;
  partnerName: string;
  partnerCompany: string;
  type: string;
  description: string;
  terms?: string;
  status: "proposed" | "negotiating" | "active" | "completed" | "terminated";
  startDate?: string;
  endDate?: string;
  createdAt: string;
}
