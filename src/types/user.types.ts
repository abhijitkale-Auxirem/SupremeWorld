export interface UserProfile {
  id: string;
  userId: string;
  bio: string;
  location: string;
  country: string;
  website?: string;
  linkedin?: string;
  twitter?: string;
  industry: string;
  skills: string[];
  languages: string[];
  avatar?: string;
  coverImage?: string;
  isPublic: boolean;
  followersCount: number;
  followingCount: number;
  connectionsCount: number;
  createdAt: string;
  updatedAt: string;
}

export interface Connection {
  id: string;
  userId: string;
  connectedUserId: string;
  name: string;
  role: string;
  avatar?: string;
  company?: string;
  status: "pending" | "connected" | "blocked";
  connectedAt: string;
}

export interface Notification {
  id: string;
  userId: string;
  type: "connection" | "message" | "event" | "investment" | "system";
  title: string;
  message: string;
  isRead: boolean;
  actionUrl?: string;
  createdAt: string;
}

export interface Message {
  id: string;
  conversationId: string;
  senderId: string;
  senderName: string;
  senderAvatar?: string;
  content: string;
  isRead: boolean;
  createdAt: string;
}

export interface Conversation {
  id: string;
  participantId: string;
  participantName: string;
  participantAvatar?: string;
  lastMessage: string;
  lastMessageAt: string;
  unreadCount: number;
}
