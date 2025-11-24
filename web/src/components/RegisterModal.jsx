import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, User, Mail, Lock } from 'lucide-react';

const RegisterModal = ({ isOpen, onClose, onSwitchToLogin }) => {
  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle register logic here
    console.log('Register submitted');
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
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-secondary-500 to-primary-500"></div>
          
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-2xl font-bold text-white">创建账户</h2>
            <button onClick={onClose} className="text-gray-400 hover:text-white transition-colors">
              <X size={24} />
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-300">用户名</label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" size={20} />
                <input 
                  type="text" 
                  className="w-full bg-white/5 border border-white/10 rounded-lg py-3 pl-10 pr-4 text-white placeholder-gray-500 focus:outline-none focus:border-secondary-500 focus:ring-1 focus:ring-secondary-500 transition-all"
                  placeholder="Username"
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-300">邮箱地址</label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" size={20} />
                <input 
                  type="email" 
                  className="w-full bg-white/5 border border-white/10 rounded-lg py-3 pl-10 pr-4 text-white placeholder-gray-500 focus:outline-none focus:border-secondary-500 focus:ring-1 focus:ring-secondary-500 transition-all"
                  placeholder="your@email.com"
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-300">密码</label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" size={20} />
                <input 
                  type="password" 
                  className="w-full bg-white/5 border border-white/10 rounded-lg py-3 pl-10 pr-4 text-white placeholder-gray-500 focus:outline-none focus:border-secondary-500 focus:ring-1 focus:ring-secondary-500 transition-all"
                  placeholder="••••••••"
                  required
                />
              </div>
            </div>

            <div className="flex items-center gap-2 text-sm text-gray-400">
              <input type="checkbox" required className="rounded border-gray-600 bg-white/5 text-secondary-500 focus:ring-secondary-500" />
              <span>
                我同意 <a href="#" className="text-secondary-400 hover:underline">服务条款</a> 和 <a href="#" className="text-secondary-400 hover:underline">隐私政策</a>
              </span>
            </div>

            <button 
              type="submit"
              className="w-full py-3 px-4 bg-gradient-to-r from-secondary-600 to-primary-600 text-white font-bold rounded-lg hover:shadow-lg hover:shadow-secondary-500/25 transition-all transform active:scale-[0.98]"
            >
              注册
            </button>
          </form>

          <div className="mt-8 text-center text-sm text-gray-400">
            已有账户？
            <button 
              onClick={onSwitchToLogin}
              className="text-secondary-400 hover:text-secondary-300 font-medium ml-1"
            >
              立即登录
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};

export default RegisterModal;

