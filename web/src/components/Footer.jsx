import React from 'react';
import { Github, Twitter, Mail } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-black/20 backdrop-blur-lg border-t border-white/5 pt-20 pb-10">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          <div className="col-span-1 lg:col-span-1">
            <h3 className="text-2xl font-bold text-white mb-4">Ez2Study</h3>
            <p className="text-gray-400 leading-relaxed mb-6">
              让学习变得更智能，让知识触手可及。利用AI技术打破传统教育壁垒。
            </p>
            <div className="flex gap-4">
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <Github size={20} />
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <Twitter size={20} />
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <Mail size={20} />
              </a>
            </div>
          </div>

          <div>
            <h4 className="text-white font-semibold mb-6">产品</h4>
            <ul className="space-y-4">
              <li><a href="#" className="text-gray-400 hover:text-primary-400 transition-colors">功能特色</a></li>
              <li><a href="#" className="text-gray-400 hover:text-primary-400 transition-colors">价格方案</a></li>
              <li><a href="#" className="text-gray-400 hover:text-primary-400 transition-colors">更新日志</a></li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-semibold mb-6">资源</h4>
            <ul className="space-y-4">
              <li><a href="#" className="text-gray-400 hover:text-primary-400 transition-colors">帮助中心</a></li>
              <li><a href="#" className="text-gray-400 hover:text-primary-400 transition-colors">API文档</a></li>
              <li><a href="#" className="text-gray-400 hover:text-primary-400 transition-colors">社区论坛</a></li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-semibold mb-6">公司</h4>
            <ul className="space-y-4">
              <li><a href="#" className="text-gray-400 hover:text-primary-400 transition-colors">关于我们</a></li>
              <li><a href="#" className="text-gray-400 hover:text-primary-400 transition-colors">加入我们</a></li>
              <li><a href="#" className="text-gray-400 hover:text-primary-400 transition-colors">法律声明</a></li>
            </ul>
          </div>
        </div>

        <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-gray-500 text-sm">
            © 2024 Ez2Study. All rights reserved.
          </p>
          <div className="flex gap-8 text-sm text-gray-500">
            <a href="#" className="hover:text-white transition-colors">隐私政策</a>
            <a href="#" className="hover:text-white transition-colors">服务条款</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

