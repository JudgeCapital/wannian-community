'use client'

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';

interface BannerContent {
  type: "text" | "image";
  text: string;
  image?: string;
  id: number;
}

export default function AffiliatePage() {
  const bannerContents: BannerContent[] = [
    {
      type: "text",
      text: "加入万年社区返佣计划，享受高额返佣，共同成长",
      id: 0
    },
    {
      type: "image",
      text: "",
      image: "/banners/banner1.jpg",
      id: 1
    },
    {
      type: "image",
      text: "",
      image: "/banners/banner2.jpg",
      id: 2
    }
  ];

  const [currentBanner, setCurrentBanner] = useState(0);
  const [showSuccessModal, setShowSuccessModal] = useState(false);

  // 添加表单状态管理
  const [formData, setFormData] = useState({
    platform: '',
    uid: '',
    contact: '',
    remark: ''
  });

  // 添加错误状态管理
  const [formErrors, setFormErrors] = useState({
    platform: false,
    uid: false,
    contact: false
  });

  // 处理输入变化
  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
    // 当用户开始输入时，清除对应的错误提示
    setFormErrors(prev => ({
      ...prev,
      [field]: false
    }));
  };

  // 自动轮播
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentBanner((prev) => (prev + 1) % bannerContents.length);
    }, 5000); // 每5秒切换一次

    return () => clearInterval(timer);
  }, []);

  // 修改表单提交处理
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // 验证必填字段
    const errors = {
      platform: !formData.platform,
      uid: !formData.uid,
      contact: !formData.contact
    };
    
    // 如果有错误，显示错误提示
    if (Object.values(errors).some(error => error)) {
      setFormErrors(errors);
      return;
    }
    
    // 验证通过，显示成功弹窗
    setShowSuccessModal(true);
    setTimeout(() => {
      setShowSuccessModal(false);
    }, 3000);
  };

  return (
    <div className="min-h-screen bg-[#f5f5f5]">
      <main className="max-w-[1200px] mx-auto px-4 py-12">
        {/* Hero Section - 轮播版 */}
        <section className="relative py-16 mt-8 mb-12">
          <div className="absolute inset-0 overflow-hidden rounded-[40px]">
            {bannerContents.map((banner, index) => (
              <div
                key={banner.id}
                className={`absolute inset-0 transition-opacity duration-500 ${
                  index === currentBanner ? 'opacity-100' : 'opacity-0'
                }`}
              >
                {banner.type === "text" ? (
                  // 文字背景
                  <>
                    <div className="absolute inset-0 bg-gradient-to-r from-[#4285F4] via-[#5B9BFF] to-[#76ADFF] opacity-95" />
                    <div className="absolute inset-0 opacity-5"
                      style={{
                        backgroundImage: `url("data:image/svg+xml,%3Csvg width='100' height='100' viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M11 18c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm48 25c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm-43-7c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm63 31c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3z' fill='%23ffffff' fill-opacity='1' fill-rule='evenodd'/%3E%3C/svg%3E")`,
                        backgroundSize: '60px 60px'
                      }}
                    />
                  </>
                ) : banner.image ? (
                  // 图片背景
                  <div className="absolute inset-0">
                    <Image
                      src={banner.image}
                      alt={banner.text}
                      fill
                      sizes="100vw"
                      className="object-cover rounded-[40px]"
                      priority={true}
                      quality={90}
                    />
                    {/* 添加渐变遮罩以确保文字可读性 */}
                    <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-black/20 to-black/30 rounded-[40px]" />
                  </div>
                ) : null}
              </div>
            ))}

            {/* 底部渐变保持不变 */}
            <div className="absolute bottom-0 left-0 right-0 h-32">
              <div className="absolute inset-0 bg-gradient-to-t from-[#f5f5f5] via-[#f5f5f5]/60 to-transparent" />
              <div className="absolute inset-0 bg-gradient-to-t from-[#4285F4]/10 via-[#4285F4]/5 to-transparent" />
              <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/5 to-transparent" />
            </div>
          </div>

          {/* 文字内容和指示器 */}
          <div className="relative h-full flex flex-col justify-center" style={{ minHeight: '192px' }}>
            <div className="flex items-center justify-center flex-1">
              {bannerContents.map((banner, index) => (
                <div
                  key={banner.id}
                  className={`absolute transition-all duration-500 ease-in-out ${
                    index === currentBanner 
                      ? 'opacity-100 translate-y-0' 
                      : 'opacity-0 translate-y-8'
                  }`}
                >
                  <p className="text-xl md:text-2xl lg:text-3xl text-white font-medium max-w-[800px] text-center leading-relaxed">
                    {banner.text}
                  </p>
                </div>
              ))}
            </div>

            {/* 轮播指示器保持不变 */}
            <div className="flex justify-center gap-2 mt-3">
              {bannerContents.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentBanner(index)}
                  className={`w-2 h-2 rounded-full transition-all duration-300 ${
                    index === currentBanner 
                      ? 'bg-white w-6' 
                      : 'bg-white/50 hover:bg-white/70'
                  }`}
                  aria-label={`切换到第 ${index + 1} 个banner`}
                />
              ))}
            </div>
          </div>
        </section>

        {/* 交易平台列表 */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {[
            {
              name: "Bitget",
              logo: "/exchanges/bitget.png",
              features: [
                "全网最高比例",
                "唯一全自动每日返佣",
                "多种币种支持"
              ],
              commission: "40%",
              commissionType: "日返佣",
              registerLink: "https://partner.bitget.fit/bg/N721HU"
            },
            {
              name: "Bybit",
              logo: "/exchanges/bybit.png",
              features: [
                "全球领先交易平台",
                "丰富的交易品种",
                "专业的技术支持"
              ],
              commission: "30%",
              commissionType: "月返佣",
              registerLink: "https://partner.bybit.com/b/wannian"
            },
            {
              name: "Okx",
              logo: "/exchanges/okx.png",
              features: [
                "老牌交易所值得信赖",
                "出入金便捷",
                "产品种类丰富"
              ],
              commission: "30%",
              commissionType: "月返佣",
              registerLink: "https://www.okx.com/zh-hans/join/10116671"
            },
            {
              name: "Binance",
              logo: "/exchanges/binance.png",
              features: [
                "全球最大交易所",
                "流动性最佳",
                "全方位客户服务"
              ],
              commission: "25%",
              commissionType: "月返佣",
              registerLink: "https://accounts.binance.com/register?ref=WANNIAN"
            }
          ].map((exchange) => (
            <div key={exchange.name} className="bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition-all duration-300">
              <div className="flex flex-col items-center">
                <div className="w-24 h-24 relative mb-4">
                  <Image
                    src={exchange.logo}
                    alt={exchange.name}
                    fill
                    className="object-contain p-2"
                    priority={true}
                  />
                </div>
                <h3 className="text-xl font-bold mb-4">{exchange.name}</h3>
                <div className="text-[#4285F4] font-bold text-2xl mb-4">
                  {exchange.commission}
                  <span className="text-sm ml-1">{exchange.commissionType}</span>
                </div>
                <ul className="space-y-2 text-sm text-gray-600 mb-6">
                  {exchange.features.map((feature, i) => (
                    <li key={i} className="flex items-center">
                      <svg className="w-4 h-4 text-[#4285F4] mr-2" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M5 13l4 4L19 7" />
                      </svg>
                      {feature}
                    </li>
                  ))}
                </ul>
                <Link 
                  href={exchange.registerLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full bg-[#4285F4] text-white py-3 px-6 rounded-lg text-center hover:bg-[#4285F4]/90 transition-colors"
                >
                  立即注册
                </Link>
              </div>
            </div>
          ))}
        </div>

        {/* 用户登记表单 */}
        <div className="bg-white rounded-xl p-8 relative">
          <div className="text-center mb-8">
            <h2 className="text-2xl font-bold text-[#4285F4]">用户登记</h2>
          </div>

          <form className="max-w-[600px] mx-auto relative" onSubmit={handleSubmit}>
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* 交易平台选择 */}
                <div>
                  <label className="block text-sm text-gray-600 mb-2 flex items-center">
                    交易平台
                    {formErrors.platform && (
                      <span className="ml-2 text-red-500 flex items-center">
                        <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                        </svg>
                      </span>
                    )}
                  </label>
                  <div className="relative">
                    <select 
                      className={`w-full h-12 pl-4 pr-10 bg-[#f8f9fa] rounded-xl border-0 ring-1 ${
                        formErrors.platform ? 'ring-red-500' : 'ring-gray-100'
                      } focus:ring-2 focus:ring-[#4285F4] appearance-none transition-all`}
                      value={formData.platform}
                      onChange={(e) => handleInputChange('platform', e.target.value)}
                    >
                      <option value="" disabled>请选择平台</option>
                      <option value="bitget">Bitget</option>
                      <option value="bybit">Bybit</option>
                      <option value="binance">Binance</option>
                      <option value="okx">OKX</option>
                    </select>
                    {formErrors.platform && (
                      <p className="mt-1 text-xs text-red-500">请选择交易平台</p>
                    )}
                  </div>
                </div>

                {/* UID输入 */}
                <div>
                  <label className="block text-sm text-gray-600 mb-2 flex items-center">
                    交易所UID/用户ID
                    {formErrors.uid && (
                      <span className="ml-2 text-red-500 flex items-center">
                        <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                        </svg>
                      </span>
                    )}
                  </label>
                  <input 
                    type="text"
                    placeholder="请输入您的交易所UID"
                    className={`w-full h-12 px-4 bg-[#f8f9fa] rounded-xl border-0 ring-1 ${
                      formErrors.uid ? 'ring-red-500' : 'ring-gray-100'
                    } focus:ring-2 focus:ring-[#4285F4] placeholder-gray-400 transition-all`}
                    value={formData.uid}
                    onChange={(e) => handleInputChange('uid', e.target.value)}
                  />
                  {formErrors.uid && (
                    <p className="mt-1 text-xs text-red-500">请输入交易所UID</p>
                  )}
                </div>
              </div>

              {/* 联系方式 */}
              <div>
                <label className="block text-sm text-gray-600 mb-2 flex items-center">
                  联系方式
                  {formErrors.contact && (
                    <span className="ml-2 text-red-500 flex items-center">
                      <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                      </svg>
                    </span>
                  )}
                </label>
                <input 
                  type="text"
                  placeholder="请输入您的微信号/手机号"
                  className={`w-full h-12 px-4 bg-[#f8f9fa] rounded-xl border-0 ring-1 ${
                    formErrors.contact ? 'ring-red-500' : 'ring-gray-100'
                  } focus:ring-2 focus:ring-[#4285F4] placeholder-gray-400 transition-all`}
                  value={formData.contact}
                  onChange={(e) => handleInputChange('contact', e.target.value)}
                />
                {formErrors.contact && (
                  <p className="mt-1 text-xs text-red-500">请输入联系方式</p>
                )}
              </div>

              {/* 备注说明 */}
              <div className="relative">
                <label className="block text-sm text-gray-600 mb-2">
                  备注说明
                </label>
                <textarea 
                  rows={4}
                  placeholder="如有特殊说明请在此备注"
                  className="w-full px-4 py-3 bg-[#f8f9fa] rounded-lg border border-gray-200 focus:outline-none focus:border-[#4285F4] transition-all resize-none relative z-10"
                  style={{ pointerEvents: 'auto' }}
                />
              </div>

              {/* 提交按钮 */}
              <button 
                type="submit"
                className="w-full h-12 mt-2 bg-gradient-to-r from-[#4285F4] to-[#5B9BFF] text-white rounded-xl hover:opacity-90 transition-opacity"
              >
                提交登记
              </button>
            </div>
          </form>

          {/* 温馨提示 */}
          <div className="mt-8 p-4 bg-[#f8f9fa] rounded-lg border border-gray-200 relative z-0">
            <div className="flex gap-3">
              <svg className="w-5 h-5 text-[#4285F4] flex-shrink-0 mt-0.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <div>
                <h4 className="text-sm font-medium text-gray-800 mb-2">温馨提示</h4>
                <ul className="text-sm text-gray-600 space-y-1.5">
                  <li>• 请确保使用返佣链接注册账户</li>
                  <li>• 提交登记信息后会有专人与您联系</li>
                  <li>• 返佣比例会根据平台政策调整</li>
                  <li>• 如有疑问请联系客服</li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* 添加底部装饰 */}
        <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-[#f5f5f5] to-transparent" />
      </main>

      {/* 成功提示弹窗 */}
      {showSuccessModal && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          {/* 背景遮罩 */}
          <div className="absolute inset-0 bg-black/30 backdrop-blur-sm" />
          
          {/* 弹窗内容 */}
          <div className="bg-white rounded-xl p-6 shadow-xl relative z-10 animate-fadeIn">
            <div className="flex flex-col items-center">
              {/* 成功图标 */}
              <div className="w-16 h-16 bg-[#4285F4]/10 rounded-full flex items-center justify-center mb-4">
                <svg 
                  className="w-8 h-8 text-[#4285F4]" 
                  viewBox="0 0 24 24" 
                  fill="none" 
                  stroke="currentColor" 
                  strokeWidth="2"
                >
                  <path d="M5 13l4 4L19 7" />
                </svg>
              </div>
              
              {/* 提示文字 */}
              <h3 className="text-xl font-bold text-gray-800 mb-2">
                登记成功
              </h3>
              <p className="text-gray-600 text-center">
                我们会尽快与您联系，请保持电话畅通
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

// 在文件末尾添加动画样式
const styles = `
  @keyframes fadeIn {
    from {
      opacity: 0;
      transform: scale(0.95);
    }
    to {
      opacity: 1;
      transform: scale(1);
    }
  }

  .animate-fadeIn {
    animation: fadeIn 0.2s ease-out;
  }
`;

// 添加样式到 head
if (typeof document !== 'undefined') {
  const styleSheet = document.createElement("style");
  styleSheet.textContent = styles;
  document.head.appendChild(styleSheet);
} 