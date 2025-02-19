'use client'

import Image from "next/image";
import { TrendingUp, Users, Clock } from "lucide-react";
import Link from "next/link";
import { useState } from 'react';

// 论坛分类数据
const forumCategories = [
  { id: 1, title: "技术分析", icon: "📊", threads: 234, posts: 1890 },
  { id: 2, title: "交易策略", icon: "💡", threads: 156, posts: 890 },
  { id: 3, title: "市场动态", icon: "📈", threads: 342, posts: 2341 },
  { id: 4, title: "新手问答", icon: "❓", threads: 567, posts: 3421 },
  { id: 5, title: "工具分享", icon: "🛠", threads: 123, posts: 678 },
  { id: 6, title: "经验交流", icon: "💬", threads: 445, posts: 2156 }
];

// 热门帖子数据
const trendingThreads = [
  {
    id: 1,
    title: "如何正确设置止损位？",
    author: "交易达人",
    replies: 56,
    views: "2.3k",
    time: "2小时前"
  },
  {
    id: 2,
    title: "分享一个稳定盈利的策略",
    author: "量化专家",
    replies: 89,
    views: "3.4k",
    time: "4小时前"
  },
  {
    id: 3,
    title: "新手如何避免爆仓？",
    author: "风控大师",
    replies: 123,
    views: "5.6k",
    time: "6小时前"
  }
];

