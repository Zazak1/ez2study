import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Features from './components/Features';
import Footer from './components/Footer';
import LoginModal from './components/LoginModal';
import RegisterModal from './components/RegisterModal';

function App() {
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [isRegisterOpen, setIsRegisterOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate loading
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1500);
    return () => clearTimeout(timer);
  }, []);

  if (isLoading) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-dark-bg">
        <div className="text-center">
          <div className="w-20 h-20 mb-4 mx-auto animate-spin rounded-full border-4 border-primary-500 border-t-transparent"></div>
          <h2 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-primary-500 to-secondary-500">
            Ez2Study
          </h2>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col relative overflow-hidden">
      {/* Background Elements */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <div className="absolute top-0 left-0 w-full h-full bg-[url('/grid.svg')] opacity-[0.03]"></div>
        <div className="absolute top-20 left-20 w-96 h-96 bg-primary-500/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 right-20 w-96 h-96 bg-secondary-500/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
      </div>

      <Navbar 
        onLogin={() => setIsLoginOpen(true)} 
        onRegister={() => setIsRegisterOpen(true)} 
      />
      
      <main className="flex-grow relative z-10">
        <Hero onStart={() => setIsRegisterOpen(true)} />
        <Features />
      </main>

      <Footer />

      <LoginModal 
        isOpen={isLoginOpen} 
        onClose={() => setIsLoginOpen(false)} 
        onSwitchToRegister={() => {
          setIsLoginOpen(false);
          setIsRegisterOpen(true);
        }}
      />

      <RegisterModal 
        isOpen={isRegisterOpen} 
        onClose={() => setIsRegisterOpen(false)}
        onSwitchToLogin={() => {
          setIsRegisterOpen(false);
          setIsLoginOpen(true);
        }}
      />
    </div>
  );
}

export default App;

