'use client'

import { useState } from 'react';
import Link from 'next/link';

export default function CommunityDiscussion() {
  const [activeTab, setActiveTab] = useState<'latest' | 'hot'>('latest');
  const [isAnimating, setIsAnimating] = useState(false);

  // 模拟数据
  const latestPosts = [
    { id: 1, title: '技术分析', topics: 234, users: 1890, icon: '📊' },
    { id: 2, title: '交易策略', topics: 156, users: 890, icon: '💡' },
    { id: 3, title: '市场动态', topics: 342, users: 2341, icon: '📈' },
    { id: 4, title: '新手问答', topics: 567, users: 3421, icon: '❓' },
    { id: 5, title: '工具分享', topics: 123, users: 678, icon: '🛠' },
    { id: 6, title: '经验交流', topics: 445, users: 2156, icon: '💬' }
  ];

  const hotPosts = [
    { id: 1, title: '市场动态', topics: 342, users: 2341, icon: '📈' },
    { id: 2, title: '新手问答', topics: 567, users: 3421, icon: '❓' },
    { id: 3, title: '技术分析', topics: 234, users: 1890, icon: '📊' },
    { id: 4, title: '经验交流', topics: 445, users: 2156, icon: '💬' },
    { id: 5, title: '交易策略', topics: 156, users: 890, icon: '💡' },
    { id: 6, title: '工具分享', topics: 123, users: 678, icon: '🛠' }
  ];

  const handleTabChange = (tab: 'latest' | 'hot') => {
    if (activeTab !== tab && !isAnimating) {
      setIsAnimating(true);
      setActiveTab(tab);
      // 动画结束后重置状态
      setTimeout(() => setIsAnimating(false), 300);
    }
  };

  const currentPosts = activeTab === 'latest' ? latestPosts : hotPosts;

  return (
    <div className="py-8">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">社区讨论</h2>
        <div className="flex gap-4">
          <button
            onClick={() => handleTabChange('latest')}
            className={`px-4 py-2 rounded-lg transition-colors ${
              activeTab === 'latest'
                ? 'bg-[#4285F4] text-white'
                : 'text-gray-600 hover:bg-gray-100'
            }`}
          >
            最新
          </button>
          <button
            onClick={() => handleTabChange('hot')}
            className={`px-4 py-2 rounded-lg transition-colors ${
              activeTab === 'hot'
                ? 'bg-[#4285F4] text-white'
                : 'text-gray-600 hover:bg-gray-100'
            }`}
          >
            热门
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {currentPosts.map((post) => (
          <Link 
            href={`/posts/${post.id}`} 
            key={post.id}
            className={`bg-white rounded-xl p-6 hover:shadow-md transition-all cursor-pointer
              ${isAnimating ? 'animate-cardChange' : ''}`}
          >
            <div className="flex items-center gap-4">
              <span className="text-2xl">{post.icon}</span>
              <div className="flex-1">
                <h3 className="text-lg font-semibold mb-2">{post.title}</h3>
                <div className="flex items-center text-sm text-gray-500 gap-4">
                  <span>{post.topics} 主题</span>
                  <span>{post.users} 帖子</span>
                </div>
              </div>
              <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
              </svg>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}