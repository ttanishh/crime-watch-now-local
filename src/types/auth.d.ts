
// Extending the AuthState interface to include proper typing for auth responses
import { User } from './index';
import { UserRole } from '@/utils/firebase';

export interface AuthResponse {
  user: User;
  token: string;
}

export interface FirebaseUser {
  uid: string;
  displayName: string | null;
  email: string | null;
  phoneNumber: string | null;
  photoURL: string | null;
  emailVerified: boolean;
}

export interface UserProfile {
  uid: string;
  name: string;
  email: string;
  role: UserRole;
  phoneNumber?: string;
  phoneVerified?: boolean;
  createdAt: string;
}

declare global {
  interface Window {
    google?: any;
  }
}
