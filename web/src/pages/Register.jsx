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
    <div className="min-h-screen flex items-center justify-center p-4 relative bg-light-bg">
      <div className="absolute top-8 left-8">
        <Link to="/" className="flex items-center gap-2 text-text-muted hover:text-primary-600 transition-colors text-sm font-medium">
          <ArrowLeft size={18} /> 返回首页
        </Link>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md bg-white border border-slate-100 rounded-2xl p-8 shadow-coze-lg"
      >
        <div className="flex justify-center mb-6 scale-75 origin-bottom">
          <AuthMascot mood={mascotMood} />
        </div>
        
        <div className="text-center mb-8">
          <h2 className="text-2xl font-bold text-text-main mb-2">创建账户</h2>
          <p className="text-text-muted text-sm">加入 Ez2Study，开启智能学习</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="space-y-1.5">
            <label className="text-sm font-medium text-text-main">用户名</label>
            <div className="relative group">
              <User className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
              <input 
                type="text" 
                onFocus={() => setMascotMood('focused')}
                onBlur={() => setMascotMood('idle')}
                className="w-full bg-slate-50 border border-slate-200 rounded-lg py-3 pl-10 pr-4 text-text-main placeholder-slate-400 focus:outline-none focus:border-primary-500 focus:bg-white focus:ring-1 focus:ring-primary-500 transition-all text-sm"
                placeholder="Username"
                required
              />
            </div>
          </div>

          <div className="space-y-1.5">
            <label className="text-sm font-medium text-text-main">邮箱地址</label>
            <div className="relative group">
              <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
              <input 
                type="email" 
                onFocus={() => setMascotMood('focused')}
                onBlur={() => setMascotMood('idle')}
                className="w-full bg-slate-50 border border-slate-200 rounded-lg py-3 pl-10 pr-4 text-text-main placeholder-slate-400 focus:outline-none focus:border-primary-500 focus:bg-white focus:ring-1 focus:ring-primary-500 transition-all text-sm"
                placeholder="your@email.com"
                required
              />
            </div>
          </div>

          <div className="space-y-1.5">
            <label className="text-sm font-medium text-text-main">密码</label>
            <div className="relative group">
              <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
              <input 
                type="password" 
                onFocus={() => setMascotMood('blind')}
                onBlur={() => setMascotMood('idle')}
                className="w-full bg-slate-50 border border-slate-200 rounded-lg py-3 pl-10 pr-4 text-text-main placeholder-slate-400 focus:outline-none focus:border-primary-500 focus:bg-white focus:ring-1 focus:ring-primary-500 transition-all text-sm"
                placeholder="••••••••"
                required
              />
            </div>
          </div>

          <button 
            type="submit"
            className="w-full py-3 px-4 bg-primary-500 text-white font-semibold rounded-lg shadow-md shadow-primary-500/20 hover:bg-primary-600 hover:shadow-primary-500/30 transition-all active:scale-[0.99]"
          >
            注册
          </button>
        </form>

        <div className="mt-8 text-center text-sm text-text-muted">
          已有账户？
          <Link 
            to="/login"
            className="text-primary-600 hover:text-primary-700 font-semibold ml-1 transition-colors"
          >
            立即登录
          </Link>
        </div>
      </motion.div>
    </div>
  );
};

export default Register;
