
import { useState } from "react";
import Navbar from "@/components/Navbar";
import EmergencyReportForm from "@/components/EmergencyReportForm";
import PhoneAuth from "@/components/PhoneAuth";
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert";
import { Shield, Info } from "lucide-react";

const EmergencyReport = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [phoneNumber, setPhoneNumber] = useState<string | null>(null);
  
  const handleAuthSuccess = (phone: string) => {
    setIsAuthenticated(true);
    setPhoneNumber(phone);
  };
  
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <div className="container mx-auto px-4 py-6 md:px-6 md:py-8 flex-1">
        <div className="max-w-3xl mx-auto space-y-6">
          <h1 className="text-3xl font-bold mb-2 text-red-600 flex items-center gap-2">
            <Shield className="h-6 w-6" />
            Emergency Report
          </h1>
          
          <Alert>
            <Info className="h-4 w-4" />
            <AlertTitle>Important Information</AlertTitle>
            <AlertDescription>
              This emergency reporting system securely records incidents on a blockchain for transparency and immutability. 
              No wallet or cryptocurrency is required to submit reports.
            </AlertDescription>
          </Alert>
          
          {!isAuthenticated ? (
            <div className="space-y-4">
              <h2 className="text-xl font-semibold">Verify Your Phone Number</h2>
              <p className="text-muted-foreground">
                Before submitting an emergency report, please verify your phone number for accountability.
              </p>
              <PhoneAuth onAuthSuccess={handleAuthSuccess} />
              <div className="pt-4 text-center">
                <p className="text-sm text-muted-foreground">
                  For demonstration purposes, use code <span className="font-mono">123456</span>
                </p>
              </div>
            </div>
          ) : (
            <div className="space-y-4">
              <div className="bg-green-50 border border-green-200 rounded-md p-3">
                <p className="text-green-800 text-sm">
                  Verified phone: <strong>{phoneNumber}</strong>
                </p>
              </div>
              <EmergencyReportForm />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default EmergencyReport;
