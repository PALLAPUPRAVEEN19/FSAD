import React, { useState } from 'react';
import { Toaster } from 'sonner';
import { AuthProvider } from './context/authContext';
import { useAuth } from './hooks/useAuth';
import Login from './pages/auth/Login';
import Register from './pages/auth/Register';
import BrowseProfessionals from './pages/user/BrowseProfessionals';
import ServiceListing from './pages/professional/ServiceListing';
import TicketManagement from './pages/support/TicketManagement';
import AnalyticsDashboard from './pages/admin/AnalyticsDashboard';

const AppContent = () => {
  const { user } = useAuth();
  const [authMode, setAuthMode] = useState('login');

  if (!user) {
    return authMode === 'login' ? (
      <Login onToggle={() => setAuthMode('register')} />
    ) : (
      <Register onToggle={() => setAuthMode('login')} />
    );
  }

  // Route based on user role
  switch (user.role) {
    case 'professional':
      return <ServiceListing />;
    case 'support':
      return <TicketManagement />;
    case 'admin':
      return <AnalyticsDashboard />;
    default:
      return <BrowseProfessionals />;
  }
};

function App() {
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
        }}
        richColors
      />
    </AuthProvider>
  );
}

export default App;
