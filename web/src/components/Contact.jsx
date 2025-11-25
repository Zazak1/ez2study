import React from 'react';
import { motion } from 'framer-motion';
import { Mail, MessageCircle, Phone } from 'lucide-react';

const contactMethods = [
  {
    icon: <Mail size={20} />,
    title: '邮件沟通',
    detail: 'hello@ez2study.com',
  },
  {
    icon: <MessageCircle size={20} />,
    title: '社区支持',
    detail: '加入官方 Discord 社区获取实时帮助',
  },
  {
    icon: <Phone size={20} />,
    title: '合作咨询',
    detail: '+86 010-1234-5678',
  },
];

const Contact = () => {
  return (
    <section id="contact" className="py-32 relative">
      <div className="container mx-auto px-6 relative z-10">
        <div className="grid lg:grid-cols-2 gap-16 items-start">
          <div>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-4xl font-bold text-slate-900 mb-6"
            >
              与我们取得联系
            </motion.h2>
            <p className="text-slate-500 leading-relaxed mb-10">
              无论是校园合作、产品定制还是技术支持，我们的团队都会在 24 小时内回复。留下您的需求，我们会第一时间与您沟通。
            </p>

            <div className="grid gap-6">
              {contactMethods.map((method, idx) => (
                <motion.div
                  key={method.title}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.1 }}
                  className="flex items-start gap-4 rounded-2xl border border-white/50 bg-white/80 backdrop-blur-xl p-6 shadow-pearl"
                >
                  <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-primary-500 to-secondary-400 text-white flex items-center justify-center shrink-0">
                    {method.icon}
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-primary-600 uppercase tracking-wider">{method.title}</p>
                    <p className="text-slate-600 mt-1">{method.detail}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          <motion.form
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="glass rounded-[2.5rem] p-10 space-y-6"
            onSubmit={(e) => e.preventDefault()}
          >
            <div>
              <label className="text-sm font-semibold text-slate-500 mb-2 block">姓名</label>
              <input
                type="text"
                className="w-full rounded-2xl border border-slate-200/70 bg-white/80 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary-100"
                placeholder="您的姓名"
              />
            </div>
            <div>
              <label className="text-sm font-semibold text-slate-500 mb-2 block">邮箱</label>
              <input
                type="email"
                className="w-full rounded-2xl border border-slate-200/70 bg-white/80 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary-100"
                placeholder="company@email.com"
              />
            </div>
            <div>
              <label className="text-sm font-semibold text-slate-500 mb-2 block">需求</label>
              <textarea
                className="w-full rounded-2xl border border-slate-200/70 bg-white/80 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary-100 min-h-[140px]"
                placeholder="告诉我们想做什么，我们会尽快回复。"
              />
            </div>
            <button
              type="submit"
              className="w-full py-4 rounded-2xl text-white font-bold bg-gradient-to-r from-primary-600 to-secondary-500 hover:shadow-lg hover:shadow-primary-500/30 transition-all"
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

