
import { useState, useEffect } from "react";
import NotificationsPanel from "./NotificationsPanel";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { LogOut, User } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { logoutUser } from "@/utils/firebase";

const NavbarExtras = () => {
  const { currentUser } = useAuth();
  const navigate = useNavigate();
  
  const handleLogout = async () => {
    try {
      await logoutUser();
      navigate("/");
    } catch (error) {
      console.error("Failed to logout:", error);
    }
  };
  
  const handleLogin = () => {
    navigate("/auth");
  };
  
  return (
    <div className="flex items-center gap-2">
      <NotificationsPanel />
      
      {currentUser ? (
        <div className="flex items-center gap-2">
          <Button 
            variant="ghost"
            size="icon"
            className="relative"
            onClick={() => navigate("/dashboard")}
          >
            <User className="h-5 w-5" />
          </Button>
          
          <Button 
            variant="ghost" 
            size="sm"
            onClick={handleLogout}
            className="text-xs flex items-center gap-1"
          >
            <LogOut className="h-4 w-4" />
            Logout
          </Button>
        </div>
      ) : (
        <Button 
          variant="outline" 
          size="sm"
          onClick={handleLogin}
        >
          Login
        </Button>
      )}
    </div>
  );
};

export default NavbarExtras;
