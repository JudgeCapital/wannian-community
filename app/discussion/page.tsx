'use client'

import { useState } from 'react';

export default function DiscussionPage() {
  // 状态管理
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState('all');

  // 分类数据
  const categories = [
    { id: 'all', name: '全部', color: 'bg-blue-500' },
    { id: 'technical', name: '技术分析', color: 'bg-green-500' },
    { id: 'fundamental', name: '基本面', color: 'bg-yellow-500' },
    { id: 'news', name: '新闻资讯', color: 'bg-purple-500' },
    { id: 'strategy', name: '交易策略', color: 'bg-red-500' },
  ];

  // 讨论组数据
  const discussions = [
    {
      id: 1,
      title: '技术分析交流',
      description: '讨论K线形态、技术指标和市场趋势',
      members: 1234,
      messages: 89,
      category: 'technical',
      lastActive: '10分钟前',
      tags: ['K线', '技术面', '趋势']
    },
    {
      id: 2,
      title: '基本面研究',
      description: '探讨经济数据、政策影响和公司基本面',
      members: 856,
      messages: 45,
      category: 'fundamental',
      lastActive: '2小时前',
      tags: ['经济', '政策', '基本面']
    },
    {
      id: 3,
      title: '每日市场资讯',
      description: '实时更新市场新闻和重要信息',
      members: 2341,
      messages: 156,
      category: 'news',
      lastActive: '5分钟前',
      tags: ['新闻', '快讯', '市场']
    },
    {
      id: 4,
      title: '策略分享',
      description: '交流交易策略和经验心得',
      members: 1567,
      messages: 234,
      category: 'strategy',
      lastActive: '1小时前',
      tags: ['策略', '经验', '交易']
    }
  ];

  // 过滤讨论组
  const filteredDiscussions = discussions.filter(discussion => {
    const matchesSearch = discussion.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         discussion.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = activeCategory === 'all' || discussion.category === activeCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="min-h-screen">
      <main className="max-w-[1200px] mx-auto px-4 py-8">
        {/* 顶部搜索和描述 */}
        <div className="mb-8">
          <h1 className="text-2xl font-bold mb-2">内部讨论组</h1>
          <p className="text-gray-600 mb-4">加入讨论组，与其他交易者交流经验和见解</p>
          <div className="relative">
            <input
              type="text"
              placeholder="搜索讨论组..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500/20 transition-all"
            />
            <svg
              className="absolute right-3 top-2.5 w-5 h-5 text-gray-400"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <circle cx="11" cy="11" r="8" />
              <path d="M21 21l-4.35-4.35" />
            </svg>
          </div>
        </div>

        {/* 分类标签 */}
        <div className="flex gap-2 mb-6 overflow-x-auto pb-2">
          {categories.map(category => (
            <button
              key={category.id}
              onClick={() => setActiveCategory(category.id)}
              className={`px-4 py-2 rounded-lg transition-all whitespace-nowrap ${
                activeCategory === category.id
                  ? 'bg-[#4285F4] text-white'
                  : 'bg-white text-gray-600 hover:bg-gray-50'
              }`}
            >
              {category.name}
            </button>
          ))}
        </div>

        {/* 讨论组列表 */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {filteredDiscussions.map(discussion => (
            <div
              key={discussion.id}
              className="bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition-all cursor-pointer"
            >
              <div className="flex justify-between items-start mb-3">
                <h3 className="font-bold text-lg">{discussion.title}</h3>
                <span className="text-sm text-gray-500">{discussion.lastActive}</span>
              </div>
              <p className="text-gray-600 text-sm mb-4">{discussion.description}</p>
              <div className="flex gap-2 mb-4 flex-wrap">
                {discussion.tags.map((tag, index) => (
                  <span
                    key={index}
                    className="px-2 py-1 bg-gray-100 rounded-md text-xs text-gray-600"
                  >
                    {tag}
                  </span>
                ))}
              </div>
              <div className="flex items-center justify-between text-sm text-gray-500">
                <div className="flex items-center gap-4">
                  <span className="flex items-center gap-1">
                    <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
                      <circle cx="9" cy="7" r="4" />
                      <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
                      <path d="M16 3.13a4 4 0 0 1 0 7.75" />
                    </svg>
                    {discussion.members}
                  </span>
                  <span className="flex items-center gap-1">
                    <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" />
                    </svg>
                    {discussion.messages}
                  </span>
                </div>
                <button className="text-[#4285F4] hover:underline">
                  加入讨论
                </button>
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
} 