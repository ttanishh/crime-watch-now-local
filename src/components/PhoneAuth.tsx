
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Loader2, Phone, Check } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { InputOTP, InputOTPGroup, InputOTPSlot } from "@/components/ui/input-otp";

interface PhoneAuthProps {
  onAuthSuccess: (phoneNumber: string) => void;
}

const PhoneAuth = ({ onAuthSuccess }: PhoneAuthProps) => {
  const [phoneNumber, setPhoneNumber] = useState("");
  const [otpCode, setOtpCode] = useState("");
  const [step, setStep] = useState<"phone" | "otp">("phone");
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  const handleSendCode = async () => {
    if (!phoneNumber || phoneNumber.length < 10) {
      toast({
        title: "Invalid Phone Number",
        description: "Please enter a valid phone number.",
        variant: "destructive",
      });
      return;
    }

    setLoading(true);
    
    // Simulating API call to send OTP
    setTimeout(() => {
      toast({
        title: "Verification Code Sent",
        description: `A code has been sent to ${phoneNumber}. Use code 123456 for demo.`,
      });
      setStep("otp");
      setLoading(false);
    }, 1500);
  };

  const handleVerifyCode = async () => {
    if (otpCode.length !== 6) {
      toast({
        title: "Invalid Code",
        description: "Please enter the 6-digit verification code.",
        variant: "destructive",
      });
      return;
    }

    setLoading(true);
    
    // Simulating API call to verify OTP
    setTimeout(() => {
      // For demo purposes, accept 123456 as valid code
      if (otpCode === "123456") {
        toast({
          title: "Authentication Successful",
          description: "Your phone number has been verified.",
        });
        onAuthSuccess(phoneNumber);
      } else {
        toast({
          title: "Invalid Code",
          description: "The code you entered is incorrect. Please try again.",
          variant: "destructive",
        });
        setOtpCode("");
      }
      setLoading(false);
    }, 1500);
  };

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader>
        <CardTitle className="text-xl font-bold">Phone Authentication</CardTitle>
      </CardHeader>
      <CardContent>
        {step === "phone" ? (
          <div className="space-y-4">
            <div className="flex items-center border rounded-md px-3 py-2 focus-within:ring-2 focus-within:ring-ring focus-within:ring-offset-2 focus-within:ring-offset-background">
              <Phone className="h-4 w-4 mr-2 text-muted-foreground" />
              <Input 
                type="tel" 
                placeholder="Enter your phone number" 
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
                className="border-0 focus-visible:ring-0 focus-visible:ring-offset-0 p-0"
              />
            </div>
            <p className="text-sm text-muted-foreground">
              We'll send a verification code to this number
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            <p className="text-sm">Enter the verification code sent to {phoneNumber}</p>
            <div className="flex justify-center py-2">
              <InputOTP
                value={otpCode}
                onChange={setOtpCode}
                maxLength={6}
                render={({ slots }) => (
                  <InputOTPGroup>
                    {slots.map((slot, index) => (
                      <InputOTPSlot key={index} index={index} {...slot} />
                    ))}
                  </InputOTPGroup>
                )}
              />
            </div>
            <Button 
              variant="link" 
              className="p-0 h-auto text-xs"
              onClick={() => setStep("phone")}
            >
              Change phone number
            </Button>
          </div>
        )}
      </CardContent>
      <CardFooter>
        <Button 
          className="w-full"
          onClick={step === "phone" ? handleSendCode : handleVerifyCode}
          disabled={loading || (step === "phone" && phoneNumber.length < 10) || (step === "otp" && otpCode.length < 6)}
        >
          {loading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              {step === "phone" ? "Sending..." : "Verifying..."}
            </>
          ) : (
            <>
              {step === "phone" ? "Send Verification Code" : "Verify Code"}
              {!loading && <Check className="ml-2 h-4 w-4" />}
            </>
          )}
        </Button>
      </CardFooter>
    </Card>
  );
};

export default PhoneAuth;
