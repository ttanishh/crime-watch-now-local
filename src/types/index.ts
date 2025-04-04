export interface Crime {
  id: string;
  type: CrimeType;
  description: string;
  location: {
    lat: number;
    lng: number;
    address?: string;
  };
  date: string;
  time: string;
  status: CrimeStatus;
  reportedBy?: string;
  media?: string[];
  evidence?: {
    fileUrl: string;
    fileType: string;
    description: string;
    timestamp: string;
  }[];
}

export enum CrimeType {
  THEFT = "Theft",
  ASSAULT = "Assault",
  VANDALISM = "Vandalism",
  ROBBERY = "Robbery",
  BURGLARY = "Burglary",
  HARASSMENT = "Harassment",
  FRAUD = "Fraud",
  OTHER = "Other"
}

export enum CrimeStatus {
  REPORTED = "Reported",
  UNDER_INVESTIGATION = "Under Investigation",
  RESOLVED = "Resolved",
  CLOSED = "Closed"
}

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
}

export enum UserRole {
  CITIZEN = "citizen",
  ADMIN = "admin",
  LAW_ENFORCEMENT = "law_enforcement"
}

export interface AuthState {
  isAuthenticated: boolean;
  user: User | null;
  token: string | null;
}
