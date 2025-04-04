
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { AlertCircle, CheckCircle2, ExternalLink, RefreshCw } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";

interface BlockchainInfoProps {
  reportId: string;
}

const BlockchainInfo = ({ reportId }: BlockchainInfoProps) => {
  const [status, setStatus] = useState<"pending" | "confirmed" | "failed">("pending");
  const [isRefreshing, setIsRefreshing] = useState(false);
  const { toast } = useToast();

  // This would be replaced with actual blockchain connection code
  const mockTransactionHash = `0x${Array.from({length: 40}, () => 
    Math.floor(Math.random() * 16).toString(16)).join('')}`;
  
  const refreshStatus = () => {
    setIsRefreshing(true);
    
    // Simulate checking blockchain status
    setTimeout(() => {
      setStatus("confirmed");
      setIsRefreshing(false);
      
      toast({
        title: "Blockchain Status Updated",
        description: "Transaction has been confirmed on the blockchain.",
      });
    }, 2000);
  };
  
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-sm font-medium flex items-center gap-2">
          Blockchain Verification
          {status === "confirmed" && <CheckCircle2 className="h-4 w-4 text-green-500" />}
          {status === "pending" && <AlertCircle className="h-4 w-4 text-amber-500" />}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4 text-sm">
          <div className="grid grid-cols-3 gap-1">
            <div className="font-medium">Report ID:</div>
            <div className="col-span-2 font-mono">{reportId}</div>
          </div>
          
          <div className="grid grid-cols-3 gap-1">
            <div className="font-medium">TX Hash:</div>
            <div className="col-span-2 font-mono text-xs truncate">{mockTransactionHash}</div>
          </div>
          
          <div className="grid grid-cols-3 gap-1">
            <div className="font-medium">Status:</div>
            <div className="col-span-2">
              {status === "confirmed" && (
                <span className="text-green-600 font-medium">Confirmed</span>
              )}
              {status === "pending" && (
                <span className="text-amber-600 font-medium">Pending</span>
              )}
              {status === "failed" && (
                <span className="text-red-600 font-medium">Failed</span>
              )}
            </div>
          </div>
          
          <div className="flex items-center justify-between pt-2">
            <Button
              variant="outline"
              size="sm"
              className="text-xs"
              onClick={refreshStatus}
              disabled={isRefreshing || status === "confirmed"}
            >
              {isRefreshing ? (
                <>
                  <RefreshCw className="mr-1 h-3 w-3 animate-spin" />
                  Checking...
                </>
              ) : (
                "Refresh Status"
              )}
            </Button>
            
            <Button
              variant="link"
              size="sm"
              className="text-xs"
              asChild
            >
              <a href="#" target="_blank" rel="noopener noreferrer">
                View on Explorer
                <ExternalLink className="ml-1 h-3 w-3" />
              </a>
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default BlockchainInfo;
