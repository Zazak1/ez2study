import React from 'react';
import { Video, Bot, Palette, Check, X } from 'lucide-react';
import { motion } from 'framer-motion';

const Features = () => {
  return (
    <section id="features" className="py-32 relative">
      <div className="container mx-auto px-6 relative z-10">
        <div className="text-center mb-24">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-5xl font-bold text-slate-800 mb-6"
          >
            核心功能
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-xl text-slate-500"
          >
            三大智能模块，全方位提升学习体验
          </motion.p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 mb-32">
          <FeatureCard 
            icon={<Video size={32} />}
            title="智能视频生成"
            desc="拍摄题目即可自动识别内容，AI分析知识点结构，生成个性化学习视频。"
            tags={['OCR识别', '知识图谱', '自动生成']}
            gradient="from-orange-100 to-amber-100"
            iconGradient="from-orange-500 to-amber-500"
            iconColor="text-white"
            delay={0}
          />
          <FeatureCard 
            icon={<Bot size={32} />}
            title="AI知识教师"
            desc="智能问答对话系统，提供个性化学习路径推荐和知识点深度解析。"
            tags={['智能对话', '个性推荐', '深度解析']}
            gradient="from-sky-100 to-blue-100"
            iconGradient="from-sky-500 to-blue-500"
            iconColor="text-white"
            delay={0.1}
          />
          <FeatureCard 
            icon={<Palette size={32} />}
            title="AI绘画教师"
            desc="融合艺术技能培养与创意思维训练，提供多媒体学习体验。"
            tags={['创意培养', '艺术技能', '即将推出']}
            gradient="from-fuchsia-100 to-pink-100"
            iconGradient="from-fuchsia-500 to-pink-500"
            iconColor="text-white"
            delay={0.2}
          />
        </div>

        {/* Comparison Section */}
        <div className="max-w-4xl mx-auto bg-white/80 backdrop-blur-xl border border-white/60 rounded-[2rem] overflow-hidden shadow-pearl-lg">
          <div className="grid grid-cols-2 p-8 bg-white/50 border-b border-slate-100">
            <div className="text-center text-xl font-semibold text-slate-400">传统教育工具</div>
            <div className="text-center text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-primary-600 to-secondary-500">Ez2Study</div>
          </div>
          
          <div className="divide-y divide-slate-100">
            <ComparisonRow 
              bad="需要人工制作视频，效率低下"
              good="AI自动生成，拍照即可获得视频"
            />
            <ComparisonRow 
              bad="依赖固定问答库，缺乏个性化"
              good="智能对话系统，个性化学习路径"
            />
            <ComparisonRow 
              bad="功能单一，停留在基础层面"
              good="三大模块整合，全链路学习体验"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

const FeatureCard = ({ icon, title, desc, tags, gradient, iconGradient, iconColor, delay }) => (
  <motion.div 
    initial={{ opacity: 0, y: 30 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ delay }}
    whileHover={{ y: -10 }}
    className="p-8 rounded-[2rem] bg-white/60 backdrop-blur-xl border border-white/60 hover:border-primary-200 hover:shadow-pearl-hover transition-all group relative overflow-hidden"
  >
    <div className={`absolute top-0 right-0 w-32 h-32 bg-gradient-to-br ${gradient} opacity-50 blur-2xl rounded-full -mr-10 -mt-10 group-hover:opacity-80 transition-opacity`}></div>
    
    <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${iconGradient} flex items-center justify-center ${iconColor} mb-8 shadow-lg shadow-primary-500/10 group-hover:scale-110 group-hover:rotate-3 transition-all duration-300`}>
      {icon}
    </div>
    <h3 className="text-2xl font-bold text-slate-800 mb-4">{title}</h3>
    <p className="text-slate-500 mb-8 leading-relaxed min-h-[80px]">{desc}</p>
    <div className="flex flex-wrap gap-2">
      {tags.map((tag, i) => (
        <span key={i} className="px-3 py-1 rounded-full text-xs font-bold bg-slate-100 text-slate-600 border border-slate-200 group-hover:bg-white group-hover:border-primary-100 group-hover:text-primary-600 transition-colors">
          {tag}
        </span>
      ))}
    </div>
  </motion.div>
);

const ComparisonRow = ({ bad, good }) => (
  <div className="grid grid-cols-2">
    <div className="p-6 md:p-8 flex items-center gap-4 text-slate-400 bg-slate-50/50 hover:bg-slate-100/50 transition-colors">
      <div className="w-8 h-8 rounded-full bg-slate-200 flex items-center justify-center shrink-0 text-slate-500">
        <X size={18} />
      </div>
      <span>{bad}</span>
    </div>
    <div className="p-6 md:p-8 flex items-center gap-4 text-slate-700 bg-primary-50/30 hover:bg-primary-50/50 transition-colors">
      <div className="w-8 h-8 rounded-full bg-emerald-100 flex items-center justify-center shrink-0 text-emerald-600">
        <Check size={18} />
      </div>
      <span className="font-medium">{good}</span>
    </div>
  </div>
);

export default Features;
