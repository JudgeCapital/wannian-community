'use client'

import Image from 'next/image';
import Link from 'next/link';

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-[#f5f5f5]">
      <main className="max-w-[1200px] mx-auto px-4 py-12">
        {/* Hero Section */}
        <section className="relative py-20 mt-8">
          <div className="absolute inset-0 overflow-hidden rounded-[40px]">
            <div className="absolute inset-0 bg-gradient-to-r from-[#4285F4] via-[#5B9BFF] to-[#76ADFF] opacity-95" />
            <div className="absolute inset-0 opacity-5"
              style={{
                backgroundImage: `url("data:image/svg+xml,%3Csvg width='100' height='100' viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M11 18c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm48 25c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm-43-7c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm63 31c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3z' fill='%23ffffff' fill-opacity='1' fill-rule='evenodd'/%3E%3C/svg%3E")`,
                backgroundSize: '60px 60px'
              }}
            />
          </div>

          <div className="relative text-center text-white">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">关于我们</h1>
            <p className="text-lg md:text-xl mb-8 opacity-90 max-w-[600px] mx-auto">
              万年社区致力于为交易者提供专业的学习平台和交流社区
            </p>
          </div>
        </section>

        {/* 关于我们内容 */}
        <section className="py-12">
          <div className="bg-white rounded-xl p-8 shadow-sm">
            <div className="max-w-[800px] mx-auto">
              <h2 className="text-2xl font-bold mb-6">我们的使命</h2>
              <p className="text-gray-600 mb-8 leading-relaxed">
                万年社区成立于2023年，是一个专注于数字货币交易的学习和交流平台。我们的使命是帮助每一位交易者建立正确的交易理念，掌握专业的交易技能，在市场中稳健盈利。
              </p>

              <h2 className="text-2xl font-bold mb-6">我们的优势</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                {[
                  {
                    title: "专业的教学团队",
                    desc: "拥有多年交易经验的专业讲师团队",
                    icon: "👨‍🏫"
                  },
                  {
                    title: "系统的课程体系",
                    desc: "从入门到进阶的完整学习路径",
                    icon: "📚"
                  },
                  {
                    title: "活跃的社区氛围",
                    desc: "良好的交流环境，互帮互助",
                    icon: "💬"
                  },
                  {
                    title: "丰富的实践机会",
                    desc: "真实的交易环境，实战演练",
                    icon: "🎯"
                  }
                ].map((item, index) => (
                  <div key={index} className="bg-gray-50 rounded-xl p-6">
                    <div className="text-3xl mb-4">{item.icon}</div>
                    <h3 className="text-lg font-bold mb-2">{item.title}</h3>
                    <p className="text-gray-600">{item.desc}</p>
                  </div>
                ))}
              </div>

              <h2 className="text-2xl font-bold mb-6">联系我们</h2>
              <div className="bg-gray-50 rounded-xl p-6">
                <div className="space-y-4">
                  <p className="flex items-center gap-3">
                    <span className="text-xl">📧</span>
                    <span className="text-gray-600">邮箱：contact@wannian.com</span>
                  </p>
                  <p className="flex items-center gap-3">
                    <span className="text-xl">💬</span>
                    <span className="text-gray-600">微信：wannian_support</span>
                  </p>
                  <p className="flex items-center gap-3">
                    <span className="text-xl">📱</span>
                    <span className="text-gray-600">电话：400-123-4567</span>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
} 