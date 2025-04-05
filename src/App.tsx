
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { Toaster } from "@/components/ui/sonner";
import { AuthProvider, useAuth } from "@/contexts/AuthContext";
import { UserRole } from "@/utils/firebase";

// Import pages
import Index from "@/pages/Index";
import Dashboard from "@/pages/Dashboard";
import Report from "@/pages/Report";
import EmergencyReport from "@/pages/EmergencyReport";
import Auth from "@/pages/Auth";
import NotFound from "@/pages/NotFound";

// Protected route component
const ProtectedRoute = ({ children, allowedRoles }: { children: JSX.Element, allowedRoles: UserRole[] }) => {
  const { currentUser, userRole, loading } = useAuth();
  
  if (loading) {
    return <div className="flex items-center justify-center h-screen">Loading...</div>;
  }
  
  if (!currentUser || !allowedRoles.includes(userRole as UserRole)) {
    return <Navigate to="/auth" replace />;
  }
  
  return children;
};

function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Index />} />
      <Route 
        path="/dashboard" 
        element={
          <ProtectedRoute allowedRoles={[UserRole.USER, UserRole.ADMIN, UserRole.SUPERADMIN]}>
            <Dashboard />
          </ProtectedRoute>
        } 
      />
      <Route 
        path="/report" 
        element={
          <ProtectedRoute allowedRoles={[UserRole.USER]}>
            <Report />
          </ProtectedRoute>
        } 
      />
      <Route 
        path="/emergency" 
        element={<EmergencyReport />} 
      />
      <Route path="/auth" element={<Auth />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

function App() {
  return (
    <Router>
      <AuthProvider>
        <AppRoutes />
        <Toaster />
      </AuthProvider>
    </Router>
  );
}

export default App;
