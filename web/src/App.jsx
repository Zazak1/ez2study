import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import MouseSpotlight from './components/MouseSpotlight';
import Home from './pages/Home';
import Auth from './pages/Auth';
import Login from './pages/Login';
import Register from './pages/Register';

const CozeLoader = () => (
  <div className="fixed inset-0 z-50 bg-light-bg flex items-center justify-center">
    <div className="global-spin-wrapper">
      <svg viewBox="0 0 36 36" version="1.1" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" data-icon="spin">
        <defs>
          <linearGradient x1="0%" y1="100%" x2="100%" y2="100%" id="linearGradient-17">
            <stop stopColor="currentColor" stopOpacity="0" offset="0%"></stop>
            <stop stopColor="currentColor" stopOpacity="0.50" offset="39.9430698%"></stop>
            <stop stopColor="currentColor" offset="100%"></stop>
          </linearGradient>
        </defs>
        <g stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
          <rect fillOpacity="0.01" fill="none" x="0" y="0" width="36" height="36"></rect>
          <path d="M34,18 C34,9.163444 26.836556,2 18,2 C11.6597233,2 6.18078805,5.68784135 3.59122325,11.0354951" stroke="url(#linearGradient-17)" strokeWidth="4" strokeLinecap="round"></path>
        </g>
      </svg>
    </div>
  </div>
);

const AppContent = () => {
  const location = useLocation();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate initial load time
    const timer = setTimeout(() => setIsLoading(false), 1200);
    return () => clearTimeout(timer);
  }, []);

  if (isLoading) {
    return <CozeLoader />;
  }

  return (
    <div className="min-h-screen flex flex-col relative overflow-x-hidden bg-light-bg text-text-main selection:bg-primary-100 selection:text-primary-900 font-sans">
      {/* Coze-like subtle background */}
      <div className="fixed inset-0 z-0 pointer-events-none bg-[#f7f8fa]">
        {/* Very subtle gradients, less intrusive than before */}
        <div className="absolute top-[-20%] left-[-10%] w-[60%] h-[60%] bg-primary-50/60 rounded-full blur-[120px] mix-blend-multiply animate-pulse-slow"></div>
        <div className="absolute bottom-[-20%] right-[-10%] w-[60%] h-[60%] bg-blue-50/60 rounded-full blur-[120px] mix-blend-multiply animate-pulse-slow delay-1000"></div>
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
