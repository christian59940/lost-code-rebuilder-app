
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/contexts/AuthContext";
import { AuthGuard } from "@/components/auth/AuthGuard";
import Index from "./pages/Index";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Automations from "./pages/Automations";
import Alerts from "./pages/Alerts";
import Sessions from "./pages/Sessions";
import StudentSessions from "./pages/StudentSessions";
import TrainerSessions from "./pages/TrainerSessions";
import TimeTracking from "./pages/TimeTracking";
import Users from "./pages/Users";
import Messages from "./pages/Messages";
import Participants from "./pages/Participants";
import Signature from "./pages/Signature";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signature/:sessionId" element={<Signature />} />
            <Route path="/dashboard" element={
              <AuthGuard>
                <Dashboard />
              </AuthGuard>
            } />
            <Route path="/automations" element={
              <AuthGuard>
                <Automations />
              </AuthGuard>
            } />
            <Route path="/alerts" element={
              <AuthGuard>
                <Alerts />
              </AuthGuard>
            } />
            <Route path="/sessions" element={
              <AuthGuard>
                <Sessions />
              </AuthGuard>
            } />
            <Route path="/student-sessions" element={
              <AuthGuard>
                <StudentSessions />
              </AuthGuard>
            } />
            <Route path="/trainer-sessions" element={
              <AuthGuard>
                <TrainerSessions />
              </AuthGuard>
            } />
            <Route path="/time-tracking" element={
              <AuthGuard>
                <TimeTracking />
              </AuthGuard>
            } />
            <Route path="/users" element={
              <AuthGuard>
                <Users />
              </AuthGuard>
            } />
            <Route path="/messages" element={
              <AuthGuard>
                <Messages />
              </AuthGuard>
            } />
            <Route path="/participants" element={
              <AuthGuard>
                <Participants />
              </AuthGuard>
            } />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;
