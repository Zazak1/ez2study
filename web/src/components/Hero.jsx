import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Camera, Cpu, Play } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Hero = () => {
  const navigate = useNavigate();

  return (
    <section className="relative min-h-screen flex items-center pt-20 overflow-hidden">
      <div className="container mx-auto px-6 relative z-10">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          
          {/* Text Content */}
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white border border-primary-100 mb-8 shadow-sm">
              <span className="w-2 h-2 rounded-full bg-accent-500 animate-pulse"></span>
              <span className="text-sm font-medium text-primary-600">AI 学习新时代已来临</span>
            </div>

            <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight leading-tight mb-8 text-text-main">
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-600 via-secondary-500 to-accent-500 animate-pulse-slow">
                AI智能学习
              </span>
              <br />
              <span className="text-slate-800">视频生成平台</span>
            </h1>
            
            <p className="text-xl text-text-muted mb-10 leading-relaxed max-w-lg">
              拍摄题目，即刻生成定制化学习视频。突破传统教育工具局限，开启智能学习新时代。
            </p>
            
            <div className="flex flex-wrap gap-4">
              <button 
                onClick={() => navigate('/auth')}
                className="group relative px-8 py-4 bg-primary-600 text-white font-bold rounded-2xl overflow-hidden transition-all hover:scale-105 active:scale-95 shadow-xl shadow-primary-500/30"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-primary-500 via-secondary-500 to-accent-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <span className="relative flex items-center gap-2 transition-colors">
                  立即体验 <ArrowRight size={20} />
                </span>
              </button>
              
              <button className="px-8 py-4 text-text-main bg-white border border-slate-200 rounded-2xl font-medium hover:bg-slate-50 hover:border-primary-200 transition-all shadow-sm hover:shadow-md">
                了解更多
              </button>
            </div>

            <div className="mt-12 flex items-center gap-8 text-text-muted font-medium">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-secondary-500"></div>
                <span>实时生成</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-primary-500"></div>
                <span>准确率 99%</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-accent-500"></div>
                <span>个性化推荐</span>
              </div>
            </div>
          </motion.div>

          {/* Visual Content */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative"
          >
            <div className="relative z-10 bg-white/80 backdrop-blur-2xl border border-white/60 rounded-[2.5rem] p-8 shadow-pearl-lg">
              {/* Card Pearl Glow Effect */}
              <div className="absolute inset-0 rounded-[2.5rem] bg-gradient-to-br from-white via-white/50 to-white/20 opacity-80 -z-10"></div>

              <div className="flex items-center justify-between mb-8 pb-4 border-b border-slate-100">
                <div className="flex gap-2">
                  <div className="w-3 h-3 rounded-full bg-red-400 shadow-sm"></div>
                  <div className="w-3 h-3 rounded-full bg-amber-400 shadow-sm"></div>
                  <div className="w-3 h-3 rounded-full bg-green-400 shadow-sm"></div>
                </div>
                <div className="text-primary-400 text-sm font-mono animate-pulse font-medium">AI Processing...</div>
              </div>
              
              <div className="flex items-center justify-between gap-4">
                <StepCard icon={<Camera size={24} />} title="拍摄题目" active color="text-secondary-500" bg="bg-secondary-50" />
                <Arrow />
                <StepCard icon={<Cpu size={24} />} title="AI分析" color="text-primary-500" bg="bg-primary-50" />
                <Arrow />
                <StepCard icon={<Play size={24} />} title="生成视频" color="text-accent-500" bg="bg-accent-50" />
              </div>

              {/* Simulated Video Player UI */}
              <div className="mt-8 bg-slate-900 rounded-2xl aspect-video flex items-center justify-center border border-slate-800 group cursor-pointer overflow-hidden relative shadow-2xl">
                <div className="absolute inset-0 bg-gradient-to-br from-primary-900/40 via-accent-900/20 to-secondary-900/40 opacity-60 group-hover:opacity-80 transition-opacity"></div>
                
                {/* Play Button with Glow */}
                <div className="w-20 h-20 bg-white/10 rounded-full flex items-center justify-center backdrop-blur-md border border-white/20 shadow-[0_0_30px_rgba(255,255,255,0.1)] group-hover:scale-110 group-hover:bg-white/20 transition-all duration-300 relative z-10">
                  <Play className="text-white fill-current ml-1 drop-shadow-lg" size={32} />
                </div>
                
                {/* Floating Elements */}
                <motion.div 
                  animate={{ y: [-10, 10, -10] }}
                  transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                  className="absolute top-6 right-6 bg-white/10 backdrop-blur-md px-4 py-1.5 rounded-full text-xs font-bold text-white border border-white/20 shadow-lg"
                >
                  ✨ 分析完成
                </motion.div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

const StepCard = ({ icon, title, active, color, bg }) => (
  <div className={`flex flex-col items-center gap-3 p-4 rounded-2xl border transition-all duration-300 hover:-translate-y-1 ${
    active 
      ? 'bg-white border-primary-100 shadow-pearl' 
      : 'bg-slate-50/50 border-transparent text-slate-400 hover:bg-white hover:border-slate-100 hover:shadow-sm'
  }`}>
    <div className={`${active ? color : 'text-slate-400'} p-2 rounded-xl ${active ? bg : 'bg-slate-100'} transition-colors`}>
      {icon}
    </div>
    <span className={`text-xs font-bold tracking-wide ${active ? 'text-slate-700' : 'text-slate-400'}`}>{title}</span>
  </div>
);

const Arrow = () => (
  <div className="text-slate-300">
    <ArrowRight size={20} />
  </div>
);

export default Hero;
