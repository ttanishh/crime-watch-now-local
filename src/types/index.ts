
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
  blockchainInfo?: {
    transactionHash: string;
    status: BlockchainStatus;
    timestamp: string;
  };
}

export enum CrimeType {
  THEFT = "Theft",
  ASSAULT = "Assault",
  VANDALISM = "Vandalism",
  ROBBERY = "Robbery",
  BURGLARY = "Burglary",
  HARASSMENT = "Harassment",
  FRAUD = "Fraud",
  OTHER = "Other",
  EMERGENCY = "Emergency" // Added emergency type
}

export enum CrimeStatus {
  REPORTED = "Reported",
  UNDER_INVESTIGATION = "Under Investigation",
  RESOLVED = "Resolved",
  CLOSED = "Closed"
}

export enum BlockchainStatus {
  PENDING = "Pending",
  CONFIRMED = "Confirmed",
  FAILED = "Failed"
}

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  phoneNumber?: string; // Added for phone auth
  phoneVerified?: boolean;
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

export interface EmergencyReport {
  id: string;
  description: string;
  location: string;
  contactInfo?: string;
  timestamp: string;
  evidence?: {
    fileUrl: string;
    fileType: string;
    description: string;
  }[];
  blockchainTxHash: string;
}
