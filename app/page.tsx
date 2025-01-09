'use client'

import Image from "next/image";
import { Search, Bell, User, ChevronDown, MessageSquare, TrendingUp, Users, Clock } from "lucide-react";
import Link from "next/link";
import { useState, useEffect } from 'react';

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
      <main className="max-w-[1200px] mx-auto px-4">
        {/* Hero Section */}
        <section className="relative py-20 mt-8">
          {/* Banner 背景 */}
          <div className="absolute inset-0 overflow-hidden rounded-[40px]">
            {/* 主背景渐变 - 保持不变 */}
            <div className="absolute inset-0 bg-gradient-to-r from-[#4285F4] via-[#5B9BFF] to-[#76ADFF] opacity-95" />
            
            {/* 装饰性图案 - 保持不变 */}
            <div className="absolute inset-0 opacity-5"
              style={{
                backgroundImage: `url("data:image/svg+xml,%3Csvg width='100' height='100' viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M11 18c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm48 25c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm-43-7c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm63 31c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3z' fill='%23ffffff' fill-opacity='1' fill-rule='evenodd'/%3E%3C/svg%3E")`,
                backgroundSize: '60px 60px'
              }}
            />
          </div>

          {/* 内容区域 */}
          <div className="relative max-w-[800px] mx-auto px-4">
            <div className="text-center text-white">
              <h1 className="text-4xl md:text-5xl font-bold mb-4">万年社区</h1>
              <p className="text-lg md:text-xl mb-8 opacity-90 max-w-[600px] mx-auto">
                从零开始学习技术分析，让交易成为时间的玫瑰
              </p>
              <div className="flex justify-center gap-4">
                <button 
                  onClick={() => setShowModal(true)}
                  className="bg-white text-[#4285F4] px-6 py-3 rounded-lg text-base font-medium hover:bg-opacity-90 transition-all hover:shadow-lg flex items-center gap-2"
                >
                  <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M5 3v4M3 5h4M6 17v4M4 19h4M13 3l4 4L7 17l-4-4L13 3z" />
                  </svg>
                  开始学习
                </button>
                <Link href="/about">
                  <button className="bg-transparent border border-white text-white px-6 py-3 rounded-lg text-base font-medium hover:bg-white/10 transition-all flex items-center gap-2">
                    <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <circle cx="11" cy="11" r="8" />
                      <path d="M21 21l-4.35-4.35" />
                    </svg>
                    了解更多
                  </button>
                </Link>
              </div>
            </div>
          </div>

          {/* 底部装饰 - 保持不变 */}
          <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-[#f5f5f5] to-transparent" />
        </section>

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
