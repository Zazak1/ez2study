import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { X } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import AuthMascot from '../components/AuthMascot';

const Login = () => {
  const [mascotMood, setMascotMood] = useState('idle');
  const [step, setStep] = useState(1); // 1: Email, 2: Password (simulating X flow if needed, but keeping simple for now)
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    navigate('/');
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 relative bg-light-bg/50 backdrop-blur-sm">
      {/* Background overlay/modal effect */}
      <div className="absolute inset-0 bg-white/30" />

      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="w-full max-w-[600px] bg-white rounded-3xl p-8 md:p-12 shadow-coze-lg relative z-10 flex flex-col md:min-h-[600px] justify-between"
      >
        {/* Top Bar */}
        <div className="absolute top-4 left-4">
          <Link to="/" className="p-2 rounded-full hover:bg-slate-100 transition-colors inline-block">
            <X size={24} className="text-text-main" />
          </Link>
        </div>

        <div className="flex justify-center mb-4">
           <div className="scale-75">
             <AuthMascot mood={mascotMood} />
           </div>
        </div>

        <div className="flex-1 flex flex-col justify-center px-4 md:px-12">
          <h2 className="text-3xl md:text-4xl font-bold text-text-main mb-8 md:mb-12 text-center">
            登录以探索更多
          </h2>

          <div className="space-y-4">
            <button className="w-full py-2.5 px-4 border border-slate-200 rounded-full flex items-center justify-center gap-3 text-text-main hover:bg-slate-50 transition-colors font-medium bg-white">
              <svg viewBox="0 0 24 24" className="w-5 h-5" aria-hidden="true">
                <path
                  d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                  fill="#4285F4"
                />
                <path
                  d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                  fill="#34A853"
                />
                <path
                  d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                  fill="#FBBC05"
                />
                <path
                  d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                  fill="#EA4335"
                />
              </svg>
              使用 Google 登录
            </button>

            <button className="w-full py-2.5 px-4 border border-slate-200 rounded-full flex items-center justify-center gap-3 text-text-main hover:bg-slate-50 transition-colors font-bold bg-white">
              <svg viewBox="0 0 24 24" className="w-5 h-5" fill="currentColor">
                <path d="M17.05 20.28c-.98.95-2.05.88-3.08.4-.68-.3-1.42-.55-2.12-.55-.8 0-1.62.3-2.32.6-.95.4-1.9.5-2.88-.5C3.9 17.5.85 11.95 2.7 8.3c1.05-2.05 3.1-3.1 5.15-3.1 1.15.05 2.15.55 2.85.55.7 0 1.75-.55 3.1-.55 1.25 0 2.45.5 3.2 1.05-2.8 1.55-2.35 5.7 1 7.05-.65 1.85-1.5 3.75-2.7 5.05-.6.65-1.25 1.25-1.95 1.95h-.3zM13.05 3.35c.6-1.7 2.25-2.85 3.9-2.95.1 1.65-1.15 3.3-2.55 3.95-.85.45-2.35.25-2.85-.2-.15-.15-.2-.3-.2-.5 0-1.15.55-2.3 1.7-2.8h-.05z" />
              </svg>
              使用 Apple 登录
            </button>
          </div>

          <div className="relative my-8 flex items-center justify-center">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-slate-200"></div>
            </div>
            <span className="relative bg-white px-4 text-sm text-text-muted">或</span>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="group relative">
              <input
                type="email"
                onFocus={() => setMascotMood('focused')}
                onBlur={() => setMascotMood('idle')}
                className="peer w-full pt-6 pb-2 px-4 border border-slate-200 rounded-lg bg-white text-text-main focus:outline-none focus:border-primary-500 focus:ring-1 focus:ring-primary-500 transition-all placeholder-transparent"
                placeholder="邮箱"
                id="email"
                required
              />
              <label
                htmlFor="email"
                className="absolute left-4 top-4 text-slate-500 text-base transition-all peer-placeholder-shown:top-4 peer-placeholder-shown:text-base peer-focus:top-1.5 peer-focus:text-xs peer-focus:text-primary-500 peer-[:not(:placeholder-shown)]:top-1.5 peer-[:not(:placeholder-shown)]:text-xs"
              >
                手机号、邮箱或用户名
              </label>
            </div>

            <div className="group relative">
              <input
                type="password"
                onFocus={() => setMascotMood('blind')}
                onBlur={() => setMascotMood('idle')}
                className="peer w-full pt-6 pb-2 px-4 border border-slate-200 rounded-lg bg-white text-text-main focus:outline-none focus:border-primary-500 focus:ring-1 focus:ring-primary-500 transition-all placeholder-transparent"
                placeholder="密码"
                id="password"
                required
              />
              <label
                htmlFor="password"
                className="absolute left-4 top-4 text-slate-500 text-base transition-all peer-placeholder-shown:top-4 peer-placeholder-shown:text-base peer-focus:top-1.5 peer-focus:text-xs peer-focus:text-primary-500 peer-[:not(:placeholder-shown)]:top-1.5 peer-[:not(:placeholder-shown)]:text-xs"
              >
                密码
              </label>
            </div>

            <button
              type="submit"
              className="w-full py-3 px-4 bg-text-main text-white font-bold rounded-full hover:bg-black/90 transition-all shadow-lg active:scale-[0.98]"
            >
              下一步
            </button>

            <button
              type="button"
              className="w-full py-3 px-4 bg-white border border-slate-200 text-text-main font-bold rounded-full hover:bg-slate-50 transition-all active:scale-[0.98]"
            >
              忘记密码？
            </button>
          </form>

          <div className="mt-12 text-sm text-text-muted">
            还没有账号？
            <Link
              to="/register"
              className="text-primary-600 hover:text-primary-700 hover:underline ml-1"
            >
              注册
            </Link>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default Login;
