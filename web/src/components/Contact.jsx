import React from 'react';
import { motion } from 'framer-motion';
import { Mail, MessageCircle, Phone } from 'lucide-react';

const contactMethods = [
  {
    icon: <Mail size={18} />,
    title: '邮件沟通',
    detail: 'hello@ez2study.com',
  },
  {
    icon: <MessageCircle size={18} />,
    title: '社区支持',
    detail: '加入官方 Discord 社区获取实时帮助',
  },
  {
    icon: <Phone size={18} />,
    title: '合作咨询',
    detail: '+86 010-1234-5678',
  },
];

const Contact = () => {
  return (
    <section id="contact" className="py-24 relative bg-white">
      <div className="container mx-auto px-6 relative z-10">
        <div className="grid lg:grid-cols-2 gap-16 items-start">
          <div>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-3xl font-bold text-text-main mb-6"
            >
              与我们取得联系
            </motion.h2>
            <p className="text-text-muted leading-relaxed mb-10 text-[15px]">
              无论是校园合作、产品定制还是技术支持，我们的团队都会在 24 小时内回复。留下您的需求，我们会第一时间与您沟通。
            </p>

            <div className="grid gap-4">
              {contactMethods.map((method, idx) => (
                <motion.div
                  key={method.title}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.1 }}
                  className="flex items-start gap-4 rounded-xl border border-slate-100 bg-white p-5 shadow-coze hover:shadow-coze-hover transition-shadow duration-300"
                >
                  <div className="w-10 h-10 rounded-lg bg-primary-50 text-primary-600 flex items-center justify-center shrink-0 border border-primary-100">
                    {method.icon}
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-text-main mb-0.5">{method.title}</p>
                    <p className="text-xs text-text-muted">{method.detail}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          <motion.form
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-white rounded-2xl p-8 border border-slate-100 shadow-coze-lg space-y-5"
            onSubmit={(e) => e.preventDefault()}
          >
            <div className="space-y-1.5">
              <label className="text-sm font-medium text-text-main block">姓名</label>
              <input
                type="text"
                className="w-full rounded-lg border border-slate-200 bg-slate-50 px-4 py-2.5 text-sm focus:outline-none focus:border-primary-500 focus:ring-1 focus:ring-primary-500 transition-all"
                placeholder="您的姓名"
              />
            </div>
            <div className="space-y-1.5">
              <label className="text-sm font-medium text-text-main block">邮箱</label>
              <input
                type="email"
                className="w-full rounded-lg border border-slate-200 bg-slate-50 px-4 py-2.5 text-sm focus:outline-none focus:border-primary-500 focus:ring-1 focus:ring-primary-500 transition-all"
                placeholder="company@email.com"
              />
            </div>
            <div className="space-y-1.5">
              <label className="text-sm font-medium text-text-main block">需求</label>
              <textarea
                className="w-full rounded-lg border border-slate-200 bg-slate-50 px-4 py-2.5 text-sm focus:outline-none focus:border-primary-500 focus:ring-1 focus:ring-primary-500 min-h-[120px] resize-none"
                placeholder="告诉我们想做什么，我们会尽快回复。"
              />
            </div>
            <button
              type="submit"
              className="w-full py-3 rounded-lg text-white font-medium bg-primary-500 hover:bg-primary-600 shadow-md shadow-primary-500/20 transition-all active:scale-[0.99]"
            >
              发送请求
            </button>
          </motion.form>
        </div>
      </div>
    </section>
  );
};

export default Contact;
