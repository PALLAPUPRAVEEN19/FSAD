import React from 'react';
import { Toaster } from 'sonner';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import { AuthPage } from './components/auth/AuthPage';
import { UserDashboard } from './components/dashboards/UserDashboard';
import { ProfessionalDashboard } from './components/dashboards/ProfessionalDashboard';
import { SupportDashboard } from './components/dashboards/SupportDashboard';
import { AdminDashboard } from './components/dashboards/AdminDashboard';

const AppContent = () => {
  const { user } = useAuth();

  if (!user) {
    return <AuthPage />;
  }

  switch (user.role) {
    case 'professional':
      return <ProfessionalDashboard />;
    case 'support':
      return <SupportDashboard />;
    case 'admin':
      return <AdminDashboard />;
    default:
      return <UserDashboard />;
  }
};

export default function App() {
  return (
    <AuthProvider>
      <AppContent />
      <Toaster
        position="top-right"
        toastOptions={{
          style: {
            background: 'white',
            border: '2px solid #e2e8f0',
            borderRadius: '16px',
            fontWeight: '600',
            fontSize: '14px'
          },
          className: 'sonner-toast',
        }}
        richColors
      />
    </AuthProvider>
  );
}