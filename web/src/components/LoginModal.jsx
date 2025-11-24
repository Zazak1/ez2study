import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Mail, Lock } from 'lucide-react';

const LoginModal = ({ isOpen, onClose, onSwitchToRegister }) => {
  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle login logic here
    console.log('Login submitted');
    setTimeout(() => onClose(), 1000);
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        />
        
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          className="relative w-full max-w-md bg-[#1a1a2e] border border-white/10 rounded-2xl p-8 shadow-2xl overflow-hidden"
        >
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-primary-500 to-secondary-500"></div>
          
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-2xl font-bold text-white">欢迎回来</h2>
            <button onClick={onClose} className="text-gray-400 hover:text-white transition-colors">
              <X size={24} />
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-300">邮箱地址</label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" size={20} />
                <input 
                  type="email" 
                  className="w-full bg-white/5 border border-white/10 rounded-lg py-3 pl-10 pr-4 text-white placeholder-gray-500 focus:outline-none focus:border-primary-500 focus:ring-1 focus:ring-primary-500 transition-all"
                  placeholder="your@email.com"
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex justify-between">
                <label className="text-sm font-medium text-gray-300">密码</label>
                <a href="#" className="text-sm text-primary-400 hover:text-primary-300">忘记密码？</a>
              </div>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" size={20} />
                <input 
                  type="password" 
                  className="w-full bg-white/5 border border-white/10 rounded-lg py-3 pl-10 pr-4 text-white placeholder-gray-500 focus:outline-none focus:border-primary-500 focus:ring-1 focus:ring-primary-500 transition-all"
                  placeholder="••••••••"
                  required
                />
              </div>
            </div>

            <button 
              type="submit"
              className="w-full py-3 px-4 bg-gradient-to-r from-primary-600 to-secondary-600 text-white font-bold rounded-lg hover:shadow-lg hover:shadow-primary-500/25 transition-all transform active:scale-[0.98]"
            >
              登录
            </button>
          </form>

          <div className="mt-8 text-center text-sm text-gray-400">
            还没有账户？
            <button 
              onClick={onSwitchToRegister}
              className="text-primary-400 hover:text-primary-300 font-medium ml-1"
            >
              立即注册
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};

export default LoginModal;

