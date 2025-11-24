import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Camera, Cpu, Play } from 'lucide-react';

const Hero = ({ onStart }) => {
  return (
    <section className="relative min-h-screen flex items-center pt-20 overflow-hidden">
      <div className="container mx-auto px-6 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          
          {/* Text Content */}
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight leading-tight mb-6">
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500">
                AI智能学习
              </span>
              <br />
              <span className="text-white">视频生成平台</span>
            </h1>
            
            <p className="text-xl text-gray-400 mb-8 leading-relaxed max-w-lg">
              拍摄题目，即刻生成定制化学习视频。突破传统教育工具局限，开启智能学习新时代。
            </p>
            
            <div className="flex flex-wrap gap-4">
              <button 
                onClick={onStart}
                className="group relative px-8 py-4 bg-white text-dark-bg font-bold rounded-xl overflow-hidden transition-all hover:scale-105 active:scale-95"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-blue-400 to-purple-500 opacity-0 group-hover:opacity-20 transition-opacity"></div>
                <span className="relative flex items-center gap-2">
                  立即体验 <ArrowRight size={20} />
                </span>
              </button>
              
              <button className="px-8 py-4 text-white border border-white/20 rounded-xl font-medium hover:bg-white/5 transition-all">
                了解更多
              </button>
            </div>

            <div className="mt-12 flex items-center gap-8 text-gray-500">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-green-500"></div>
                <span>实时生成</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-blue-500"></div>
                <span>准确率 99%</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-purple-500"></div>
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
            <div className="relative z-10 bg-white/5 backdrop-blur-2xl border border-white/10 rounded-3xl p-8 shadow-2xl shadow-purple-500/10">
              <div className="flex items-center justify-between mb-8 pb-4 border-b border-white/10">
                <div className="flex gap-2">
                  <div className="w-3 h-3 rounded-full bg-red-500"></div>
                  <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                  <div className="w-3 h-3 rounded-full bg-green-500"></div>
                </div>
                <div className="text-white/50 text-sm font-mono">AI Processing...</div>
              </div>
              
              <div className="flex items-center justify-between gap-4">
                <StepCard icon={<Camera size={24} />} title="拍摄题目" active />
                <Arrow />
                <StepCard icon={<Cpu size={24} />} title="AI分析" />
                <Arrow />
                <StepCard icon={<Play size={24} />} title="生成视频" />
              </div>

              {/* Simulated Video Player UI */}
              <div className="mt-8 bg-black/40 rounded-xl aspect-video flex items-center justify-center border border-white/5 group cursor-pointer overflow-hidden relative">
                <div className="absolute inset-0 bg-gradient-to-br from-purple-500/10 to-blue-500/10"></div>
                <div className="w-16 h-16 bg-white/10 rounded-full flex items-center justify-center backdrop-blur-sm group-hover:scale-110 transition-transform">
                  <Play className="text-white fill-current ml-1" size={32} />
                </div>
                
                {/* Floating Elements */}
                <motion.div 
                  animate={{ y: [-10, 10, -10] }}
                  transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                  className="absolute top-4 right-4 bg-white/10 backdrop-blur-md px-3 py-1 rounded-full text-xs text-white border border-white/10"
                >
                  分析完成
                </motion.div>
              </div>
            </div>

            {/* Decorative Glows */}
            <div className="absolute -top-20 -right-20 w-64 h-64 bg-purple-500/30 rounded-full blur-[100px]"></div>
            <div className="absolute -bottom-20 -left-20 w-64 h-64 bg-blue-500/30 rounded-full blur-[100px]"></div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

const StepCard = ({ icon, title, active }) => (
  <div className={`flex flex-col items-center gap-3 p-4 rounded-xl border transition-all ${
    active 
      ? 'bg-primary-500/20 border-primary-500/50 text-white' 
      : 'bg-white/5 border-white/10 text-gray-400'
  }`}>
    <div className={`${active ? 'text-primary-400' : 'text-gray-500'}`}>
      {icon}
    </div>
    <span className="text-xs font-medium">{title}</span>
  </div>
);

const Arrow = () => (
  <div className="text-gray-600">
    <ArrowRight size={20} />
  </div>
);

export default Hero;

