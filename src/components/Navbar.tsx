import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Shield, Menu, LogIn, MapPin, BarChart3, X, LogOut } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { UserRole, logoutUser } from "@/utils/firebase";
import NavbarExtras from "./NavbarExtras";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { currentUser, userRole } = useAuth();
  
  const isActive = (path: string) => location.pathname === path;
  
  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  
  return (
    <nav className="bg-white dark:bg-kavach-800 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="flex items-center space-x-2">
              <Shield className="h-8 w-8 text-kavach-600" />
              <span className="text-xl font-bold text-kavach-600 dark:text-white">Kavach</span>
            </Link>
          </div>
          
          {/* Desktop Navigation */}
          <div className="hidden md:flex md:items-center md:space-x-4">
            <Link to="/">
              <Button variant={isActive("/") ? "default" : "ghost"} size="sm">
                Home
              </Button>
            </Link>
            
            {/* Show Report Crime only to regular users */}
            {(!currentUser || userRole === UserRole.USER) && (
              <Link to={currentUser ? "/report" : "/auth"}>
                <Button variant={isActive("/report") ? "default" : "ghost"} size="sm">
                  <MapPin className="mr-1 h-4 w-4" />
                  Report Crime
                </Button>
              </Link>
            )}
            
            {/* Show Dashboard to all authenticated users */}
            {currentUser && (
              <Link to="/dashboard">
                <Button variant={isActive("/dashboard") ? "default" : "ghost"} size="sm">
                  <BarChart3 className="mr-1 h-4 w-4" />
                  Dashboard
                </Button>
              </Link>
            )}
            
            {/* Authentication */}
            {!currentUser && (
              <Link to="/auth">
                <Button variant="outline" size="sm">
                  <LogIn className="mr-1 h-4 w-4" />
                  Login
                </Button>
              </Link>
            )}
            
            {/* Show NavbarExtras if user is logged in */}
            {currentUser && (
              <NavbarExtras />
            )}
          </div>
          
          {/* Mobile Navigation Button */}
          <div className="flex md:hidden items-center">
            <Button variant="ghost" size="icon" onClick={toggleMenu}>
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </Button>
          </div>
        </div>
      </div>
      
      {/* Mobile Navigation Menu */}
      {isMenuOpen && (
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-white dark:bg-kavach-800">
            <Link to="/" onClick={toggleMenu}>
              <Button 
                variant={isActive("/") ? "default" : "ghost"}
                className="w-full justify-start"
              >
                Home
              </Button>
            </Link>
            
            {/* Show Report Crime only to regular users */}
            {(!currentUser || userRole === UserRole.USER) && (
              <Link to={currentUser ? "/report" : "/auth"} onClick={toggleMenu}>
                <Button 
                  variant={isActive("/report") ? "default" : "ghost"}
                  className="w-full justify-start"
                >
                  <MapPin className="mr-2 h-4 w-4" />
                  Report Crime
                </Button>
              </Link>
            )}
            
            {/* Show Dashboard to all authenticated users */}
            {currentUser && (
              <Link to="/dashboard" onClick={toggleMenu}>
                <Button 
                  variant={isActive("/dashboard") ? "default" : "ghost"}
                  className="w-full justify-start"
                >
                  <BarChart3 className="mr-2 h-4 w-4" />
                  Dashboard
                </Button>
              </Link>
            )}
            
            {/* Authentication */}
            {!currentUser ? (
              <Link to="/auth" onClick={toggleMenu}>
                <Button 
                  variant="outline"
                  className="w-full justify-start"
                >
                  <LogIn className="mr-2 h-4 w-4" />
                  Login
                </Button>
              </Link>
            ) : (
              <Button 
                variant="outline"
                className="w-full justify-start text-red-500"
                onClick={() => {
                  toggleMenu();
                  logoutUser();
                  navigate("/");
                }}
              >
                <LogOut className="mr-2 h-4 w-4" />
                Logout
              </Button>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
