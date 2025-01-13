'use client'

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function Register() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
    verificationCode: ''
  });

  const [countdown, setCountdown] = useState(0);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [showTermsModal, setShowTermsModal] = useState(false);
  const [showPrivacyModal, setShowPrivacyModal] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // 这里应该添加实际的注册逻辑和API调用
    // 现在只是模拟注册成功
    setShowSuccessModal(true);
    // 2秒后自动跳转到登录页
    setTimeout(() => {
      router.push('/login');
    }, 2000);
  };

  const handleSendVerificationCode = () => {
    if (!formData.email) {
      alert('请先输入邮箱地址');
      return;
    }
    // 这里应该添加发送验证码的逻辑
    setCountdown(60);
    const timer = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
  };

  return (
    <>
      <div className="fixed inset-0 flex items-center justify-center bg-[#f5f5f5]">
        <div className="w-full max-w-md bg-white p-8 rounded-2xl shadow-sm overflow-y-auto max-h-[90vh]">
          {/* Logo */}
          <div className="text-center">
            <h2 className="text-3xl font-bold text-gray-900 mb-2">创建账号</h2>
            <p className="text-gray-600">加入万年社区，开启您的交易之旅</p>
          </div>

          {/* 注册表单 */}
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
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                邮箱
              </label>
              <input
                id="email"
                type="email"
                required
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="w-full px-4 py-2 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#4285F4] focus:bg-white transition-all"
                placeholder="请输入邮箱"
              />
            </div>

            <div>
              <label htmlFor="verificationCode" className="block text-sm font-medium text-gray-700 mb-1">
                验证码
              </label>
              <div className="flex gap-3">
                <input
                  id="verificationCode"
                  type="text"
                  required
                  value={formData.verificationCode}
                  onChange={(e) => setFormData({ ...formData, verificationCode: e.target.value })}
                  className="flex-1 px-4 py-2 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#4285F4] focus:bg-white transition-all"
                  placeholder="请输入验证码"
                />
                <button
                  type="button"
                  onClick={handleSendVerificationCode}
                  disabled={countdown > 0}
                  className="px-4 py-2 bg-[#4285F4] text-white rounded-lg hover:bg-[#3367D6] disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors whitespace-nowrap text-sm min-w-[120px]"
                >
                  {countdown > 0 ? `${countdown}秒后重试` : '获取验证码'}
                </button>
              </div>
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

            <div>
              <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 mb-1">
                确认密码
              </label>
              <input
                id="confirmPassword"
                type="password"
                required
                value={formData.confirmPassword}
                onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                className="w-full px-4 py-2 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#4285F4] focus:bg-white transition-all"
                placeholder="请再次输入密码"
              />
            </div>

            <div className="flex items-center">
              <input
                id="agree-terms"
                name="agree-terms"
                type="checkbox"
                required
                className="h-4 w-4 text-[#4285F4] focus:ring-[#4285F4] border-gray-300 rounded"
              />
              <label htmlFor="agree-terms" className="ml-2 block text-sm text-gray-700">
                我已阅读并同意
                <button 
                  type="button"
                  onClick={(e) => {
                    e.preventDefault();
                    setShowTermsModal(true);
                  }} 
                  className="text-[#4285F4] hover:text-[#3367D6] ml-1"
                >
                  服务条款
                </button>
                和
                <button 
                  type="button"
                  onClick={(e) => {
                    e.preventDefault();
                    setShowPrivacyModal(true);
                  }} 
                  className="text-[#4285F4] hover:text-[#3367D6] ml-1"
                >
                  隐私政策
                </button>
              </label>
            </div>

            <button
              type="submit"
              className="w-full flex justify-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-[#4285F4] hover:bg-[#3367D6] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#4285F4]"
            >
              注册
            </button>

            <div className="text-center text-sm">
              <span className="text-gray-600">已有账号？</span>
              <Link href="/login" className="ml-1 text-[#4285F4] hover:text-[#3367D6]">
                立即登录
              </Link>
            </div>
          </form>
        </div>
      </div>

      {/* 服务条款模态框 */}
      {showTermsModal && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          <div className="absolute inset-0 bg-black opacity-30" onClick={() => setShowTermsModal(false)}></div>
          <div className="relative bg-white rounded-2xl p-8 shadow-xl max-w-2xl max-h-[80vh] overflow-y-auto">
            <button 
              onClick={() => setShowTermsModal(false)}
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-600"
            >
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
            <h2 className="text-2xl font-bold text-gray-900 mb-6">服务条款</h2>
            <div className="space-y-6 text-gray-600">
              <section>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">1. 服务协议的范围</h3>
                <p className="leading-relaxed">
                  本协议是用户（您）与万年社区（以下简称"我们"）之间就万年社区服务等相关事宜所订立的契约。请您仔细阅读本服务协议，如果您不同意本协议的任何条款，请不要注册或使用我们的服务。
                </p>
              </section>
              <section>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">2. 账号注册与安全</h3>
                <p className="leading-relaxed">
                  2.1 您承诺在注册时提供真实、准确、完整的个人资料，并在资料发生变更时及时更新。<br/>
                  2.2 您有责任维护账号和密码的安全性，并对您账号下的所有活动承担责任。<br/>
                  2.3 如发现任何未经授权使用您账号的情况，请立即通知我们。
                </p>
              </section>
              <section>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">3. 用户行为规范</h3>
                <p className="leading-relaxed">
                  3.1 您同意不发布任何违法、侵权、虚假或误导性的内容。<br/>
                  3.2 您同意不从事任何可能损害平台或其他用户利益的行为。<br/>
                  3.3 您同意遵守所有适用的法律法规和平台规则。
                </p>
              </section>
            </div>
          </div>
        </div>
      )}

      {/* 隐私政策模态框 */}
      {showPrivacyModal && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          <div className="absolute inset-0 bg-black opacity-30" onClick={() => setShowPrivacyModal(false)}></div>
          <div className="relative bg-white rounded-2xl p-8 shadow-xl max-w-2xl max-h-[80vh] overflow-y-auto">
            <button 
              onClick={() => setShowPrivacyModal(false)}
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-600"
            >
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
            <h2 className="text-2xl font-bold text-gray-900 mb-6">隐私政策</h2>
            <div className="space-y-6 text-gray-600">
              <section>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">1. 信息收集</h3>
                <p className="leading-relaxed">
                  我们收集的信息包括但不限于：您的用户名、电子邮件地址、密码等注册信息，以及您在使用我们服务时产生的交易记录、浏览历史等使用信息。
                </p>
              </section>
              <section>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">2. 信息使用</h3>
                <p className="leading-relaxed">
                  我们使用收集的信息来：<br/>
                  - 提供、维护和改进我们的服务<br/>
                  - 向您发送服务通知和更新<br/>
                  - 防止欺诈和提高安全性<br/>
                  - 进行数据分析和研究
                </p>
              </section>
              <section>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">3. 信息保护</h3>
                <p className="leading-relaxed">
                  我们采用行业标准的安全措施来保护您的个人信息，防止未经授权的访问、使用或泄露。我们承诺不会将您的个人信息出售、出租或交易给第三方。
                </p>
              </section>
            </div>
          </div>
        </div>
      )}

      {/* 成功提示模态框 */}
      {showSuccessModal && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          <div className="absolute inset-0 bg-black opacity-30"></div>
          <div className="relative bg-white rounded-2xl p-6 flex flex-col items-center shadow-xl animate-fade-in">
            <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center mb-4">
              <svg 
                className="w-8 h-8 text-green-500" 
                viewBox="0 0 24 24" 
                fill="none" 
                stroke="currentColor" 
                strokeWidth="2"
              >
                <path d="M20 6L9 17l-5-5" />
              </svg>
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">注册成功</h3>
            <p className="text-gray-600 mb-4">即将跳转到登录页面...</p>
          </div>
        </div>
      )}

      <style jsx>{`
        @keyframes fade-in {
          from {
            opacity: 0;
            transform: scale(0.95);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }
        .animate-fade-in {
          animation: fade-in 0.2s ease-out forwards;
        }
      `}</style>
    </>
  );
} 