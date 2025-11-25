import React from 'react';
import { motion } from 'framer-motion';

const stats = [
  { label: 'AI 模型调用', value: '120K+' },
  { label: '生成学习视频', value: '45K+' },
  { label: '活跃学校', value: '80+' },
];

const About = () => {
  return (
    <section id="about" className="py-32 relative">
      <div className="container mx-auto px-6 relative z-10">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="glass rounded-[2.5rem] p-10"
          >
            <p className="text-primary-600 font-semibold uppercase tracking-[0.3em] text-sm mb-6">
              关于我们
            </p>
            <h2 className="text-4xl font-bold text-slate-900 leading-snug mb-6">
              将复杂的 AI 技术化作触手可及的学习体验
            </h2>
            <p className="text-slate-500 leading-relaxed mb-6">
              Ez2Study 团队由教育专家与 AI 工程师组成，专注于将 AI 视频生成、知识图谱和智能问答技术整合在同一平台，帮助学生更快理解知识点，也让老师拥有全新的教学工具。
            </p>
            <p className="text-slate-500 leading-relaxed">
              平台已在多所学校的课堂实测，显著提升了课堂互动率和知识掌握度。我们相信每一次拍摄题目都能成为全新的学习起点。
            </p>
          </motion.div>

          <div className="grid sm:grid-cols-3 gap-6">
            {stats.map((item, idx) => (
              <motion.div
                key={item.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className="rounded-3xl border border-white/60 bg-white/80 backdrop-blur-xl p-8 text-center shadow-pearl-lg"
              >
                <p className="text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-primary-600 to-secondary-500">
                  {item.value}
                </p>
                <p className="mt-2 text-sm font-medium text-slate-500">{item.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;

