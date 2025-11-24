import React from 'react';
import { Github, Twitter, Mail } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="relative z-10 bg-white/50 backdrop-blur-lg border-t border-slate-200 pt-20 pb-10">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          <div className="col-span-1 lg:col-span-1">
            <h3 className="text-2xl font-bold text-text-main mb-4 tracking-tight">
              Ez2Study
            </h3>
            <p className="text-slate-500 leading-relaxed mb-6 text-sm">
              让学习变得更智能，让知识触手可及。利用AI技术打破传统教育壁垒，为每个人提供个性化的学习体验。
            </p>
            <div className="flex gap-4">
              <SocialIcon icon={<Github size={18} />} />
              <SocialIcon icon={<Twitter size={18} />} />
              <SocialIcon icon={<Mail size={18} />} />
            </div>
          </div>

          <LinkGroup title="产品" links={['功能特色', '价格方案', '更新日志', 'API文档']} />
          <LinkGroup title="资源" links={['帮助中心', '社区论坛', '开发者指南', '博客']} />
          <LinkGroup title="公司" links={['关于我们', '加入我们', '法律声明', '联系我们']} />
        </div>

        <div className="border-t border-slate-200 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-slate-400 text-xs">
            © 2024 Ez2Study. All rights reserved.
          </p>
          <div className="flex gap-8 text-xs text-slate-400">
            <a href="#" className="hover:text-primary-600 transition-colors">隐私政策</a>
            <a href="#" className="hover:text-primary-600 transition-colors">服务条款</a>
            <a href="#" className="hover:text-primary-600 transition-colors">Cookie 设置</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

const LinkGroup = ({ title, links }) => (
  <div>
    <h4 className="text-slate-900 font-bold mb-6 text-sm uppercase tracking-wider opacity-80">{title}</h4>
    <ul className="space-y-3">
      {links.map((link, i) => (
        <li key={i}>
          <a href="#" className="text-slate-500 hover:text-primary-600 transition-colors text-sm hover:translate-x-1 inline-block transform duration-200">
            {link}
          </a>
        </li>
      ))}
    </ul>
  </div>
);

const SocialIcon = ({ icon }) => (
  <a href="#" className="w-10 h-10 rounded-xl bg-white flex items-center justify-center text-slate-400 hover:bg-primary-50 hover:text-primary-600 hover:scale-110 transition-all duration-300 border border-slate-200 hover:border-primary-100 shadow-sm">
    {icon}
  </a>
);

export default Footer;
