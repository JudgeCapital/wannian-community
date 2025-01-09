'use client'

import { useState } from 'react';

export default function DataPage() {
  // 状态管理
  const [timeRange, setTimeRange] = useState('1d');
  const [activeTab, setActiveTab] = useState('overview');

  // 时间范围选项
  const timeRanges = [
    { id: '1d', name: '1天' },
    { id: '1w', name: '1周' },
    { id: '1m', name: '1月' },
    { id: '3m', name: '3月' },
    { id: '1y', name: '1年' },
  ];

  // 市场概览数据
  const marketOverview = [
    {
      title: '股票市场',
      change: '+2.34%',
      isPositive: true,
      value: '3,567.89',
      icon: (
        <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M3 3v18h18" />
          <path d="M18.7 8l-5.1 5.2-2.8-2.7L7 14.3" />
        </svg>
      ),
    },
    {
      title: '加密货币',
      change: '-1.23%',
      isPositive: false,
      value: '42,123.45',
      icon: (
        <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <circle cx="12" cy="12" r="9" />
          <path d="M14.5 9h-5v6h5" />
          <path d="M14.5 12h-5" />
        </svg>
      ),
    },
    {
      title: '外汇市场',
      change: '+0.45%',
      isPositive: true,
      value: '1.2345',
      icon: (
        <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
        </svg>
      ),
    },
    {
      title: '商品期货',
      change: '-0.67%',
      isPositive: false,
      value: '78.90',
      icon: (
        <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M12 3v3M3 12h3M21 12h-3M12 21v-3M12 12h.01" />
          <path d="M7 7l2 2M17 7l-2 2M7 17l2-2M17 17l-2-2" />
        </svg>
      ),
    },
  ];

  // 热门市场数据
  const hotMarkets = [
    {
      name: 'BTC/USDT',
      price: '42,123.45',
      change: '+2.34%',
      volume: '1.2B',
      trend: [40, 42, 45, 41, 44, 43, 42],
    },
    {
      name: 'ETH/USDT',
      price: '2,345.67',
      change: '-1.23%',
      volume: '789M',
      trend: [2300, 2400, 2350, 2250, 2300, 2400, 2345],
    },
    {
      name: 'EUR/USD',
      price: '1.2345',
      change: '+0.45%',
      volume: '456M',
      trend: [1.23, 1.24, 1.235, 1.232, 1.238, 1.234, 1.2345],
    },
  ];

  return (
    <div className="min-h-screen">
      <main className="max-w-[1200px] mx-auto px-4 py-8">
        {/* 顶部标题和时间范围选择 */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-2xl font-bold mb-2">市场数据</h1>
            <p className="text-gray-600">实时追踪全球金融市场动态</p>
          </div>
          <div className="flex gap-2">
            {timeRanges.map(range => (
              <button
                key={range.id}
                onClick={() => setTimeRange(range.id)}
                className={`px-4 py-2 rounded-lg transition-all ${
                  timeRange === range.id
                    ? 'bg-[#4285F4] text-white'
                    : 'bg-white text-gray-600 hover:bg-gray-50'
                }`}
              >
                {range.name}
              </button>
            ))}
          </div>
        </div>

        {/* 市场概览卡片 */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {marketOverview.map((market, index) => (
            <div
              key={index}
              className="bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition-all"
            >
              <div className="flex justify-between items-start mb-4">
                <div className="text-gray-400">{market.icon}</div>
                <span
                  className={`text-sm font-medium ${
                    market.isPositive ? 'text-green-500' : 'text-red-500'
                  }`}
                >
                  {market.change}
                </span>
              </div>
              <h3 className="text-gray-600 text-sm mb-1">{market.title}</h3>
              <p className="text-2xl font-bold">{market.value}</p>
            </div>
          ))}
        </div>

        {/* 标签页切换 */}
        <div className="bg-white rounded-xl shadow-sm mb-8">
          <div className="border-b border-gray-100">
            <div className="flex">
              <button
                onClick={() => setActiveTab('overview')}
                className={`px-6 py-4 text-sm font-medium transition-colors relative ${
                  activeTab === 'overview'
                    ? 'text-[#4285F4]'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                市场概览
                {activeTab === 'overview' && (
                  <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#4285F4]" />
                )}
              </button>
              <button
                onClick={() => setActiveTab('analysis')}
                className={`px-6 py-4 text-sm font-medium transition-colors relative ${
                  activeTab === 'analysis'
                    ? 'text-[#4285F4]'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                深度分析
                {activeTab === 'analysis' && (
                  <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#4285F4]" />
                )}
              </button>
            </div>
          </div>

          {/* 热门市场列表 */}
          <div className="p-6">
            <div className="grid gap-6">
              {hotMarkets.map((market, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between p-4 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  <div>
                    <h4 className="font-medium mb-1">{market.name}</h4>
                    <div className="flex items-center gap-3 text-sm">
                      <span className="text-gray-900 font-medium">
                        {market.price}
                      </span>
                      <span
                        className={market.change.startsWith('+') ? 'text-green-500' : 'text-red-500'}
                      >
                        {market.change}
                      </span>
                      <span className="text-gray-500">
                        成交量 {market.volume}
                      </span>
                    </div>
                  </div>
                  <div className="w-32 h-12">
                    {/* 这里可以添加迷你图表组件 */}
                    <div className="w-full h-full bg-gray-50 rounded flex items-end">
                      {market.trend.map((value, i) => (
                        <div
                          key={i}
                          style={{
                            height: `${(value / Math.max(...market.trend)) * 100}%`,
                            width: '8px',
                          }}
                          className={`mx-0.5 rounded-t ${
                            market.change.startsWith('+')
                              ? 'bg-green-500/20'
                              : 'bg-red-500/20'
                          }`}
                        />
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
} 