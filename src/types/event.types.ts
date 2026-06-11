export interface Event {
  id: string;
  organizerId: string;
  title: string;
  description: string;
  type: "summit" | "conference" | "meetup" | "workshop" | "webinar" | "networking" | "gala";
  category: string;
  format: "in-person" | "virtual" | "hybrid";
  location?: string;
  country?: string;
  venue?: string;
  virtualLink?: string;
  startDate: string;
  endDate: string;
  timezone: string;
  capacity: number;
  registeredCount: number;
  ticketPrice?: number;
  currency?: string;
  isFree: boolean;
  isFeatured: boolean;
  banner?: string;
  tags: string[];
  speakers?: Speaker[];
  status: "upcoming" | "ongoing" | "completed" | "cancelled";
  createdAt: string;
}

export interface Speaker {
  id: string;
  name: string;
  title: string;
  company: string;
  avatar?: string;
  bio?: string;
}

export interface EventRegistration {
  id: string;
  eventId: string;
  userId: string;
  eventTitle: string;
  eventDate: string;
  status: "registered" | "attended" | "cancelled";
  ticketCode: string;
  registeredAt: string;
}

export interface Community {
  id: string;
  name: string;
  description: string;
  category: string;
  membersCount: number;
  isPrivate: boolean;
  isFeatured: boolean;
  banner?: string;
  tags: string[];
  createdAt: string;
}
