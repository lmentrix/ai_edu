// Timeline item types
export interface TimelineItem {
  id: string;
  title: string;
  description: string;
  timestamp: Date;
  type: 'note' | 'knowledge' | 'code' | 'concept';
  importance: 'low' | 'medium' | 'high';
  relatedMessages?: string[]; // IDs of related conversation messages
}

// Timeline component props
export interface ConvoTimelineProps {
  items: TimelineItem[];
  onItemSelect?: (item: TimelineItem) => void;
  className?: string;
  maxHeight?: number;
}

// Types for timeline filtering
export interface TimelineFilter {
  types?: TimelineItem['type'][];
  importance?: TimelineItem['importance'][];
  dateRange?: {
    start: Date;
    end: Date;
  };
}

// Types for timeline events
export interface TimelineEvent {
  type: 'item-added' | 'item-updated' | 'item-removed';
  item: TimelineItem;
  timestamp: Date;
}

// Authentication types
export interface User {
  id: string;
  email: string;
  name: string;
  image?: string;
  emailVerified: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface Session {
  id: string;
  userId: string;
  token: string;
  expiresAt: Date;
  ipAddress?: string;
  userAgent?: string;
  createdAt: Date;
  updatedAt: Date;
  user: User;
}

export interface AuthResponse {
  success: boolean;
  message?: string;
  user?: User;
  session?: Session;
}

export interface SignInCredentials {
  email: string;
  password: string;
}

export interface SignUpCredentials extends SignInCredentials {
  name: string;
}

export interface AuthError {
  code: string;
  message: string;
}

export interface AuthState {
  user: User | null;
  session: Session | null;
  isLoading: boolean;
  error: AuthError | null;
}