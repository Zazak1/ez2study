import React, { useState, useEffect } from 'react';
import { Menu, X, GraduationCap } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const Navbar = ({ onLogin, onRegister }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav 
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
        isScrolled ? 'bg-dark-bg/90 backdrop-blur-md border-b border-white/10 py-4' : 'bg-transparent py-6'
      }`}
    >
      <div className="container mx-auto px-6 flex items-center justify-between">
        <div className="flex items-center gap-2 cursor-pointer">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary-500 to-secondary-500 flex items-center justify-center text-white shadow-lg shadow-primary-500/30">
            <GraduationCap size={24} />
          </div>
          <span className="text-2xl font-bold text-white tracking-tight">Ez2Study</span>
        </div>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-8">
          <a href="#features" className="text-gray-300 hover:text-white transition-colors text-sm font-medium">功能特色</a>
          <a href="#about" className="text-gray-300 hover:text-white transition-colors text-sm font-medium">关于我们</a>
          <a href="#contact" className="text-gray-300 hover:text-white transition-colors text-sm font-medium">联系我们</a>
        </div>

        <div className="hidden md:flex items-center gap-4">
          <button 
            onClick={onLogin}
            className="px-5 py-2 rounded-lg text-sm font-medium text-gray-300 border border-white/20 hover:bg-white/5 hover:text-white transition-all"
          >
            登录
          </button>
          <button 
            onClick={onRegister}
            className="px-5 py-2 rounded-lg text-sm font-medium text-white bg-gradient-to-r from-primary-600 to-secondary-600 hover:shadow-lg hover:shadow-primary-500/25 hover:-translate-y-0.5 transition-all"
          >
            注册
          </button>
        </div>

        {/* Mobile Menu Button */}
        <button 
          className="md:hidden text-white p-2"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? <X /> : <Menu />}
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-dark-bg/95 backdrop-blur-xl border-b border-white/10 overflow-hidden"
          >
            <div className="flex flex-col p-6 gap-4">
              <a href="#features" className="text-gray-300 hover:text-white py-2">功能特色</a>
              <a href="#about" className="text-gray-300 hover:text-white py-2">关于我们</a>
              <a href="#contact" className="text-gray-300 hover:text-white py-2">联系我们</a>
              <div className="h-px bg-white/10 my-2"></div>
              <button 
                onClick={() => { onLogin(); setIsMobileMenuOpen(false); }}
                className="w-full py-3 rounded-lg text-center text-gray-300 border border-white/20"
              >
                登录
              </button>
              <button 
                onClick={() => { onRegister(); setIsMobileMenuOpen(false); }}
                className="w-full py-3 rounded-lg text-center text-white bg-gradient-to-r from-primary-600 to-secondary-600"
              >
                注册
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;

