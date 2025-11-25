import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import MouseSpotlight from './components/MouseSpotlight';
import Home from './pages/Home';
import Auth from './pages/Auth';
import Login from './pages/Login';
import Register from './pages/Register';

const AppContent = () => {
  const location = useLocation();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 1500);
    return () => clearTimeout(timer);
  }, []);

  if (isLoading) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-light-bg">
        <div className="relative">
          <div className="w-24 h-24 rounded-full border-4 border-primary-200 border-t-primary-600 animate-spin"></div>
          <div className="absolute inset-0 flex items-center justify-center font-bold text-primary-600">EZ2</div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col relative overflow-x-hidden bg-light-bg text-text-main">
      <MouseSpotlight />
      
      {/* Global Background Elements - Adjusted for Light Theme */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <div className="absolute top-0 left-0 w-full h-full bg-[url('/grid.svg')] opacity-[0.03] invert"></div>
        <div className="absolute -top-40 -left-40 w-[600px] h-[600px] bg-primary-100/50 rounded-full blur-[120px] animate-pulse-slow mix-blend-multiply"></div>
        <div className="absolute top-1/2 right-0 w-[500px] h-[500px] bg-secondary-100/50 rounded-full blur-[100px] animate-pulse-slow delay-700 mix-blend-multiply"></div>
        <div className="absolute bottom-0 left-1/4 w-[400px] h-[400px] bg-accent-100/50 rounded-full blur-[80px] animate-pulse-slow delay-1000 mix-blend-multiply"></div>
      </div>

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/auth" element={<Auth />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </div>
  );
};

function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}

export default App;
