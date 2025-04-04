
import { useState } from "react";
import { useToast } from "@/components/ui/use-toast";
import Navbar from "@/components/Navbar";
import Map from "@/components/Map";
import ReportForm from "@/components/ReportForm";
import { Crime } from "@/types";
import { AlertTriangle, Check, FileText } from "lucide-react";

const Report = () => {
  const [selectedLocation, setSelectedLocation] = useState<{
    lat: number;
    lng: number;
    address?: string;
  } | undefined>();
  
  const [submittedReport, setSubmittedReport] = useState<Crime | null>(null);
  const { toast } = useToast();
  
  const handleLocationSelect = (lat: number, lng: number, address?: string) => {
    setSelectedLocation({ lat, lng, address });
  };
  
  const handleReportSuccess = (crime: Crime) => {
    setSubmittedReport(crime);
    setSelectedLocation(undefined);
    
    // Display success message
    toast({
      title: "Report Submitted Successfully",
      description: "Your crime report has been recorded.",
      duration: 5000,
    });
  };
  
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <div className="container mx-auto px-4 py-6 md:px-6 md:py-8 flex-1">
        <h1 className="text-3xl font-bold mb-2">Report a Crime</h1>
        <p className="text-muted-foreground mb-6">
          Help improve community safety by reporting criminal incidents
        </p>
        
        {submittedReport ? (
          <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-6">
            <div className="flex items-start">
              <div className="flex-shrink-0">
                <Check className="h-5 w-5 text-green-500" />
              </div>
              <div className="ml-3 w-full">
                <h3 className="text-sm font-medium text-green-800">Report Submitted Successfully</h3>
                <div className="mt-2 text-sm text-green-700">
                  <p>Your report has been submitted and will be reviewed by authorities.</p>
                  
                  {submittedReport.evidence && submittedReport.evidence.length > 0 && (
                    <div className="mt-4 border-t border-green-200 pt-4">
                      <h4 className="font-medium flex items-center gap-1 mb-2">
                        <FileText className="h-4 w-4" />
                        Evidence Submitted ({submittedReport.evidence.length})
                      </h4>
                      <div className="grid gap-2">
                        {submittedReport.evidence.map((item, i) => (
                          <div key={i} className="bg-white/60 p-2 rounded-md text-green-800 flex items-center">
                            <span className="font-medium mr-1">#{i+1}:</span> {item.description}
                          </div>
                        ))}
                      </div>
                      <p className="mt-3 text-xs">
                        Your evidence has been securely stored. A record hash will be generated on the blockchain for verification.
                      </p>
                    </div>
                  )}
                  
                  <button
                    className="mt-4 text-green-600 hover:text-green-800 font-medium"
                    onClick={() => setSubmittedReport(null)}
                  >
                    Submit another report
                  </button>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2 flex flex-col">
              <div className="bg-muted/30 p-4 rounded-lg mb-4">
                <div className="flex items-center space-x-2">
                  <AlertTriangle className="h-5 w-5 text-amber-500" />
                  <span className="font-medium">Select the incident location on the map</span>
                </div>
                {!selectedLocation && (
                  <p className="text-sm text-muted-foreground mt-1">
                    Click on the map to pinpoint where the incident occurred
                  </p>
                )}
              </div>
              
              <div className="flex-1">
                <Map
                  onLocationSelect={handleLocationSelect}
                  selectedLocation={selectedLocation}
                />
              </div>
            </div>
            
            <div>
              <ReportForm 
                selectedLocation={selectedLocation} 
                onSubmitSuccess={handleReportSuccess}
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Report;
