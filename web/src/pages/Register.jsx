import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { User, Mail, Lock, ArrowLeft } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import AuthMascot from '../components/AuthMascot';

const Register = () => {
  const [mascotMood, setMascotMood] = useState('idle');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    navigate('/login');
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 relative z-10">
      <div className="absolute top-8 left-8">
        <Link to="/" className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors">
          <ArrowLeft size={20} /> 返回首页
        </Link>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md bg-white/5 backdrop-blur-2xl border border-white/10 rounded-3xl p-8 shadow-2xl shadow-vibrant-cyan/20"
      >
        <AuthMascot mood={mascotMood} />
        
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-white mb-2">创建账户</h2>
          <p className="text-gray-400">加入 Ez2Study，开启智能学习</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-300">用户名</label>
            <div className="relative group">
              <User className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 group-focus-within:text-vibrant-yellow transition-colors" size={20} />
              <input 
                type="text" 
                onFocus={() => setMascotMood('focused')}
                onBlur={() => setMascotMood('idle')}
                className="w-full bg-white/5 border border-white/10 rounded-xl py-3 pl-10 pr-4 text-white placeholder-gray-500 focus:outline-none focus:border-vibrant-yellow focus:ring-1 focus:ring-vibrant-yellow transition-all"
                placeholder="Username"
                required
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-300">邮箱地址</label>
            <div className="relative group">
              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 group-focus-within:text-vibrant-cyan transition-colors" size={20} />
              <input 
                type="email" 
                onFocus={() => setMascotMood('focused')}
                onBlur={() => setMascotMood('idle')}
                className="w-full bg-white/5 border border-white/10 rounded-xl py-3 pl-10 pr-4 text-white placeholder-gray-500 focus:outline-none focus:border-vibrant-cyan focus:ring-1 focus:ring-vibrant-cyan transition-all"
                placeholder="your@email.com"
                required
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-300">密码</label>
            <div className="relative group">
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 group-focus-within:text-vibrant-purple transition-colors" size={20} />
              <input 
                type="password" 
                onFocus={() => setMascotMood('blind')}
                onBlur={() => setMascotMood('idle')}
                className="w-full bg-white/5 border border-white/10 rounded-xl py-3 pl-10 pr-4 text-white placeholder-gray-500 focus:outline-none focus:border-vibrant-purple focus:ring-1 focus:ring-vibrant-purple transition-all"
                placeholder="••••••••"
                required
              />
            </div>
          </div>

          <button 
            type="submit"
            className="w-full py-3 px-4 bg-gradient-to-r from-vibrant-cyan to-vibrant-purple text-white font-bold rounded-xl hover:shadow-lg hover:shadow-vibrant-cyan/30 transition-all transform hover:scale-[1.02] active:scale-[0.98]"
          >
            注册
          </button>
        </form>

        <div className="mt-8 text-center text-sm text-gray-400">
          已有账户？
          <Link 
            to="/login"
            className="text-vibrant-pink hover:text-white font-medium ml-1 transition-colors"
          >
            立即登录
          </Link>
        </div>
      </motion.div>
    </div>
  );
};

export default Register;

