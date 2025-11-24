import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Menu, X, GraduationCap } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navigateToAuth = () => {
    navigate('/auth');
    setIsMobileMenuOpen(false);
  };

  return (
    <nav 
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
        isScrolled ? 'bg-white/80 backdrop-blur-xl border-b border-slate-200/60 py-4 shadow-sm' : 'bg-transparent py-6'
      }`}
    >
      <div className="container mx-auto px-6 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-3 group">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary-500 to-secondary-500 flex items-center justify-center text-white shadow-lg shadow-primary-500/20 group-hover:scale-110 transition-transform duration-300">
            <GraduationCap size={24} />
          </div>
          <span className="text-2xl font-bold text-text-main tracking-tight group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-primary-600 group-hover:to-secondary-600 transition-all">
            Ez2Study
          </span>
        </Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-8">
          {['功能特色', '关于我们', '联系我们'].map((item, i) => (
            <a 
              key={i} 
              href={`#${['features', 'about', 'contact'][i]}`} 
              className="text-text-muted hover:text-primary-600 transition-colors text-sm font-medium relative after:content-[''] after:absolute after:-bottom-1 after:left-0 after:w-0 after:h-0.5 after:bg-primary-500 after:transition-all hover:after:w-full"
            >
              {item}
            </a>
          ))}
        </div>

        <div className="hidden md:flex items-center gap-4">
          <button 
            onClick={navigateToAuth}
            className="px-6 py-2.5 rounded-xl text-sm font-bold text-text-muted hover:text-primary-600 hover:bg-slate-50 transition-all"
          >
            登录
          </button>
          <button 
            onClick={navigateToAuth}
            className="px-6 py-2.5 rounded-xl text-sm font-bold text-white bg-gradient-to-r from-primary-600 to-secondary-500 hover:shadow-lg hover:shadow-primary-500/30 hover:-translate-y-0.5 transition-all"
          >
            免费注册
          </button>
        </div>

        {/* Mobile Menu Button */}
        <button 
          className="md:hidden text-text-main p-2"
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
            className="md:hidden bg-white/95 backdrop-blur-xl border-b border-slate-200 overflow-hidden shadow-lg"
          >
            <div className="flex flex-col p-6 gap-4">
              <a href="#features" className="text-text-muted hover:text-primary-600 py-2 font-medium">功能特色</a>
              <a href="#about" className="text-text-muted hover:text-primary-600 py-2 font-medium">关于我们</a>
              <a href="#contact" className="text-text-muted hover:text-primary-600 py-2 font-medium">联系我们</a>
              <div className="h-px bg-slate-100 my-2"></div>
              <button 
                onClick={navigateToAuth}
                className="w-full py-3 rounded-xl text-center text-text-main border border-slate-200 font-bold hover:bg-slate-50"
              >
                登录
              </button>
              <button 
                onClick={navigateToAuth}
                className="w-full py-3 rounded-xl text-center text-white bg-gradient-to-r from-primary-600 to-secondary-500 font-bold shadow-md"
              >
                立即开始
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;
