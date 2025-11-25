import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Mail, Lock, User, ArrowLeft, ArrowRight } from 'lucide-react';
import AuthMascot from '../components/AuthMascot';

const Auth = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [mascotMood, setMascotMood] = useState('idle');
  const navigate = useNavigate();

  const toggleMode = () => {
    setIsLogin(!isLogin);
    setMascotMood('idle');
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // For demo purposes
    navigate('/');
  };

  return (
    <div className="min-h-screen flex items-center justify-center relative p-4 bg-light-bg">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="w-full max-w-md relative z-10"
      >
        <button 
          onClick={() => navigate('/')}
          className="absolute -top-12 left-0 text-text-muted hover:text-primary-600 flex items-center gap-2 transition-colors text-sm font-medium"
        >
          <ArrowLeft size={16} /> 返回首页
        </button>

        <div className="bg-white border border-slate-100 rounded-2xl shadow-coze-lg overflow-hidden relative">
          <div className="p-8">
            <div className="flex justify-center mb-6">
               <div className="scale-75 origin-bottom">
                 <AuthMascot mood={mascotMood} />
               </div>
            </div>

            <div className="text-center mb-8">
              <h2 className="text-2xl font-bold text-text-main mb-2">
                {isLogin ? '欢迎回来' : '创建 Ez2Study 账号'}
              </h2>
              <p className="text-text-muted text-sm">
                {isLogin ? '登录以继续您的 AI 学习之旅' : '免费注册，开启智能学习新体验'}
              </p>
            </div>

            <form className="space-y-4" onSubmit={handleSubmit}>
              {!isLogin && (
                <motion.div 
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  className="space-y-2 overflow-hidden"
                >
                  <div className="relative group">
                    <User className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                    <input 
                      type="text" 
                      placeholder="用户名"
                      className="w-full bg-slate-50 border border-slate-200 rounded-lg py-3 pl-10 pr-4 text-text-main placeholder-slate-400 focus:outline-none focus:border-primary-500 focus:bg-white focus:ring-1 focus:ring-primary-500 transition-all text-sm"
                      onFocus={() => setMascotMood('focused')}
                      onBlur={() => setMascotMood('idle')}
                    />
                  </div>
                </motion.div>
              )}

              <div className="relative group">
                <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                <input 
                  type="email" 
                  placeholder="邮箱地址"
                  className="w-full bg-slate-50 border border-slate-200 rounded-lg py-3 pl-10 pr-4 text-text-main placeholder-slate-400 focus:outline-none focus:border-primary-500 focus:bg-white focus:ring-1 focus:ring-primary-500 transition-all text-sm"
                  onFocus={() => setMascotMood('focused')}
                  onBlur={() => setMascotMood('idle')}
                />
              </div>

              <div className="relative group">
                <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                <input 
                  type="password" 
                  placeholder="密码"
                  className="w-full bg-slate-50 border border-slate-200 rounded-lg py-3 pl-10 pr-4 text-text-main placeholder-slate-400 focus:outline-none focus:border-primary-500 focus:bg-white focus:ring-1 focus:ring-primary-500 transition-all text-sm"
                  onFocus={() => setMascotMood('blind')}
                  onBlur={() => setMascotMood('idle')}
                />
              </div>

              <button 
                type="submit"
                className="w-full py-3 bg-primary-500 text-white font-semibold rounded-lg shadow-md shadow-primary-500/20 hover:bg-primary-600 hover:shadow-primary-500/30 active:scale-[0.99] transition-all flex items-center justify-center gap-2"
              >
                {isLogin ? '立即登录' : '注册账户'}
                <ArrowRight size={18} />
              </button>
            </form>

            <div className="mt-6 text-center">
              <p className="text-text-muted text-xs">
                {isLogin ? '还没有账号？' : '已有账号？'}
                <button 
                  onClick={toggleMode}
                  className="ml-1 text-primary-600 hover:text-primary-700 font-semibold transition-colors"
                >
                  {isLogin ? '去注册' : '去登录'}
                </button>
              </p>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default Auth;
