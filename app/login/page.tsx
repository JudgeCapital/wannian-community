'use client'

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useAuth } from '../contexts/AuthContext';

export default function Login() {
  const router = useRouter();
  const { login } = useAuth();
  const [formData, setFormData] = useState({
    username: '',
    password: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // 这里应该添加实际的登录逻辑和API调用
    // 现在只是模拟登录成功
    const mockUserData = {
      name: formData.username,
      email: `${formData.username}@example.com`,
      avatar: '/avatars/avatar1.svg',
      level: 'gold'
    };
    
    login(mockUserData);
    router.push('/profile');
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-[#f5f5f5]">
      <div className="w-full max-w-md bg-white p-8 rounded-2xl shadow-sm">
        {/* Logo */}
        <div className="text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-2">欢迎回来</h2>
          <p className="text-gray-600">登录万年社区，开启您的交易之旅</p>
        </div>

        {/* 登录表单 */}
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div>
            <label htmlFor="username" className="block text-sm font-medium text-gray-700 mb-1">
              用户名
            </label>
            <input
              id="username"
              type="text"
              required
              value={formData.username}
              onChange={(e) => setFormData({ ...formData, username: e.target.value })}
              className="w-full px-4 py-2 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#4285F4] focus:bg-white transition-all"
              placeholder="请输入用户名"
            />
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
              密码
            </label>
            <input
              id="password"
              type="password"
              required
              value={formData.password}
              onChange={(e) => setFormData({ ...formData, password: e.target.value })}
              className="w-full px-4 py-2 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#4285F4] focus:bg-white transition-all"
              placeholder="请输入密码"
            />
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <input
                id="remember-me"
                name="remember-me"
                type="checkbox"
                className="h-4 w-4 text-[#4285F4] focus:ring-[#4285F4] border-gray-300 rounded"
              />
              <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-700">
                记住我
              </label>
            </div>

            <div className="text-sm">
              <Link href="/forgot-password" className="text-[#4285F4] hover:text-[#3367D6]">
                忘记密码？
              </Link>
            </div>
          </div>

          <button
            type="submit"
            className="w-full flex justify-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-[#4285F4] hover:bg-[#3367D6] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#4285F4]"
          >
            登录
          </button>

          <div className="text-center text-sm">
            <span className="text-gray-600">还没有账号？</span>
            <Link href="/register" className="ml-1 text-[#4285F4] hover:text-[#3367D6]">
              立即注册
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
} 