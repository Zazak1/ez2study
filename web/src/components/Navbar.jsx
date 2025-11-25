import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Menu, X, GraduationCap, ChevronDown } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-200 ${
        isScrolled 
          ? 'bg-white/80 backdrop-blur-md border-b border-coze-border shadow-sm' 
          : 'bg-transparent'
      }`}
    >
      <div className="container mx-auto px-4 md:px-6 h-16 flex items-center justify-between">
        {/* Logo Area */}
        <Link to="/" className="flex items-center gap-2 group select-none">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-coze-primary to-coze-secondary flex items-center justify-center text-white shadow-lg shadow-coze-primary/20 transition-transform duration-300 group-hover:scale-105">
            <GraduationCap size={18} />
          </div>
          <span className="text-xl font-bold text-coze-text-main tracking-tight font-sans">
            Ez2Study
          </span>
        </Link>

        {/* Desktop Menu - Coze Style */}
        <div className="hidden md:flex items-center gap-1">
          {['产品功能', '解决方案', '资源中心', '定价'].map((item, i) => (
            <button 
              key={i}
              className="px-4 py-2 text-[14px] font-medium text-coze-text-main hover:bg-gray-100/50 hover:text-coze-primary rounded-lg transition-all flex items-center gap-1 group"
            >
              {item}
              {['产品功能', '资源中心'].includes(item) && (
                <ChevronDown size={14} className="text-gray-400 group-hover:text-coze-primary transition-colors" />
              )}
            </button>
          ))}
        </div>

        {/* Action Buttons */}
        <div className="hidden md:flex items-center gap-3">
          <button 
            onClick={() => navigate('/login')}
            className="px-5 py-2 rounded-lg text-[14px] font-medium text-coze-text-main hover:text-coze-primary hover:bg-gray-50 transition-all"
          >
            登录
          </button>
          <button 
            onClick={() => navigate('/register')}
            className="btn-primary text-[14px]"
          >
            免费注册
          </button>
        </div>

        {/* Mobile Menu Button */}
        <button 
          className="md:hidden text-coze-text-main p-2 hover:bg-gray-50 rounded-lg transition-colors"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-white border-b border-coze-border overflow-hidden"
          >
            <div className="flex flex-col p-4 gap-2">
              {['产品功能', '解决方案', '资源中心', '定价'].map((item, i) => (
                <a 
                  key={i}
                  href="#"
                  className="px-4 py-3 rounded-lg text-coze-text-main hover:bg-gray-50 font-medium transition-colors"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {item}
                </a>
              ))}
              <div className="h-px bg-gray-100 my-2"></div>
              <div className="grid grid-cols-2 gap-3 p-2">
                <button 
                  onClick={() => { navigate('/login'); setIsMobileMenuOpen(false); }}
                  className="py-2.5 rounded-lg text-center text-coze-text-main border border-coze-border font-medium hover:bg-gray-50 transition-colors"
                >
                  登录
                </button>
                <button 
                  onClick={() => { navigate('/register'); setIsMobileMenuOpen(false); }}
                  className="py-2.5 rounded-lg text-center text-white bg-coze-primary hover:bg-coze-secondary font-medium shadow-md transition-colors"
                >
                  注册
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;
