
import { Crime, CrimeType, CrimeStatus } from "@/types";

// Mock data for development
const mockCrimes: Crime[] = [
  {
    id: "1",
    type: CrimeType.THEFT,
    description: "Bicycle stolen from outside the library",
    location: {
      lat: 21.165,
      lng: 72.831,
      address: "Central Library, City Center"
    },
    date: "2025-04-01",
    time: "14:30",
    status: CrimeStatus.REPORTED
  },
  {
    id: "2",
    type: CrimeType.VANDALISM,
    description: "Graffiti on public building wall",
    location: {
      lat: 21.168,
      lng: 72.835,
      address: "Municipal Building, Park Street"
    },
    date: "2025-04-02",
    time: "23:15",
    status: CrimeStatus.UNDER_INVESTIGATION
  },
  {
    id: "3",
    type: CrimeType.ASSAULT,
    description: "Physical altercation between two individuals",
    location: {
      lat: 21.162,
      lng: 72.827,
      address: "Downtown Bar, Main Street"
    },
    date: "2025-04-03",
    time: "01:45",
    status: CrimeStatus.RESOLVED
  },
  {
    id: "4",
    type: CrimeType.FRAUD,
    description: "Credit card skimming device found on ATM",
    location: {
      lat: 21.170,
      lng: 72.840,
      address: "Shopping Mall ATM, Commerce Avenue"
    },
    date: "2025-04-02",
    time: "09:20",
    status: CrimeStatus.UNDER_INVESTIGATION
  }
];

// Mock API functions
export const fetchCrimes = async (): Promise<Crime[]> => {
  // In a real app, this would be an API call
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(mockCrimes);
    }, 500);
  });
};

export const submitCrime = async (crimeData: Omit<Crime, 'id' | 'status'>): Promise<Crime> => {
  // In a real app, this would interact with a blockchain network
  // For a blockchain implementation:
  // 1. Hash the evidence files and store hashes on-chain
  // 2. Upload actual files to IPFS or similar storage
  // 3. Create a smart contract transaction to record the report
  
  return new Promise((resolve) => {
    setTimeout(() => {
      // Simulate blockchain transaction hash
      const mockTransactionHash = `0x${Array.from({length: 40}, () => 
        Math.floor(Math.random() * 16).toString(16)).join('')}`;
      
      console.log(`Mock blockchain transaction: ${mockTransactionHash}`);
      
      const newCrime: Crime = {
        ...crimeData,
        id: `crime-${Date.now()}`,
        status: CrimeStatus.REPORTED,
      };
      mockCrimes.push(newCrime);
      resolve(newCrime);
    }, 1500); // Longer delay to simulate blockchain transaction
  });
};

// Authentication mock functions
export const loginUser = async (email: string, password: string) => {
  // Simulate API call delay
  return new Promise((resolve) => {
    setTimeout(() => {
      // Mock implementation - in real app this would verify credentials
      if (email && password) {
        resolve({
          user: {
            id: "user123",
            name: "Test User",
            email,
            role: "citizen"
          },
          token: "mock-jwt-token"
        });
      } else {
        throw new Error("Invalid credentials");
      }
    }, 800);
  });
};

export const registerUser = async (name: string, email: string, password: string) => {
  // Simulate API call delay
  return new Promise((resolve) => {
    setTimeout(() => {
      // Mock implementation - in real app this would create an account
      if (name && email && password) {
        resolve({
          user: {
            id: "newuser123",
            name,
            email,
            role: "citizen"
          },
          token: "mock-jwt-token"
        });
      } else {
        throw new Error("Registration failed. Please fill all fields.");
      }
    }, 1000);
  });
};
