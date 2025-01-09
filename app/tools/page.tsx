'use client'

import { useState } from 'react';

export default function ToolsPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState('all');

  // 工具分类
  const categories = [
    { id: 'all', name: '全部工具' },
    { id: 'analysis', name: '分析工具' },
    { id: 'trading', name: '交易工具' },
    { id: 'research', name: '研究工具' },
    { id: 'alerts', name: '提醒工具' },
  ];

  // 工具数据
  const tools = [
    {
      id: 1,
      title: "K线分析助手",
      description: "专业的K线形态识别和技术分析工具",
      category: "analysis",
      icon: (
        <svg className="w-8 h-8" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
          <path d="M3 3v18h18" />
          <path d="M18.7 8l-5.1 5.2-2.8-2.7L7 14.3" />
        </svg>
      ),
      features: ["形态识别", "趋势分析", "支撑阻力"],
      users: "2.3k",
      isNew: true,
    },
    {
      id: 2,
      title: "智能交易系统",
      description: "一键设置交易策略，自动执行交易指令",
      category: "trading",
      icon: (
        <svg className="w-8 h-8" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
          <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
        </svg>
      ),
      features: ["策略编程", "风险控制", "绩效分析"],
      users: "1.8k",
      isPopular: true,
    },
    {
      id: 3,
      title: "市场研究平台",
      description: "深度市场研究和数据分析工具集",
      category: "research",
      icon: (
        <svg className="w-8 h-8" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
          <circle cx="11" cy="11" r="8" />
          <path d="M21 21l-4.35-4.35" />
        </svg>
      ),
      features: ["数据挖掘", "报告生成", "对比分析"],
      users: "1.5k",
      isNew: true,
    },
    {
      id: 4,
      title: "智能预警系统",
      description: "及时发现市场机会和风险提醒",
      category: "alerts",
      icon: (
        <svg className="w-8 h-8" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
          <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" />
          <path d="M13.73 21a2 2 0 0 1-3.46 0" />
        </svg>
      ),
      features: ["价格提醒", "形态提醒", "新闻提醒"],
      users: "3.2k",
      isPopular: true,
    },
    {
      id: 5,
      title: "量化回测工具",
      description: "策略回测和优化的专业工具",
      category: "analysis",
      icon: (
        <svg className="w-8 h-8" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
          <path d="M21 12V7H5a2 2 0 0 1 0-4h14v4" />
          <path d="M3 5v14a2 2 0 0 0 2 2h16v-5" />
          <path d="M18 12a2 2 0 0 0 0 4h4v-4h-4z" />
        </svg>
      ),
      features: ["历史回测", "参数优化", "绩效评估"],
      users: "1.2k",
    },
    {
      id: 6,
      title: "资金管理助手",
      description: "科学的资金管理和风险控制工具",
      category: "trading",
      icon: (
        <svg className="w-8 h-8" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
          <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
        </svg>
      ),
      features: ["仓位管理", "止损设置", "收益计算"],
      users: "2.1k",
    },
  ];

  // 过滤工具
  const filteredTools = tools.filter(tool => {
    const matchesSearch = tool.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         tool.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = activeCategory === 'all' || tool.category === activeCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="min-h-screen">
      <main className="max-w-[1200px] mx-auto px-4 py-8">
        {/* 顶部搜索和描述 */}
        <div className="mb-8">
          <h1 className="text-2xl font-bold mb-2">交易工具箱</h1>
          <p className="text-gray-600 mb-6">专业的交易工具集合，助力您的交易决策</p>
          <div className="relative">
            <input
              type="text"
              placeholder="搜索工具..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500/20 transition-all"
            />
            <svg
              className="absolute right-3 top-3 w-6 h-6 text-gray-400"
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
        <div className="flex gap-3 mb-8 overflow-x-auto pb-2">
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

        {/* 工具卡片网格 */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredTools.map(tool => (
            <div
              key={tool.id}
              className="group bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition-all cursor-pointer relative overflow-hidden"
            >
              {/* 新功能和热门标签 */}
              {tool.isNew && (
                <span className="absolute top-4 right-4 px-2 py-1 bg-blue-500 text-white text-xs rounded-full">
                  新功能
                </span>
              )}
              {tool.isPopular && (
                <span className="absolute top-4 right-4 px-2 py-1 bg-orange-500 text-white text-xs rounded-full">
                  热门
                </span>
              )}

              {/* 图标和标题 */}
              <div className="flex items-start justify-between mb-4">
                <div className="text-gray-400 group-hover:text-[#4285F4] transition-colors">
                  {tool.icon}
                </div>
              </div>
              <h3 className="text-lg font-bold mb-2 group-hover:text-[#4285F4] transition-colors">
                {tool.title}
              </h3>
              <p className="text-gray-600 text-sm mb-4">
                {tool.description}
              </p>

              {/* 功能标签 */}
              <div className="flex flex-wrap gap-2 mb-4">
                {tool.features.map((feature, index) => (
                  <span
                    key={index}
                    className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded-md"
                  >
                    {feature}
                  </span>
                ))}
              </div>

              {/* 用户数和使用按钮 */}
              <div className="flex items-center justify-between text-sm">
                <span className="flex items-center gap-1 text-gray-500">
                  <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
                    <circle cx="9" cy="7" r="4" />
                    <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
                    <path d="M16 3.13a4 4 0 0 1 0 7.75" />
                  </svg>
                  {tool.users} 用户
                </span>
                <button className="text-[#4285F4] hover:underline">
                  立即使用
                </button>
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
} 