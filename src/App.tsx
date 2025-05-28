
import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { AuthProvider } from './contexts/AuthContext';
import { SidebarProvider } from '@/components/ui/sidebar';
import { AuthGuard } from './components/auth/AuthGuard';
import Index from './pages/Index';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import Users from './pages/Users';
import Sessions from './pages/Sessions';
import Profile from './pages/Profile';
import Signature from './pages/Signature';
import NotFound from './pages/NotFound';
import Messages from './pages/Messages';
import Alerts from './pages/Alerts';
import Automations from './pages/Automations';
import { Toaster } from '@/components/ui/toaster';
import Trainers from './pages/Trainers';
import Participants from './pages/Participants';
import TimeTracking from './pages/TimeTracking';
import TrainerSessions from './pages/TrainerSessions';
import StudentSessions from './pages/StudentSessions';
import TrainingCatalog from './pages/TrainingCatalog';

function App() {
  const queryClient = new QueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <AuthProvider>
          <SidebarProvider>
            <div className="min-h-screen flex w-full bg-gray-50">
              <Routes>
                <Route path="/" element={<Index />} />
                <Route path="/login" element={<Login />} />
                <Route path="/dashboard" element={
                  <AuthGuard>
                    <Dashboard />
                  </AuthGuard>
                } />
                <Route path="/users" element={
                  <AuthGuard allowedRoles={['admin', 'gestionnaire_administratif']}>
                    <Users />
                  </AuthGuard>
                } />
                <Route path="/sessions" element={
                  <AuthGuard allowedRoles={['admin', 'gestionnaire_administratif']}>
                    <Sessions />
                  </AuthGuard>
                } />
                <Route path="/training-catalog" element={
                  <AuthGuard allowedRoles={['admin', 'gestionnaire_administratif']}>
                    <TrainingCatalog />
                  </AuthGuard>
                } />
                <Route path="/trainer-sessions" element={
                  <AuthGuard allowedRoles={['formateur']}>
                    <TrainerSessions />
                  </AuthGuard>
                } />
                <Route path="/student-sessions" element={
                  <AuthGuard allowedRoles={['apprenant']}>
                    <StudentSessions />
                  </AuthGuard>
                } />
                <Route path="/trainers" element={
                  <AuthGuard allowedRoles={['admin', 'gestionnaire_administratif']}>
                    <Trainers />
                  </AuthGuard>
                } />
                <Route path="/participants" element={
                  <AuthGuard allowedRoles={['admin', 'gestionnaire_administratif']}>
                    <Participants />
                  </AuthGuard>
                } />
                <Route path="/time-tracking" element={
                  <AuthGuard allowedRoles={['admin', 'formateur']}>
                    <TimeTracking />
                  </AuthGuard>
                } />
                <Route path="/automations" element={
                  <AuthGuard allowedRoles={['admin', 'gestionnaire_administratif']}>
                    <Automations />
                  </AuthGuard>
                } />
                <Route path="/messages" element={
                  <AuthGuard allowedRoles={['admin', 'gestionnaire_administratif']}>
                    <Messages />
                  </AuthGuard>
                } />
                <Route path="/alerts" element={
                  <AuthGuard allowedRoles={['admin', 'gestionnaire_administratif']}>
                    <Alerts />
                  </AuthGuard>
                } />
                <Route path="/profile" element={
                  <AuthGuard>
                    <Profile />
                  </AuthGuard>
                } />
                <Route path="/signature/:sessionId" element={<Signature />} />
                <Route path="*" element={<NotFound />} />
              </Routes>
              <Toaster />
            </div>
          </SidebarProvider>
        </AuthProvider>
      </BrowserRouter>
    </QueryClientProvider>
  );
}

export default App;
