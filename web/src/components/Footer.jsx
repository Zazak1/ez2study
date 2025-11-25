import React from 'react';
import { Github, Twitter, Mail } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="relative z-10 bg-white border-t border-slate-100 pt-16 pb-8">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          <div className="col-span-1 lg:col-span-1">
            <h3 className="text-xl font-bold text-text-main mb-4 tracking-tight">
              Ez2Study
            </h3>
            <p className="text-text-muted leading-relaxed mb-6 text-sm">
              让学习变得更智能，让知识触手可及。利用 AI 技术打破传统教育壁垒，为每个人提供个性化的学习体验。
            </p>
            <div className="flex gap-3">
              <SocialIcon icon={<Github size={16} />} />
              <SocialIcon icon={<Twitter size={16} />} />
              <SocialIcon icon={<Mail size={16} />} />
            </div>
          </div>

          <LinkGroup title="产品" links={['功能特色', '价格方案', '更新日志', 'API 文档']} />
          <LinkGroup title="资源" links={['帮助中心', '社区论坛', '开发者指南', '博客']} />
          <LinkGroup title="公司" links={['关于我们', '加入我们', '法律声明', '联系我们']} />
        </div>

        <div className="border-t border-slate-100 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-text-muted text-xs">
            © 2024 Ez2Study. All rights reserved.
          </p>
          <div className="flex gap-6 text-xs text-text-muted">
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
    <h4 className="text-text-main font-semibold mb-4 text-sm">{title}</h4>
    <ul className="space-y-2.5">
      {links.map((link, i) => (
        <li key={i}>
          <a href="#" className="text-text-muted hover:text-primary-600 transition-colors text-sm hover:translate-x-0.5 inline-block transform duration-200">
            {link}
          </a>
        </li>
      ))}
    </ul>
  </div>
);

const SocialIcon = ({ icon }) => (
  <a href="#" className="w-8 h-8 rounded-lg bg-slate-50 flex items-center justify-center text-slate-500 hover:bg-primary-50 hover:text-primary-600 transition-all duration-200 border border-slate-100">
    {icon}
  </a>
);

export default Footer;
