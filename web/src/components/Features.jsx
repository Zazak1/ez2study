import React from 'react';
import { Video, Bot, Palette, Check, X } from 'lucide-react';
import { motion } from 'framer-motion';

const Features = () => {
  return (
    <section id="features" className="py-32 relative">
      <div className="container mx-auto px-6">
        <div className="text-center mb-24">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-5xl font-bold text-white mb-6"
          >
            核心功能
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-xl text-gray-400"
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
            gradient="from-amber-500 to-red-500"
            delay={0}
          />
          <FeatureCard 
            icon={<Bot size={32} />}
            title="AI知识教师"
            desc="智能问答对话系统，提供个性化学习路径推荐和知识点深度解析。"
            tags={['智能对话', '个性推荐', '深度解析']}
            gradient="from-blue-500 to-purple-500"
            delay={0.1}
          />
          <FeatureCard 
            icon={<Palette size={32} />}
            title="AI绘画教师"
            desc="融合艺术技能培养与创意思维训练，提供多媒体学习体验。"
            tags={['创意培养', '艺术技能', '即将推出']}
            gradient="from-pink-500 to-orange-500"
            delay={0.2}
          />
        </div>

        {/* Comparison Section */}
        <div className="max-w-4xl mx-auto bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl overflow-hidden">
          <div className="grid grid-cols-2 p-6 bg-white/5 border-b border-white/10">
            <div className="text-center text-lg font-semibold text-gray-400">传统教育工具</div>
            <div className="text-center text-lg font-bold text-white">Ez2Study</div>
          </div>
          
          <div className="divide-y divide-white/10">
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

const FeatureCard = ({ icon, title, desc, tags, gradient, delay }) => (
  <motion.div 
    initial={{ opacity: 0, y: 30 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ delay }}
    whileHover={{ y: -10 }}
    className="p-8 rounded-3xl bg-white/5 backdrop-blur-xl border border-white/10 hover:border-white/20 transition-all group"
  >
    <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${gradient} flex items-center justify-center text-white mb-8 shadow-lg group-hover:scale-110 transition-transform duration-300`}>
      {icon}
    </div>
    <h3 className="text-2xl font-bold text-white mb-4">{title}</h3>
    <p className="text-gray-400 mb-8 leading-relaxed min-h-[80px]">{desc}</p>
    <div className="flex flex-wrap gap-2">
      {tags.map((tag, i) => (
        <span key={i} className="px-3 py-1 rounded-full text-xs font-medium bg-white/5 text-gray-300 border border-white/10">
          {tag}
        </span>
      ))}
    </div>
  </motion.div>
);

const ComparisonRow = ({ bad, good }) => (
  <div className="grid grid-cols-2">
    <div className="p-6 flex items-center gap-4 text-gray-400 bg-red-500/5">
      <X className="shrink-0 text-red-500" size={20} />
      <span>{bad}</span>
    </div>
    <div className="p-6 flex items-center gap-4 text-white bg-green-500/10">
      <Check className="shrink-0 text-green-500" size={20} />
      <span>{good}</span>
    </div>
  </div>
);

export default Features;

