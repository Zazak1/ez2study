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

  return (
    <div className="min-h-screen flex items-center justify-center relative p-4">
      {/* Auth page specific background tweaks handled globally or here if needed */}
      
      <motion.div 
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md relative z-10"
      >
        {/* Back Button */}
        <button 
          onClick={() => navigate('/')}
          className="absolute -top-12 left-0 text-slate-500 hover:text-primary-600 flex items-center gap-2 transition-colors font-medium"
        >
          <ArrowLeft size={20} /> 返回首页
        </button>

        <div className="bg-white/80 backdrop-blur-2xl border border-white/60 rounded-[2rem] shadow-pearl-lg overflow-hidden relative">
          
          {/* Top Decoration */}
          <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-secondary-400 via-primary-500 to-accent-500"></div>

          <div className="p-8 pt-12">
            {/* Mascot Area */}
            <div className="mb-6 -mt-4">
              <AuthMascot mood={mascotMood} />
            </div>

            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold text-slate-800 mb-2">
                {isLogin ? '欢迎回来' : '加入我们'}
              </h2>
              <p className="text-slate-500 text-sm">
                {isLogin ? '准备好继续学习了吗？' : '开启你的 AI 学习之旅'}
              </p>
            </div>

            <form className="space-y-5">
              {!isLogin && (
                <motion.div 
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  className="space-y-2"
                >
                  <div className="relative group">
                    <User className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-primary-500 transition-colors" size={20} />
                    <input 
                      type="text" 
                      placeholder="用户名"
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl py-3.5 pl-12 pr-4 text-slate-800 placeholder-slate-400 focus:outline-none focus:border-primary-500 focus:bg-white focus:ring-2 focus:ring-primary-100 transition-all"
                      onFocus={() => setMascotMood('focused')}
                      onBlur={() => setMascotMood('idle')}
                    />
                  </div>
                </motion.div>
              )}

              <div className="relative group">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-primary-500 transition-colors" size={20} />
                <input 
                  type="email" 
                  placeholder="邮箱地址"
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl py-3.5 pl-12 pr-4 text-slate-800 placeholder-slate-400 focus:outline-none focus:border-primary-500 focus:bg-white focus:ring-2 focus:ring-primary-100 transition-all"
                  onFocus={() => setMascotMood('focused')}
                  onBlur={() => setMascotMood('idle')}
                />
              </div>

              <div className="relative group">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-accent-500 transition-colors" size={20} />
                <input 
                  type="password" 
                  placeholder="密码"
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl py-3.5 pl-12 pr-4 text-slate-800 placeholder-slate-400 focus:outline-none focus:border-accent-500 focus:bg-white focus:ring-2 focus:ring-accent-100 transition-all"
                  onFocus={() => setMascotMood('blind')}
                  onBlur={() => setMascotMood('idle')}
                />
              </div>

              <button 
                className="w-full py-4 bg-gradient-to-r from-secondary-500 via-primary-500 to-accent-500 text-white font-bold rounded-xl shadow-lg shadow-primary-500/20 hover:shadow-primary-500/40 hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center gap-2 group"
              >
                {isLogin ? '立即登录' : '创建账户'}
                <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
              </button>
            </form>

            <div className="mt-8 text-center">
              <p className="text-slate-400 text-sm">
                {isLogin ? '还没有账号？' : '已有账号？'}
                <button 
                  onClick={toggleMode}
                  className="ml-2 text-primary-600 hover:text-primary-500 font-bold transition-colors"
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
