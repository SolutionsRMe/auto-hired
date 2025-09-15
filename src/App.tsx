import React, { Suspense, lazy } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';

// Lazy load pages for better performance
const Dashboard = lazy(() => import('@/pages/Dashboard'));
const Upgrade = lazy(() => import('@/pages/Upgrade'));
const BillingPage = lazy(() => import('@/pages/BillingPage'));

// Loading component for suspense fallback
const LoadingFallback = () => (
  <div className="min-h-screen flex items-center justify-center">
    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
  </div>
);

// Protected route component
const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  // In a real app, you would check if the user is authenticated
  const isAuthenticated = true; // Replace with actual auth check
  
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }
  
  return <>{children}</>;
};

export default function App() {
  return (
    <Router>
      <Suspense fallback={<LoadingFallback />}>
        <Routes>
          <Route path="/" element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          } />
          
          <Route path="/billing" element={
            <ProtectedRoute>
              <BillingPage />
            </ProtectedRoute>
          } />
          
          <Route path="/upgrade" element={
            <ProtectedRoute>
              <Upgrade />
            </ProtectedRoute>
          } />
          
          {/* Add more routes here */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
        
        {/* Global toast notifications */}
        <Toaster 
          position="top-center"
          toastOptions={{
            duration: 5000,
            style: {
              background: '#363636',
              color: '#fff',
            },
            success: {
              duration: 3000,
              iconTheme: {
                primary: '#10B981',
                secondary: 'white',
              },
            },
            error: {
              duration: 4000,
              iconTheme: {
                primary: '#EF4444',
                secondary: 'white',
              },
            },
          }}
        />
      </Suspense>
    </Router>
  );
}
