import React from 'react';
import { Video, Bot, Palette, Check, X } from 'lucide-react';
import { motion } from 'framer-motion';

const Features = () => {
  return (
    <section id="features" className="py-24 relative bg-white">
      <div className="container mx-auto px-6 relative z-10">
        <div className="text-center mb-20">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl md:text-4xl font-bold text-coze-text-main mb-4 tracking-tight"
          >
            核心功能引擎
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-lg text-coze-text-secondary max-w-2xl mx-auto"
          >
            集成三大智能模块，全方位提升学习体验，让知识获取更高效
          </motion.p>
        </div>

        <div className="grid md:grid-cols-3 gap-6 mb-32">
          <FeatureCard 
            icon={<Video size={24} />}
            title="智能视频生成"
            desc="拍摄题目即可自动识别内容，AI 分析知识点结构，生成个性化学习视频。"
            tags={['OCR识别', '知识图谱', '自动生成']}
            delay={0}
          />
          <FeatureCard 
            icon={<Bot size={24} />}
            title="AI 知识教师"
            desc="智能问答对话系统，提供个性化学习路径推荐和知识点深度解析。"
            tags={['智能对话', '个性推荐', '深度解析']}
            delay={0.1}
          />
          <FeatureCard 
            icon={<Palette size={24} />}
            title="AI 绘画教师"
            desc="融合艺术技能培养与创意思维训练，提供多媒体学习体验。"
            tags={['创意培养', '艺术技能', '即将推出']}
            delay={0.2}
          />
        </div>

        {/* Comparison Section */}
        <div className="max-w-5xl mx-auto">
           <div className="text-center mb-12">
            <h3 className="text-2xl font-bold text-coze-text-main">为什么选择 Ez2Study</h3>
           </div>
           
           <div className="grid md:grid-cols-2 gap-8">
              {/* Traditional */}
              <div className="rounded-2xl border border-coze-border bg-gray-50/50 p-8">
                 <div className="flex items-center gap-3 mb-6">
                    <div className="w-10 h-10 rounded-lg bg-gray-200 flex items-center justify-center text-gray-500">
                      <X size={20} />
                    </div>
                    <span className="text-lg font-bold text-coze-text-secondary">传统教育工具</span>
                 </div>
                 <ul className="space-y-4">
                    <li className="flex gap-3 text-coze-text-secondary">
                      <X size={18} className="shrink-0 mt-0.5 opacity-60" />
                      <span>人工制作视频，成本高效率低</span>
                    </li>
                    <li className="flex gap-3 text-coze-text-secondary">
                      <X size={18} className="shrink-0 mt-0.5 opacity-60" />
                      <span>依赖固定题库，缺乏个性化解析</span>
                    </li>
                    <li className="flex gap-3 text-coze-text-secondary">
                      <X size={18} className="shrink-0 mt-0.5 opacity-60" />
                      <span>单向输出，缺乏互动反馈机制</span>
                    </li>
                 </ul>
              </div>

              {/* Ours */}
              <div className="rounded-2xl border border-coze-primary/20 bg-white shadow-coze-lg p-8 relative overflow-hidden group">
                 <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-coze-primary to-coze-secondary"></div>
                 <div className="flex items-center gap-3 mb-6">
                    <div className="w-10 h-10 rounded-lg bg-coze-primary/10 flex items-center justify-center text-coze-primary">
                      <Check size={20} />
                    </div>
                    <span className="text-lg font-bold text-coze-text-main">Ez2Study 智能平台</span>
                 </div>
                 <ul className="space-y-4">
                    <li className="flex gap-3 text-coze-text-main">
                      <Check size={18} className="text-coze-primary shrink-0 mt-0.5" />
                      <span>AI 实时生成，拍照即得视频解析</span>
                    </li>
                    <li className="flex gap-3 text-coze-text-main">
                      <Check size={18} className="text-coze-primary shrink-0 mt-0.5" />
                      <span>个性化知识图谱，针对性补强薄弱点</span>
                    </li>
                    <li className="flex gap-3 text-coze-text-main">
                      <Check size={18} className="text-coze-primary shrink-0 mt-0.5" />
                      <span>全链路互动教学，实时答疑解惑</span>
                    </li>
                 </ul>
              </div>
           </div>
        </div>
      </div>
    </section>
  );
};

const FeatureCard = ({ icon, title, desc, tags, delay }) => (
  <motion.div 
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ delay }}
    whileHover={{ y: -4 }}
    className="p-6 rounded-xl bg-white border border-coze-border shadow-coze hover:shadow-coze-hover transition-all group cursor-default"
  >
    <div className="w-12 h-12 rounded-lg bg-coze-primary/5 flex items-center justify-center text-coze-primary mb-6 group-hover:bg-coze-primary group-hover:text-white transition-colors duration-300">
      {icon}
    </div>
    <h3 className="text-lg font-bold text-coze-text-main mb-3">{title}</h3>
    <p className="text-coze-text-secondary mb-6 leading-relaxed min-h-[60px] text-sm">{desc}</p>
    <div className="flex flex-wrap gap-2">
      {tags.map((tag, i) => (
        <span key={i} className="px-2 py-1 rounded text-xs font-medium bg-gray-50 text-gray-600 border border-gray-100">
          {tag}
        </span>
      ))}
    </div>
  </motion.div>
);

export default Features;
