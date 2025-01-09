'use client'

import { Search, Bell, User, ChevronDown, Clock } from "lucide-react";
import Link from "next/link";
import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import styles from './Header.module.css';
import NotificationModal from './NotificationModal';

// 定义导航项
const navItems = [
  { 
    title: '首页', 
    href: '/',
    icon: (
      <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
        <polyline points="9 22 9 12 15 12 15 22" />
      </svg>
    )
  },
  { 
    title: '内部讨论组', 
    href: '/discussion',
    icon: (
      <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M17 8h2a2 2 0 0 1 2 2v6a2 2 0 0 1-2 2h-2v4l-4-4H9a2 2 0 0 1-2-2v-6a2 2 0 0 1 2-2h8z" />
      </svg>
    )
  },
  { 
    title: '常用工具', 
    href: '/tools',
    icon: (
      <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z" />
      </svg>
    )
  },
  { 
    title: '数据展示', 
    href: '/data',
    icon: (
      <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M21 12V7a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2h4" />
        <line x1="3" y1="10" x2="21" y2="10" />
        <polyline points="17 21 13 17 17 13" />
      </svg>
    )
  },
  { 
    title: '返佣计划', 
    href: '/affiliate',
    icon: (
      <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
      </svg>
    )
  }
];

export default function Header() {
  const pathname = usePathname();
  const [showSearch, setShowSearch] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [showNotificationModal, setShowNotificationModal] = useState(false);
  const [selectedNotification, setSelectedNotification] = useState<{
    id: number;
    title: string;
    content: string;
    time: string;
    type: string;
  } | null>(null);

  // 搜索相关状态
  const [searchQuery, setSearchQuery] = useState('');
  const [searchHistory] = useState([
    "量化交易入门",
    "如何设置止损",
    "技术分析基础"
  ]);
  const [searchSuggestions] = useState([
    { type: 'course', title: "量化交易进阶课程", icon: "📚" },
    { type: 'post', title: "技术分析入门指南", icon: "📝" },
    { type: 'user', title: "交易达人", icon: "👤" }
  ]);
  const [hotSearches] = useState([
    { keyword: "技术分析", hot: true },
    { keyword: "量化交易", hot: true },
    { keyword: "风险控制", hot: false },
    { keyword: "K线形态", hot: false }
  ]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      console.log('Searching for:', searchQuery);
      setShowSearch(false);
    }
  };

  const handleSearchItemClick = (keyword: string) => {
    setSearchQuery(keyword);
    // 不再关闭搜索框
    // setShowSearch(false);
    
    // 自动聚焦到搜索框
    const searchInput = document.querySelector('input[type="text"]') as HTMLInputElement;
    if (searchInput) {
      searchInput.focus();
      // 将光标移动到文本末尾
      const len = searchInput.value.length;
      searchInput.setSelectionRange(len, len);
    }
  };

  // 模拟通知数据
  const notifications = [
    {
      id: 1,
      title: "新的课程已上线",
      content: "《量化交易进阶课程》现已上线，包含20节课程内容，带你深入了解量化交易策略。",
      time: "10分钟前",
      type: "course"
    },
    {
      id: 2,
      title: "您的帖子收到新回复",
      content: "用户@交易达人 回复了您的帖子《如何设置止损》：'建议可以结合ATR指标来设置止损位...'",
      time: "1小时前",
      type: "reply"
    },
    {
      id: 3,
      title: "系统维护通知",
      content: "系统将于本周六凌晨2:00-4:00进行例行维护，期间部分功能可能无法使用。",
      time: "2小时前",
      type: "system"
    }
  ];

  // 定时器引用
  const [searchTimer, setSearchTimer] = useState<NodeJS.Timeout | null>(null);
  const [notificationTimer, setNotificationTimer] = useState<NodeJS.Timeout | null>(null);

  // 添加用户菜单定时器
  const [userMenuTimer, setUserMenuTimer] = useState<NodeJS.Timeout | null>(null);

  // 处理搜索区域的鼠标事件
  const handleSearchMouseEnter = () => {
    if (searchTimer) {
      clearTimeout(searchTimer);
      setSearchTimer(null);
    }
    setShowNotifications(false);
    setShowUserMenu(false);
    setShowSearch(true);
  };

  const handleSearchMouseLeave = () => {
    const timer = setTimeout(() => {
      setShowSearch(false);
    }, 500);
    setSearchTimer(timer);
  };

  // 处理通知区域的鼠标事件
  const handleNotificationsMouseEnter = () => {
    if (notificationTimer) {
      clearTimeout(notificationTimer);
      setNotificationTimer(null);
    }
    setShowSearch(false);
    setShowUserMenu(false);
    setShowNotifications(true);
  };

  const handleNotificationsMouseLeave = () => {
    const timer = setTimeout(() => {
      setShowNotifications(false);
    }, 500);
    setNotificationTimer(timer);
  };

  // 处理用户菜单的鼠标事件
  const handleUserMenuMouseEnter = () => {
    if (userMenuTimer) {
      clearTimeout(userMenuTimer);
      setUserMenuTimer(null);
    }
    setShowSearch(false);
    setShowNotifications(false);
    setShowUserMenu(true);
  };

  const handleUserMenuMouseLeave = () => {
    const timer = setTimeout(() => {
      setShowUserMenu(false);
    }, 500);
    setUserMenuTimer(timer);
  };

  // 添加点击外部区域关闭的处理
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      if (!target.closest('.dropdown-container')) {
        setShowSearch(false);
        setShowNotifications(false);
        setShowUserMenu(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  // 添加事件监听器
  useEffect(() => {
    const handleNotificationClick = (event: CustomEvent) => {
      setSelectedNotification(event.detail);
      setShowNotificationModal(true);
    };

    window.addEventListener('notification-click', handleNotificationClick as EventListener);

    return () => {
      window.removeEventListener('notification-click', handleNotificationClick as EventListener);
    };
  }, []);

  return (
    <>
      <header className="h-[60px] bg-white border-b border-gray-200 fixed w-full top-0 z-50">
        <style jsx global>{`
          @keyframes dropDown {
            from {
              opacity: 0;
              transform: translateY(-20px);
            }
            to {
              opacity: 1;
              transform: translateY(0);
            }
          }

          @keyframes pullUp {
            from {
              opacity: 1;
              transform: translateY(0);
            }
            to {
              opacity: 0;
              transform: translateY(-20px);
            }
          }

          .dropdown-menu {
            animation: dropDown 0.2s ease-out forwards;
            transform-origin: top;
          }

          .dropdown-menu.hiding {
            animation: pullUp 0.2s ease-out forwards;
          }
        `}</style>
        
        <div className="max-w-[1200px] mx-auto h-full flex items-center justify-between px-4">
          <div className="flex items-center gap-8">
            <Link href="/">
              <div className="flex items-center gap-2 cursor-pointer group">
                {/* LOGO图形部分 */}
                <div className="w-8 h-8 flex items-center justify-center">
                  <svg
                    className="w-full h-full logo-spin transform transition-all duration-[1200ms]"
                    viewBox="0 0 36 36"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    style={{
                      transformOrigin: 'center'
                    }}
                  >
                    {/* 外圆环 */}
                    <circle 
                      cx="18" 
                      cy="18" 
                      r="16" 
                      stroke="url(#circleGradient)" 
                      strokeWidth="2" 
                      strokeLinecap="round"
                    />
                    {/* 内部图形 */}
                    <path
                      d="M18 8L23 13L18 18L13 13L18 8Z"
                      fill="#4285F4"
                      className="transform origin-center group-hover:scale-110 transition-transform duration-500"
                    />
                    <path
                      d="M18 18L23 23L18 28L13 23L18 18Z"
                      fill="#34A853"
                      className="transform origin-center group-hover:scale-110 transition-transform duration-500"
                    />
                    <path
                      d="M13 13L8 18L13 23L18 18L13 13Z"
                      fill="#FBBC05"
                      className="transform origin-center group-hover:scale-110 transition-transform duration-500"
                    />
                    <path
                      d="M23 13L28 18L23 23L18 18L23 13Z"
                      fill="#EA4335"
                      className="transform origin-center group-hover:scale-110 transition-transform duration-500"
                    />
                    {/* 中心圆点 */}
                    <circle cx="18" cy="18" r="2" fill="white"/>
                    <defs>
                      <linearGradient id="circleGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" stopColor="#4285F4">
                          <animate
                            attributeName="stop-color"
                            values="#4285F4; #EA4335; #FBBC05; #34A853; #4285F4"
                            dur="4s"
                            repeatCount="indefinite"
                          />
                        </stop>
                        <stop offset="100%" stopColor="#34A853">
                          <animate
                            attributeName="stop-color"
                            values="#34A853; #4285F4; #EA4335; #FBBC05; #34A853"
                            dur="4s"
                            repeatCount="indefinite"
                          />
                        </stop>
                      </linearGradient>
                    </defs>
                  </svg>
                </div>
                {/* LOGO文字部分 */}
                <div className="w-[130px] h-8 flex items-center">
                  <svg
                    className="w-full h-full logo-text transform transition-all duration-500 origin-left"
                    viewBox="0 0 140 36"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    {/* 萬年社区文字 */}
                    <text
                      x="0"
                      y="26"
                      className="text-xl font-bold"
                      fill="url(#textGradient)"
                      style={{
                        fontFamily: "'Noto Sans TC', 'Noto Sans SC', sans-serif",
                        letterSpacing: '0.08em',
                        filter: 'drop-shadow(0 1px 1px rgba(0, 0, 0, 0.05))',
                        fontSize: '24px',
                        fontWeight: '700'
                      }}
                    >
                      萬年社区
                    </text>
                    {/* 文字渐变效果 */}
                    <defs>
                      <linearGradient id="textGradient" x1="0" y1="0" x2="100%" y2="0">
                        <stop offset="0%" stopColor="#4285F4">
                          <animate
                            attributeName="stop-color"
                            values="#4285F4; #EA4335; #FBBC05; #34A853; #4285F4"
                            dur="4s"
                            repeatCount="indefinite"
                          />
                        </stop>
                        <stop offset="100%" stopColor="#34A853">
                          <animate
                            attributeName="stop-color"
                            values="#34A853; #4285F4; #EA4335; #FBBC05; #34A853"
                            dur="4s"
                            repeatCount="indefinite"
                          />
                        </stop>
                      </linearGradient>
                    </defs>
                  </svg>
                  {/* 装饰性下划线 */}
                  <div className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-[#4285F4] via-[#EA4335] to-[#34A853] group-hover:w-full transition-all duration-500"/>
                </div>
              </div>
            </Link>
            <nav className="hidden md:flex items-center gap-1">
              {navItems.map((item) => (
                <Link
                  key={item.title}
                  href={item.href}
                  className="relative group"
                >
                  <div className={`flex items-center gap-2 px-4 py-2 rounded-full transition-all duration-300 ${
                    pathname === item.href
                      ? 'text-white bg-[#4285F4] shadow-md' 
                      : 'text-gray-600 hover:bg-gray-50'
                  }`}>
                    {item.icon}
                    <span className="text-sm font-medium">{item.title}</span>
                  </div>
                  {/* 添加彩色下划线 */}
                  <div className={`absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-[#4285F4] via-[#EA4335] to-[#34A853] group-hover:w-full transition-all duration-500 ${
                    pathname === item.href ? 'hidden' : ''
                  }`}/>
                </Link>
              ))}
            </nav>
          </div>
          <div className="flex items-center gap-6">
            {/* 搜索按钮 */}
            <div 
              className="relative dropdown-container"
              onMouseEnter={handleSearchMouseEnter}
              onMouseLeave={handleSearchMouseLeave}
            >
              <button className="p-2 hover:bg-gray-100 rounded-full transition-colors">
                <Search className="w-5 h-5 text-gray-500" />
              </button>
              
              {/* 搜索下拉框 */}
              <div className={`absolute right-0 mt-2 w-[400px] bg-white rounded-xl shadow-lg border border-gray-100 overflow-hidden ${
                showSearch ? 'dropdown-enter' : 'dropdown-exit hidden'
              }`}>
                <div className="p-4">
                  <form onSubmit={handleSearch} className="relative">
                    <div className="relative">
                      <input
                        type="text"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        placeholder="搜索课程、帖子、用户..."
                        className="w-full pl-10 pr-4 py-2.5 bg-gray-50 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#4285F4] focus:bg-white transition-all text-[15px]"
                        autoFocus
                      />
                      <Search className="w-5 h-5 text-gray-400 absolute left-3 top-2.5" />
                      {searchQuery && (
                        <button
                          type="button"
                          onClick={() => setSearchQuery('')}
                          className="absolute right-3 top-2.5 text-gray-400 hover:text-gray-600 p-0.5 rounded-full hover:bg-gray-100 transition-colors"
                        >
                          <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <path d="M18 6L6 18M6 6l12 12" />
                          </svg>
                        </button>
                      )}
                    </div>
                  </form>

                  {searchQuery && (
                    <div className="mt-4">
                      <h3 className="text-sm text-gray-500 px-1 mb-2">搜索建议</h3>
                      {searchSuggestions.map((suggestion, index) => (
                        <button
                          key={index}
                          onClick={() => handleSearchItemClick(suggestion.title)}
                          className="w-full px-3 py-2 flex items-center gap-3 hover:bg-gray-50 transition-colors rounded-lg group"
                        >
                          <span className="text-lg">{suggestion.icon}</span>
                          <div className="flex-1 text-left">
                            <span className="text-sm text-gray-700 group-hover:text-[#4285F4]">
                              {suggestion.title}
                            </span>
                            <span className="ml-2 text-xs text-gray-400 group-hover:text-[#4285F4]/70">
                              {suggestion.type === 'course' ? '课程' : suggestion.type === 'post' ? '帖子' : '用户'}
                            </span>
                          </div>
                          <svg className="w-4 h-4 text-gray-400 group-hover:text-[#4285F4] opacity-0 group-hover:opacity-100 transition-all" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <path d="M5 12h14m-7-7l7 7-7 7" />
                          </svg>
                        </button>
                      ))}
                    </div>
                  )}

                  {!searchQuery && (
                    <>
                      {/* 搜索历史 */}
                      {searchHistory.length > 0 && (
                        <div className="mt-4">
                          <div className="flex justify-between items-center px-1 mb-2">
                            <h3 className="text-sm text-gray-500">搜索历史</h3>
                            <button className="text-sm text-[#4285F4] hover:text-[#3367D6] hover:underline">
                              清空
                            </button>
                          </div>
                          <div className="flex flex-wrap gap-2">
                            {searchHistory.map((item, index) => (
                              <button
                                key={index}
                                onClick={() => handleSearchItemClick(item)}
                                className="px-3 py-1.5 bg-gray-50 hover:bg-gray-100 rounded-full text-sm text-gray-600 transition-colors flex items-center gap-1.5 group"
                              >
                                <Clock className="w-3.5 h-3.5 text-gray-400 group-hover:text-gray-600" />
                                {item}
                              </button>
                            ))}
                          </div>
                        </div>
                      )}

                      {/* 热门搜索 */}
                      <div className="mt-4">
                        <h3 className="text-sm text-gray-500 px-1 mb-2">热门搜索</h3>
                        <div className="flex flex-wrap gap-2">
                          {hotSearches.map((item, index) => (
                            <button
                              key={index}
                              onClick={() => handleSearchItemClick(item.keyword)}
                              className={`px-3 py-1.5 rounded-full text-sm transition-colors flex items-center gap-1.5 group
                                ${item.hot 
                                  ? 'bg-[#4285F4]/5 text-[#4285F4] hover:bg-[#4285F4]/10' 
                                  : 'bg-gray-50 text-gray-600 hover:bg-gray-100'
                                }`}
                            >
                              {item.hot && (
                                <svg className="w-3.5 h-3.5 text-[#4285F4]" viewBox="0 0 24 24" fill="currentColor">
                                  <path d="M19.48 13.03A4 4 0 0 1 16 19h-4a4 4 0 1 1 0-8h1a1 1 0 0 0 1-1V8a1 1 0 0 1 1-1c.5 0 .9.3 1 .7l1.65 5.5a1 1 0 0 0 1.3.7 1 1 0 0 0 .6-1.2l-1-3.3a1 1 0 0 1 2-.6l.93 3.13z"/>
                                </svg>
                              )}
                              {item.keyword}
                            </button>
                          ))}
                        </div>
                      </div>
                    </>
                  )}
                </div>

                {/* 底部提示 */}
                <div className="p-3 bg-gray-50 text-xs text-gray-500 text-center border-t border-gray-100">
                  按 Enter 键搜索
                </div>
              </div>
            </div>

            {/* 通知按钮 */}
            <div 
              className="relative dropdown-container"
              onMouseEnter={handleNotificationsMouseEnter}
              onMouseLeave={handleNotificationsMouseLeave}
            >
              <button className="p-2 hover:bg-gray-100 rounded-full transition-colors relative">
                <Bell className="w-5 h-5 text-gray-500" />
                {notifications.length > 0 && (
                  <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full" />
                )}
              </button>

              {/* 通知下拉框 */}
              <div className={`absolute right-0 mt-2 w-80 bg-white rounded-xl shadow-lg border border-gray-100 overflow-hidden ${
                showNotifications ? 'dropdown-enter' : 'dropdown-exit hidden'
              }`}>
                <div className="p-4 border-b border-gray-100">
                  <div className="flex justify-between items-center">
                    <h3 className="font-medium">通知</h3>
                    <button className="text-sm text-[#4285F4] hover:text-[#3367D6]">
                      全部标记为已读
                    </button>
                  </div>
                </div>
                <div className="max-h-[400px] overflow-y-auto">
                  {notifications.map((notification) => (
                    <button
                      key={notification.id}
                      onClick={() => {
                        setShowNotifications(false);
                        setSelectedNotification(notification);
                        setShowNotificationModal(true);
                      }}
                      className="w-full p-4 text-left hover:bg-gray-50 transition-colors border-b border-gray-100 last:border-0"
                    >
                      <div className="flex gap-3">
                        {/* 通知类型图标 */}
                        <div className="flex-shrink-0">
                          {notification.type === 'course' && (
                            <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center">
                              <svg className="w-4 h-4 text-blue-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                <path d="M12 14l9-5-9-5-9 5 9 5z" />
                                <path d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" />
                              </svg>
                            </div>
                          )}
                          {notification.type === 'reply' && (
                            <div className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center">
                              <svg className="w-4 h-4 text-green-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                <path d="M21 11.5a8.38 8.38 0 01-.9 3.8 8.5 8.5 0 01-7.6 4.7 8.38 8.38 0 01-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 01-.9-3.8 8.5 8.5 0 014.7-7.6 8.38 8.38 0 013.8-.9h.5a8.48 8.48 0 018 8v.5z" />
                              </svg>
                            </div>
                          )}
                          {notification.type === 'system' && (
                            <div className="w-8 h-8 rounded-full bg-yellow-100 flex items-center justify-center">
                              <svg className="w-4 h-4 text-yellow-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                <path d="M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z" />
                                <line x1="12" y1="9" x2="12" y2="13" />
                                <line x1="12" y1="17" x2="12.01" y2="17" />
                              </svg>
                            </div>
                          )}
                        </div>
                        <div className="flex-1 min-w-0">
                          <h4 className="font-medium text-sm mb-1 truncate">
                            {notification.title}
                          </h4>
                          <p className="text-sm text-gray-500 mb-1 truncate">
                            {notification.content}
                          </p>
                          <p className="text-xs text-gray-400">
                            {notification.time}
                          </p>
                        </div>
                      </div>
                    </button>
                  ))}
                </div>
                <div className="p-4 border-t border-gray-100">
                  <button className="w-full text-center text-sm text-[#4285F4] hover:text-[#3367D6]">
                    查看全部通知
                  </button>
                </div>
              </div>
            </div>

            {/* 用户菜单 */}
            <div 
              className="relative dropdown-container"
              onMouseEnter={handleUserMenuMouseEnter}
              onMouseLeave={handleUserMenuMouseLeave}
            >
              <button 
                className="flex items-center gap-2 bg-white text-[#4285F4] border border-[#4285F4] px-4 py-2 rounded-full hover:bg-[#4285F4] hover:text-white transition-all duration-300"
              >
                <User className="w-4 h-4" />
                登录
                <ChevronDown className={`w-4 h-4 transition-transform duration-300 ${showUserMenu ? 'rotate-180' : ''}`} />
              </button>

              {/* 用户菜单下拉框 */}
              <div className={`absolute right-0 mt-2 w-[200px] bg-white rounded-xl shadow-lg overflow-hidden ${
                showUserMenu ? 'dropdown-enter' : 'dropdown-exit hidden'
              }`}>
                <Link 
                  href="/login" 
                  className="flex items-center gap-2 px-4 py-3 hover:bg-gray-50 text-gray-700"
                >
                  <User className="w-4 h-4" />
                  登录
                </Link>
                <Link 
                  href="/register" 
                  className="flex items-center gap-2 px-4 py-3 hover:bg-gray-50 text-gray-700"
                >
                  <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
                    <circle cx="9" cy="7" r="4" />
                    <path d="M19 8v6m3-3h-6" />
                  </svg>
                  注册
                </Link>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* 通知模态框 */}
      <NotificationModal
        showNotificationModal={showNotificationModal}
        setShowNotificationModal={setShowNotificationModal}
        selectedNotification={selectedNotification}
      />
    </>
  );
} 