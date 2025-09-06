// Core types for the LoveSync couples reminder app

export interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  coupleId?: string;
  partnerId?: string;
  partnerName?: string;
  createdAt: string;
  preferences: UserPreferences;
}

export interface UserPreferences {
  notifications: boolean;
  emailReminders: boolean;
  theme: 'light' | 'dark' | 'auto';
  reminderSound: boolean;
  timezone: string;
}

export interface Couple {
  id: string;
  user1Id: string;
  user2Id: string;
  coupleCode: string;
  anniversaryDate?: string;
  relationshipStart?: string;
  createdAt: string;
  sharedSettings: CoupleSettings;
}

export interface CoupleSettings {
  calendarSync: boolean;
  sharedReminders: boolean;
  autoReminders: boolean;
  milestoneTracking: boolean;
}

export interface Reminder {
  id: string;
  title: string;
  description?: string;
  category: ReminderCategory;
  priority: ReminderPriority;
  dueDate: string;
  isRecurring: boolean;
  recurringType?: RecurringType;
  recurringEnd?: string;
  isCompleted: boolean;
  createdBy: string;
  assignedTo?: string;
  notificationTime?: number; // minutes before due date
  tags: string[];
  createdAt: string;
  updatedAt: string;
}

export type ReminderCategory = 
  | 'anniversary'
  | 'date_night'
  | 'task'
  | 'birthday'
  | 'health'
  | 'celebration'
  | 'travel'
  | 'other';

export type ReminderPriority = 'low' | 'medium' | 'high' | 'urgent';

export type RecurringType = 
  | 'daily'
  | 'weekly' 
  | 'monthly'
  | 'yearly';

export interface Message {
  id: string;
  senderId: string;
  receiverId: string;
  content: string;
  type: MessageType;
  imageUrl?: string;
  isRead: boolean;
  createdAt: string;
  replyTo?: string;
}

export type MessageType = 'text' | 'image' | 'mood' | 'reminder' | 'celebration';

export interface MoodUpdate {
  id: string;
  userId: string;
  mood: MoodType;
  note?: string;
  createdAt: string;
}

export type MoodType = 
  | 'amazing'
  | 'happy'
  | 'good'
  | 'okay'
  | 'sad'
  | 'stressed'
  | 'excited'
  | 'romantic'
  | 'grateful';

export interface CalendarEvent {
  id: string;
  title: string;
  description?: string;
  startDate: string;
  endDate?: string;
  isAllDay: boolean;
  category: EventCategory;
  location?: string;
  createdBy: string;
  attendees: string[];
  reminders: string[]; // reminder IDs
  isRecurring: boolean;
  recurringRule?: RecurringType;
  color?: string;
  createdAt: string;
}

export type EventCategory = 
  | 'date'
  | 'anniversary'
  | 'birthday'
  | 'vacation'
  | 'appointment'
  | 'celebration'
  | 'milestone'
  | 'other';

export interface Milestone {
  id: string;
  title: string;
  description?: string;
  date: string;
  type: MilestoneType;
  isAchieved: boolean;
  imageUrl?: string;
  memories: string[];
  createdAt: string;
}

export type MilestoneType = 
  | 'relationship_start'
  | 'first_date'
  | 'anniversary'
  | 'engagement'
  | 'marriage'
  | 'move_in'
  | 'travel'
  | 'achievement'
  | 'custom';

export interface Notification {
  id: string;
  userId: string;
  title: string;
  message: string;
  type: NotificationType;
  isRead: boolean;
  actionUrl?: string;
  data?: any;
  createdAt: string;
}

export type NotificationType = 
  | 'reminder'
  | 'message'
  | 'milestone'
  | 'anniversary'
  | 'mood_update'
  | 'system';

export interface QuickAction {
  id: string;
  title: string;
  description: string;
  icon: string;
  action: string;
  category: 'reminder' | 'message' | 'calendar' | 'mood';
}

export interface RelationshipStats {
  totalDays: number;
  messagesExchanged: number;
  remindersCompleted: number;
  milestonesAchieved: number;
  averageMood: number;
  streakDays: number;
  upcomingEvents: number;
}

// Form types
export interface LoginFormData {
  email: string;
  password: string;
}

export interface RegisterFormData {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
}

export interface CoupleSetupData {
  partnerEmail?: string;
  coupleCode?: string;
  anniversaryDate?: string;
  relationshipStart?: string;
}

export interface ReminderFormData {
  title: string;
  description?: string;
  category: ReminderCategory;
  priority: ReminderPriority;
  dueDate: string;
  dueTime: string;
  isRecurring: boolean;
  recurringType?: RecurringType;
  recurringEnd?: string;
  notificationTime: number;
  assignedTo?: string;
  tags: string[];
}

export interface MessageFormData {
  content: string;
  type: MessageType;
  imageFile?: File;
}

// API Response types
export interface ApiResponse<T = any> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}

export interface AuthResponse extends ApiResponse {
  data?: {
    user: User;
    token: string;
  };
}

// Context types
export interface AuthContextType {
  user: User | null;
  partner: User | null;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<boolean>;
  register: (data: RegisterFormData) => Promise<boolean>;
  logout: () => void;
  updateProfile: (data: Partial<User>) => Promise<boolean>;
  setupCouple: (data: CoupleSetupData) => Promise<boolean>;
}