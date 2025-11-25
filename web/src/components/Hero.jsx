import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Camera, Cpu, Play, MessageSquare, Sparkles } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Hero = () => {
  const navigate = useNavigate();

  return (
    <section className="relative min-h-screen flex items-center pt-32 pb-20 overflow-hidden bg-coze-bg">
      {/* Coze-style background grid */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(229,230,235,0.4)_1px,transparent_1px),linear-gradient(90deg,rgba(229,230,235,0.4)_1px,transparent_1px)] bg-[size:40px_40px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] pointer-events-none"></div>

      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <div className="flex flex-col items-center text-center max-w-4xl mx-auto mb-16">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white border border-coze-border shadow-sm mb-8 cursor-default hover:border-coze-primary/30 transition-colors">
              <span className="flex h-2 w-2 relative">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-coze-primary opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-coze-primary"></span>
              </span>
              <span className="text-xs font-medium text-coze-text-secondary tracking-wide">下一代 AI 学习助手</span>
            </div>

            <h1 className="text-5xl md:text-7xl font-bold tracking-tight leading-[1.1] mb-6 text-coze-text-main">
              让 AI 重新定义
              <br />
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-coze-primary to-blue-600">
                你的学习与创作
              </span>
            </h1>
            
            <p className="text-lg md:text-xl text-coze-text-secondary mb-10 leading-relaxed max-w-2xl mx-auto">
              基于多模态大模型的智能教育平台。上传题目即刻生成精讲视频，AI 助教实时答疑，为你量身定制专属学习路径。
            </p>
            
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <button 
                onClick={() => navigate('/auth')}
                className="btn-primary px-8 py-3.5 rounded-xl text-[16px] w-full sm:w-auto shadow-lg shadow-coze-primary/25 hover:shadow-coze-primary/40"
              >
                免费开始使用
                <ArrowRight size={18} />
              </button>
              
              <button className="px-8 py-3.5 text-coze-text-main bg-white border border-coze-border rounded-xl font-medium hover:bg-gray-50 hover:border-gray-300 transition-all text-[16px] w-full sm:w-auto shadow-sm">
                观看演示视频
              </button>
            </div>
          </motion.div>
        </div>

        {/* Coze-style App Interface Preview */}
        <motion.div 
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="relative max-w-6xl mx-auto"
        >
          <div className="relative rounded-2xl bg-white border border-coze-border shadow-2xl overflow-hidden">
            {/* Browser Header */}
            <div className="bg-white border-b border-coze-border px-4 py-3 flex items-center gap-4">
              <div className="flex gap-2">
                <div className="w-3 h-3 rounded-full bg-[#FF5F57]"></div>
                <div className="w-3 h-3 rounded-full bg-[#FEBC2E]"></div>
                <div className="w-3 h-3 rounded-full bg-[#28C840]"></div>
              </div>
              <div className="bg-gray-100 rounded-md px-3 py-1 text-xs text-gray-500 flex-1 max-w-md mx-auto text-center font-mono">
                Ez2Study.ai/workspace
              </div>
            </div>

            <div className="flex h-[600px] bg-coze-bg">
              {/* Sidebar */}
              <div className="w-64 bg-white border-r border-coze-border p-4 hidden md:flex flex-col gap-2">
                <div className="flex items-center gap-2 px-3 py-2 bg-blue-50 text-coze-primary rounded-lg text-sm font-medium">
                  <Sparkles size={16} />
                  AI 学习助手
                </div>
                <div className="flex items-center gap-2 px-3 py-2 text-coze-text-secondary hover:bg-gray-50 rounded-lg text-sm transition-colors">
                  <Camera size={16} />
                  拍照搜题
                </div>
                <div className="flex items-center gap-2 px-3 py-2 text-coze-text-secondary hover:bg-gray-50 rounded-lg text-sm transition-colors">
                  <MessageSquare size={16} />
                  错题本
                </div>
              </div>

              {/* Main Content Area */}
              <div className="flex-1 p-6 overflow-hidden relative">
                {/* Chat Interface Mockup */}
                <div className="max-w-3xl mx-auto space-y-6">
                  <div className="flex gap-4">
                     <div className="w-8 h-8 rounded-full bg-gradient-to-br from-coze-primary to-blue-500 flex-shrink-0"></div>
                     <div className="bg-white p-4 rounded-2xl rounded-tl-none shadow-sm border border-coze-border max-w-[80%]">
                       <p className="text-coze-text-main text-sm leading-relaxed">
                         我已经分析了你上传的物理题目。这道题主要考察牛顿第二定律在斜面上的应用。
                         <br/><br/>
                         建议的学习步骤：
                         1. 受力分析（重力、支持力、摩擦力）
                         2. 建立坐标系分解力
                         3. 列出运动方程
                       </p>
                       <div className="mt-4 bg-gray-50 rounded-xl p-3 border border-gray-100 flex items-center gap-3 cursor-pointer hover:bg-gray-100 transition-colors">
                         <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center border border-gray-200 shadow-sm">
                           <Play size={18} className="text-coze-primary fill-current" />
                         </div>
                         <div className="flex-1">
                           <p className="text-xs font-bold text-coze-text-main">生成精讲视频</p>
                           <p className="text-[10px] text-coze-text-secondary">02:15 · 包含受力分析动画</p>
                         </div>
                       </div>
                     </div>
                  </div>

                  <div className="flex gap-4 flex-row-reverse">
                     <div className="w-8 h-8 rounded-full bg-gray-200 flex-shrink-0"></div>
                     <div className="bg-coze-primary text-white p-4 rounded-2xl rounded-tr-none shadow-md max-w-[80%]">
                       <p className="text-sm leading-relaxed">
                         能不能详细解释一下摩擦力方向怎么判断？
                       </p>
                     </div>
                  </div>

                   <div className="flex gap-4">
                     <div className="w-8 h-8 rounded-full bg-gradient-to-br from-coze-primary to-blue-500 flex-shrink-0"></div>
                     <div className="bg-white p-4 rounded-2xl rounded-tl-none shadow-sm border border-coze-border max-w-[80%] flex items-center gap-2">
                       <div className="flex gap-1">
                         <span className="w-1.5 h-1.5 bg-coze-primary rounded-full animate-bounce"></span>
                         <span className="w-1.5 h-1.5 bg-coze-primary rounded-full animate-bounce delay-100"></span>
                         <span className="w-1.5 h-1.5 bg-coze-primary rounded-full animate-bounce delay-200"></span>
                       </div>
                       <span className="text-xs text-coze-text-secondary">正在思考...</span>
                     </div>
                  </div>
                </div>

                {/* Input Area */}
                <div className="absolute bottom-6 left-6 right-6">
                  <div className="bg-white border border-coze-border rounded-xl shadow-lg p-2 flex items-center gap-2">
                    <button className="p-2 text-gray-400 hover:text-coze-primary hover:bg-gray-50 rounded-lg transition-colors">
                      <Camera size={20} />
                    </button>
                    <input 
                      type="text" 
                      placeholder="输入问题或上传题目..."
                      className="flex-1 bg-transparent border-none focus:ring-0 text-sm text-coze-text-main placeholder-gray-400" 
                    />
                    <button className="p-2 bg-coze-primary text-white rounded-lg hover:bg-coze-secondary transition-colors shadow-md">
                      <ArrowRight size={18} />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          {/* Decorative Glow Behind Preview */}
          <div className="absolute -inset-4 bg-coze-primary/20 blur-3xl -z-10 rounded-[3rem] opacity-50"></div>
        </motion.div>

        <div className="mt-20 border-t border-coze-border/60 pt-10">
          <p className="text-center text-sm text-coze-text-secondary mb-8 font-medium">值得信赖的 AI 学习伙伴</p>
          <div className="flex flex-wrap justify-center gap-x-12 gap-y-8 opacity-60 grayscale hover:grayscale-0 transition-all duration-500">
             {['OpenAI', 'Anthropic', 'Meta', 'Google Cloud'].map((brand, i) => (
               <span key={i} className="text-lg font-bold font-sans text-coze-text-main">{brand}</span>
             ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