export default function Home() {
  const [showModal, setShowModal] = useState(false);

  // 学习路径数据
  const learningPaths = [
    {
      title: "新手入门",
      description: "从零开始学习交易基础知识",
      icon: "🎯",
      topics: ["交易基础", "市场介绍", "基本面分析", "技术分析入门"],
      duration: "2周",
      level: "初级"
    },
    {
      title: "进阶课程",
      description: "深入学习技术分析和交易策略",
      icon: "📈",
      topics: ["高级技术分析", "交易系统构建", "风险管理", "心理建设"],
      duration: "4周",
      level: "中级"
    },
    {
      title: "专业课程",
      description: "掌握专业的交易技能和策略",
      icon: "🏆",
      topics: ["量化交易", "程序化交易", "机器学习应用", "组合投资"],
      duration: "8周",
      level: "高级"
    }
  ];

  return (
    <div className="min-h-screen bg-[#f5f5f5]">
      {/* Hero Section - 全屏设计 */}
      <section className="relative h-[600px] -mt-8 overflow-hidden">
        {/* 背景渐变和动画效果 */}
        <div className="absolute inset-0">
          {/* 主背景渐变 */}
          <div className="absolute inset-0 banner-animate" />
          
          {/* 动态网格背景 */}
          <div className="absolute inset-0"
            style={{
              backgroundImage: `linear-gradient(rgba(255, 255, 255, 0.05) 1px, transparent 1px),
                               linear-gradient(90deg, rgba(255, 255, 255, 0.05) 1px, transparent 1px)`,
              backgroundSize: '50px 50px',
              transform: 'perspective(500px) rotateX(60deg)',
              transformOrigin: 'center 200%'
            }}
          />

          {/* 浮动粒子 */}
          <div className="absolute inset-0">
            {/* 上半部分额外的光点 */}
            {[...Array(80)].map((_, i) => {
              // 随机大小，范围从0.1px到4px
              const size = Math.random() * 3.9 + 0.1;
              const swayIndex = Math.floor(Math.random() * 3) + 1;
              // 更长的动画时间
              const breathDuration = `${Math.random() * 3 + 6}s`;
              const swayDuration = `${Math.random() * 5 + 8}s`;
              const delay = `${Math.random() * 4}s`;
              
              // 根据大小决定动画和颜色
              let animationType, color;
              if (size > 3) { // 特大型
                animationType = `star-breath-large-sway ${breathDuration}`;
                color = Math.random() > 0.7 ? 
                  `rgb(255, ${Math.floor(Math.random() * 30 + 200)}, ${Math.floor(Math.random() * 50 + 100)})` : 
                  'white';
              } else if (size > 1.5) { // 大型
                const animationIndex = Math.floor(Math.random() * 3) + 1;
                animationType = `star-breath-and-sway-${animationIndex} ${breathDuration}`;
                color = Math.random() > 0.8 ? 
                  `rgb(255, ${Math.floor(Math.random() * 40 + 190)}, ${Math.floor(Math.random() * 60 + 90)})` : 
                  'white';
              } else { // 中型和小型
                const shouldAnimate = Math.random() > 0.6;
                animationType = shouldAnimate ? 
                  `star-twinkle ${breathDuration}` : 
                  `star-sway-${swayIndex} ${swayDuration}`;
                color = 'white';
              }

              return (
                <div
                  key={`upper-star-${i}`}
                  className="absolute rounded-full"
                  style={{
                    width: `${size}px`,
                    height: `${size}px`,
                    left: `${Math.random() * 100}%`,
                    top: `${Math.random() * 40}%`,
                    opacity: Math.random() * 0.3 + (size > 1.5 ? 0.2 : 0.1),
                    backgroundColor: color,
                    animation: `${animationType} ease-in-out infinite`,
                    animationDelay: size > 1 ? delay : `${delay}`
                  }}
                />
              );
            })}

            {/* 特大型光点 */}
            {[...Array(8)].map((_, i) => {
              const size = Math.random() * 2 + 3;
              const animationDuration = `${Math.random() * 4 + 8}s`;
              const delay = `${Math.random() * 3}s`;
              const color = Math.random() > 0.7 ? 
                `rgb(255, ${Math.floor(Math.random() * 30 + 200)}, ${Math.floor(Math.random() * 50 + 100)})` : 
                'white';
              
              return (
                <div
                  key={`large-star-${i}`}
                  className="absolute rounded-full"
                  style={{
                    width: `${size}px`,
                    height: `${size}px`,
                    left: `${Math.random() * 100}%`,
                    top: `${Math.random() * 100}%`,
                    animation: `star-breath-large-sway ${animationDuration} ease-in-out infinite`,
                    animationDelay: delay,
                    opacity: Math.random() * 0.3 + 0.2,
                    backgroundColor: color
                  }}
                />
              );
            })}

            {/* 大型光点 */}
            {[...Array(20)].map((_, i) => {
              const size = Math.random() * 2 + 1;
              const animationIndex = Math.floor(Math.random() * 3) + 1;
              const animationDuration = `${Math.random() * 3 + 7}s`;
              const delay = `${Math.random() * 2}s`;
              const color = 'white';
              
              return (
                <div
                  key={`star-${i}`}
                  className="absolute rounded-full"
                  style={{
                    width: `${size}px`,
                    height: `${size}px`,
                    left: `${Math.random() * 100}%`,
                    top: `${Math.random() * 100}%`,
                    animation: `star-breath-and-sway-${animationIndex} ${animationDuration} ease-in-out infinite`,
                    animationDelay: delay,
                    opacity: Math.random() * 0.5 + 0.1,
                    backgroundColor: color
                  }}
                />
              );
            })}
          </div>

          {/* 底部波浪 */}
          <div className="absolute bottom-0 left-0 right-0">
            <svg className="w-full h-24" viewBox="0 0 1440 74" preserveAspectRatio="none">
              <path 
                d="M0,0 C480,40 960,40 1440,0 L1440,74 L0,74 Z" 
                fill="#f5f5f5"
              />
            </svg>
          </div>
        </div>

        {/* 内容区域 */}
        <div className="relative h-full max-w-[1200px] mx-auto px-4 flex flex-col items-center justify-center">
          <div className="text-center text-white">
            <h1 className="text-5xl md:text-6xl font-bold mb-6">
              专业的 <span className="animate-gradient-text">加密货币</span> 交易分析社区
            </h1>
            <p className="text-xl md:text-2xl mb-12 opacity-90 max-w-[600px] mx-auto">
              专注于币圈技术分析与交易策略研究分享
            </p>
            <div className="flex justify-center gap-6">
              <button 
                onClick={() => setShowModal(true)}
                className="group relative bg-white hover:bg-opacity-95 text-[#4285F4] px-8 py-4 rounded-xl text-lg font-medium transition-all duration-300 hover:shadow-lg overflow-hidden"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-[#4285F4]/10 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700" />
                <div className="relative flex items-center gap-2">
                  <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M5 3v4M3 5h4M6 17v4M4 19h4M13 3l4 4L7 17l-4-4L13 3z" />
                  </svg>
                  开始学习
                </div>
              </button>
              <Link href="/about">
                <button className="group relative bg-transparent border-2 border-white/50 hover:border-white text-white px-8 py-4 rounded-xl text-lg font-medium transition-all duration-300 overflow-hidden">
                  <div className="absolute inset-0 bg-white/10 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700" />
                  <div className="relative flex items-center gap-2">
                    <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <circle cx="11" cy="11" r="8" />
                      <path d="M21 21l-4.35-4.35" />
                    </svg>
                    了解更多
                  </div>
                </button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* 添加动画样式 */}
      <style jsx global>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-20px); }
        }
      `}</style>

      <main className="max-w-[1200px] mx-auto px-4">
        {/* 热门视频模块 */}
        <section className="py-12">
          <h2 className="text-2xl font-bold mb-8">热门视频</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                title: "万年交易之路",
                desc: "如何将小资金做大",
                thumbnail: "/btc1.jpg",
                views: "21k",
                duration: "15:24"
              },
              {
                title: "行情分析",
                desc: "比特币多头能延续吗",
                thumbnail: "/btc2.JPG",
                views: "18k",
                duration: "12:36"
              },
              {
                title: "万年盈利战法系列",
                desc: "仓位管理（到底开几倍杠杆）",
                thumbnail: "/btc3.jpg",
                views: "32k",
                duration: "18:45"
              }
            ].map((video, i) => (
              <div key={i} className="bg-white rounded-xl shadow-sm overflow-hidden group cursor-pointer">
                <div className="relative h-[200px]">
                  <Image
                    src={video.thumbnail}
                    alt={video.title}
                    fill
                    className="object-contain bg-[#f8f9fa] group-hover:scale-105 transition-transform duration-300"
                    priority={true}
                  />
                  <div className="absolute bottom-2 right-2 bg-black/70 text-white px-2 py-1 rounded text-sm">
                    {video.duration}
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="font-bold mb-2 group-hover:text-[#4285F4] transition-colors">
                    {video.title}
                  </h3>
                  <p className="text-gray-600 text-sm mb-4">
                    {video.desc}
                  </p>
                  <div className="flex items-center text-sm text-gray-500">
                    <svg className="w-4 h-4 mr-1" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M12 4.5C7 4.5 2.73 7.61 1 12c1.73 4.39 6 7.5 11 7.5s9.27-3.11 11-7.5c-1.73-4.39-6-7.5-11-7.5zM12 17c-2.76 0-5-2.24-5-5s2.24-5 5-5 5 2.24 5 5-2.24 5-5 5zm0-8c-1.66 0-3 1.34-3 3s1.34 3 3 3 3-1.34 3-3-1.34-3-3-3z"/>
                    </svg>
                    {video.views} 次观看
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* 论坛部分 */}
        <section className="py-12">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-2xl font-bold">社区讨论</h2>
            <div className="flex gap-4">
              <button className="flex items-center gap-2 text-gray-600 hover:text-[#4285F4]">
                <Clock className="w-4 h-4" />
                最新
              </button>
              <button className="flex items-center gap-2 text-gray-600 hover:text-[#4285F4]">
                <TrendingUp className="w-4 h-4" />
                热门
              </button>
            </div>
          </div>

          {/* 论坛分类网格 */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
            {[
              {
                icon: "📊",
                title: "技术分析",
                topics: 234,
                users: 1890,
                color: "from-blue-500/10 to-blue-500/5"
              },
              {
                icon: "💡",
                title: "交易策略",
                topics: 156,
                users: 890,
                color: "from-yellow-500/10 to-yellow-500/5"
              },
              {
                icon: "📈",
                title: "市场动态",
                topics: 342,
                users: 2341,
                color: "from-green-500/10 to-green-500/5"
              },
              {
                icon: "❓",
                title: "新手问答",
                topics: 567,
                users: 3421,
                color: "from-purple-500/10 to-purple-500/5"
              },
              {
                icon: "🛠️",
                title: "工具分享",
                topics: 123,
                users: 678,
                color: "from-red-500/10 to-red-500/5"
              },
              {
                icon: "💬",
                title: "经验交流",
                topics: 445,
                users: 2156,
                color: "from-indigo-500/10 to-indigo-500/5"
              }
            ].map((category, i) => (
              <div
                key={i}
                className="group relative bg-white rounded-xl p-6 shadow-sm cursor-pointer overflow-hidden transition-all duration-300 hover:shadow-md hover:-translate-y-1 active:translate-y-0 active:shadow-sm"
              >
                {/* 背景渐变效果 */}
                <div className={`absolute inset-0 bg-gradient-to-br ${category.color} opacity-0 group-hover:opacity-100 transition-opacity duration-300`} />
                
                {/* 内容 */}
                <div className="relative">
                  <div className="flex items-start justify-between mb-4">
                    <span className="text-2xl">{category.icon}</span>
                    <svg 
                      className="w-5 h-5 text-gray-400 group-hover:text-[#4285F4] group-hover:translate-x-1 transition-all duration-300" 
                      viewBox="0 0 24 24" 
                      fill="none" 
                      stroke="currentColor" 
                      strokeWidth="2"
                    >
                      <path d="M5 12h14M12 5l7 7-7 7" />
                    </svg>
                  </div>
                  <h3 className="font-bold text-lg mb-2 group-hover:text-[#4285F4] transition-colors">
                    {category.title}
                  </h3>
                  <div className="flex items-center gap-4 text-sm text-gray-500">
                    <span className="flex items-center gap-1">
                      <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" />
                      </svg>
                      {category.topics} 主题
                    </span>
                    <span className="flex items-center gap-1">
                      <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
                        <circle cx="9" cy="7" r="4" />
                        <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
                        <path d="M16 3.13a4 4 0 0 1 0 7.75" />
                      </svg>
                      {category.users} 帖子
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* 热门讨论 */}
          <div className="bg-white rounded-xl p-6 shadow-sm">
            <h3 className="font-bold text-lg mb-6">热门讨论</h3>
            <div className="space-y-6">
              {trendingThreads.map((thread) => (
                <div key={thread.id} className="flex items-start justify-between pb-4 border-b last:border-0">
                  <div className="flex-1">
                    <h4 className="font-medium mb-2 hover:text-[#4285F4] cursor-pointer">
                      {thread.title}
                    </h4>
                    <div className="flex items-center gap-4 text-sm text-gray-500">
                      <span>{thread.author}</span>
                      <span>{thread.time}</span>
                    </div>
                  </div>
                  <div className="flex flex-col items-end text-sm text-gray-500">
                    <span>{thread.views} 浏览</span>
                    <span>{thread.replies} 回复</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>

      {/* 页脚 */}
      <footer className="bg-white border-t border-gray-100">
        <div className="max-w-[1200px] mx-auto px-4">
          {/* 主要内容 */}
          <div className="py-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Logo和简介 */}
            <div className="space-y-4">
              <div className="flex items-center gap-2 text-xl font-bold text-gray-900">
                <svg className="w-8 h-8 text-[#4285F4]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M20.24 12.24a6 6 0 0 0-8.49-8.49L5 10.5V19h8.5l6.74-6.76zM16 8L2 22M17.5 15H9" />
                </svg>
                万年社区
              </div>
              <p className="text-gray-600 text-sm">
                专业的加密货币交易分析社区，致力于为用户提供优质的交易策略和技术分析服务。
              </p>
              <div className="flex items-center gap-4 pt-2">
                <a href="#" className="text-gray-400 hover:text-[#4285F4] transition-colors">
                  <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M22.46 6c-.77.35-1.6.58-2.46.69.88-.53 1.56-1.37 1.88-2.38-.83.5-1.75.85-2.72 1.05C18.37 4.5 17.26 4 16 4c-2.35 0-4.27 1.92-4.27 4.29 0 .34.04.67.11.98C8.28 9.09 5.11 7.38 3 4.79c-.37.63-.58 1.37-.58 2.15 0 1.49.75 2.81 1.91 3.56-.71 0-1.37-.2-1.95-.5v.03c0 2.08 1.48 3.82 3.44 4.21a4.22 4.22 0 0 1-1.93.07 4.28 4.28 0 0 0 4 2.98 8.521 8.521 0 0 1-5.33 1.84c-.34 0-.68-.02-1.02-.06C3.44 20.29 5.7 21 8.12 21 16 21 20.33 14.46 20.33 8.79c0-.19 0-.37-.01-.56.84-.6 1.56-1.36 2.14-2.23z" />
                  </svg>
                </a>
                <a href="#" className="text-gray-400 hover:text-[#4285F4] transition-colors">
                  <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515a.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0a12.64 12.64 0 0 0-.617-1.25a.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057a19.9 19.9 0 0 0 5.993 3.03a.078.078 0 0 0 .084-.028a14.09 14.09 0 0 0 1.226-1.994a.076.076 0 0 0-.041-.106a13.107 13.107 0 0 1-1.872-.892a.077.077 0 0 1-.008-.128a10.2 10.2 0 0 0 .372-.292a.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127a12.299 12.299 0 0 1-1.873.892a.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028a19.839 19.839 0 0 0 6.002-3.03a.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419c0-1.333.956-2.419 2.157-2.419c1.21 0 2.176 1.096 2.157 2.42c0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419c0-1.333.955-2.419 2.157-2.419c1.21 0 2.176 1.096 2.157 2.42c0 1.333-.946 2.418-2.157 2.418z" />
                  </svg>
                </a>
                <a href="#" className="text-gray-400 hover:text-[#4285F4] transition-colors">
                  <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 15h-2v-6h2v6zm-1-7c-.55 0-1-.45-1-1s.45-1 1-1 1 .45 1 1-.45 1-1 1zm5 7h-2v-3c0-.55-.45-1-1-1s-1 .45-1 1v3h-2v-6h2v1.1c.52-.71 1.37-1.1 2.25-1.1 1.65 0 3 1.35 3 3v3z" />
                  </svg>
                </a>
              </div>
            </div>

            {/* 快速链接 */}
            <div>
              <h3 className="text-gray-900 font-bold mb-4">快速链接</h3>
              <ul className="space-y-3">
                <li>
                  <a href="#" className="text-gray-600 hover:text-[#4285F4] transition-colors text-sm">技术分析</a>
                </li>
                <li>
                  <a href="#" className="text-gray-600 hover:text-[#4285F4] transition-colors text-sm">交易策略</a>
                </li>
                <li>
                  <a href="#" className="text-gray-600 hover:text-[#4285F4] transition-colors text-sm">市场资讯</a>
                </li>
                <li>
                  <a href="#" className="text-gray-600 hover:text-[#4285F4] transition-colors text-sm">学习路径</a>
                </li>
              </ul>
            </div>

            {/* 帮助中心 */}
            <div>
              <h3 className="text-gray-900 font-bold mb-4">帮助中心</h3>
              <ul className="space-y-3">
                <li>
                  <a href="#" className="text-gray-600 hover:text-[#4285F4] transition-colors text-sm">新手指南</a>
                </li>
                <li>
                  <a href="#" className="text-gray-600 hover:text-[#4285F4] transition-colors text-sm">常见问题</a>
                </li>
                <li>
                  <a href="#" className="text-gray-600 hover:text-[#4285F4] transition-colors text-sm">用户协议</a>
                </li>
                <li>
                  <a href="#" className="text-gray-600 hover:text-[#4285F4] transition-colors text-sm">隐私政策</a>
                </li>
              </ul>
            </div>

            {/* 联系我们 */}
            <div>
              <h3 className="text-gray-900 font-bold mb-4">联系我们</h3>
              <ul className="space-y-3">
                <li className="flex items-center gap-2 text-gray-600 text-sm">
                  <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                  support@wannian.com
                </li>
                <li className="flex items-center gap-2 text-gray-600 text-sm">
                  <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                  400-888-8888
                </li>
                <li className="flex items-center gap-2 text-gray-600 text-sm">
                  <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  深圳市南山区科技园
                </li>
              </ul>
            </div>
          </div>

          {/* 版权信息 */}
          <div className="py-6 border-t border-gray-100">
            <div className="flex flex-col md:flex-row justify-between items-center gap-4">
              <p className="text-gray-600 text-sm">
                © 2024 万年社区. All rights reserved.
              </p>
              <div className="flex items-center gap-6">
                <a href="#" className="text-gray-600 hover:text-[#4285F4] transition-colors text-sm">
                  服务条款
                </a>
                <a href="#" className="text-gray-600 hover:text-[#4285F4] transition-colors text-sm">
                  隐私政策
                </a>
                <a href="#" className="text-gray-600 hover:text-[#4285F4] transition-colors text-sm">
                  Cookie 政策
                </a>
              </div>
            </div>
          </div>
        </div>
      </footer>

      {/* 学习路径选择模态框 */}
      {showModal && (
        <div 
          className="fixed inset-0 bg-black/50 flex items-center justify-center z-50"
          onClick={(e) => {
            if (e.target === e.currentTarget) {
              setShowModal(false);
            }
          }}
        >
          <div className="bg-white rounded-2xl max-w-[800px] w-full mx-4 p-6 relative">
            {/* 关闭按钮 */}
            <button 
              onClick={() => setShowModal(false)}
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-600"
            >
              <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M18 6L6 18M6 6l12 12" />
              </svg>
            </button>

            {/* 模态框标题 */}
            <div className="text-center mb-8">
              <h2 className="text-2xl font-bold mb-2">选择您的学习路径</h2>
              <p className="text-gray-600">根据您的经验水平选择合适的课程</p>
            </div>

            {/* 学习路径卡片 */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {learningPaths.map((path, index) => (
                <div
                  key={index}
                  className="bg-gray-50 rounded-xl p-6 hover:shadow-md transition-all cursor-pointer"
                  onClick={() => {
                    setShowModal(false);
                    // 这里可以添加路由跳转到具体课程
                    window.location.href = `/courses/${path.level.toLowerCase()}`;
                  }}
                >
                  <div className="text-3xl mb-4">{path.icon}</div>
                  <h3 className="text-lg font-bold mb-2">{path.title}</h3>
                  <p className="text-gray-600 text-sm mb-4">{path.description}</p>
                  
                  {/* 课程信息 */}
                  <div className="space-y-2">
                    <div className="flex items-center gap-2 text-sm text-gray-500">
                      <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <circle cx="12" cy="12" r="10" />
                        <path d="M12 6v6l4 2" />
                      </svg>
                      {path.duration}
                    </div>
                    <div className="flex items-center gap-2 text-sm text-gray-500">
                      <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
                      </svg>
                      {path.level}
                    </div>
                  </div>

                  {/* 主题标签 */}
                  <div className="mt-4 flex flex-wrap gap-2">
                    {path.topics.map((topic, i) => (
                      <span
                        key={i}
                        className="px-2 py-1 bg-white text-gray-600 text-xs rounded-md"
                      >
                        {topic}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            {/* 底部说明 */}
            <div className="mt-8 text-center text-sm text-gray-500">
              <p>选择课程后，您将获得专业的学习规划和指导</p>
              <p className="mt-2">如需帮助，请联系客服 <span className="text-[#4285F4]">18659111111</span></p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
