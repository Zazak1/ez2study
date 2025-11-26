import React from 'react';
import { motion } from 'framer-motion';
import { X, Mail } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';

const Login = () => {
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

        <div className="flex-1 flex flex-col justify-center px-4 md:px-12">
          <h2 className="text-3xl md:text-4xl font-bold text-text-main mb-8 md:mb-12 text-center">
            登录以探索更多
          </h2>

          <div className="space-y-4">
            <button className="w-full py-2.5 px-4 border border-slate-200 rounded-full flex items-center justify-center gap-3 text-text-main hover:bg-slate-50 transition-colors font-medium bg-white">
              <svg viewBox="0 0 24 24" className="w-5 h-5" fill="#07C160" aria-hidden="true">
                <path d="M8.691 2.188C3.891 2.188 0 5.476 0 9.53c0 2.212 1.17 4.203 3.002 5.55a.59.59 0 0 1 .213.665l-.39 1.48c-.019.07-.048.141-.048.213 0 .163.13.295.29.295a.326.326 0 0 0 .167-.054l1.903-1.114a.864.864 0 0 1 .717-.098 10.16 10.16 0 0 0 2.837.403c.276 0 .543-.027.811-.05-.857-2.578.157-4.972 1.932-6.446 1.703-1.415 3.882-1.98 5.853-1.838-.576-3.583-4.196-6.355-8.598-6.355zm-.705 12.693c-.235 0-.47-.027-.705-.054-2.478-.246-4.716-1.277-6.256-2.833C.44 11.33-.187 10.008.041 8.696.499 5.476 4.12 2.869 8.691 2.869c4.264 0 7.637 2.608 7.985 6.035-2.19-.443-4.882.27-6.715 2.307-1.765 1.465-2.785 3.859-1.932 6.446.157.489.391.95.664 1.375a9.738 9.738 0 0 1-1.897.069zm12.716 2.11h-1.749V15.87c0-.41-.332-.744-.744-.744s-.744.333-.744.744v1.121h-1.749c-.411 0-.744.333-.744.744s.333.744.744.744h1.749V19.26c0 .411.332.744.744.744s.744-.333.744-.744v-1.121h1.749c.411 0 .744-.333.744-.744s-.333-.744-.744-.744zm3.792.188c-1.785-.07-3.144-1.12-3.144-2.498 0-1.456 1.526-2.498 3.455-2.498 1.93 0 3.31 1.042 3.31 2.498 0 1.377-1.36 2.427-3.144 2.498zm.017-4.18c-1.134 0-2.01.543-2.01 1.682 0 1.042.742 1.682 1.876 1.682 1.133 0 2.01-.54 2.01-1.682 0-1.139-.742-1.682-1.876-1.682z" />
              </svg>
              使用微信登录
            </button>

            <button className="w-full py-2.5 px-4 border border-slate-200 rounded-full flex items-center justify-center gap-3 text-text-main hover:bg-slate-50 transition-colors font-medium bg-white">
              <Mail size={20} className="text-primary-500" />
              使用邮箱登录
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
