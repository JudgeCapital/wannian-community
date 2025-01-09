'use client'

import { ArrowLeft } from "lucide-react";
import Link from "next/link";

export default function CreatePost() {
  return (
    <div className="min-h-screen bg-[#f5f5f5] pt-[60px]">
      <main className="max-w-[1200px] mx-auto px-4 py-8">
        <Link href="/" className="inline-flex items-center gap-2 text-gray-600 mb-6 hover:text-[#4285F4]">
          <ArrowLeft className="w-4 h-4" />
          返回
        </Link>

        <div className="bg-white rounded-xl p-6 shadow-sm">
          <h1 className="text-2xl font-bold mb-8">发布新帖子</h1>
          
          <form className="space-y-6">
            {/* 标题 */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                标题
              </label>
              <input
                type="text"
                className="w-full border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#4285F4]"
                placeholder="请输入帖子标题"
              />
            </div>

            {/* 内容 */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                内容
              </label>
              <textarea
                className="w-full border rounded-lg p-4 h-48 resize-none focus:outline-none focus:ring-2 focus:ring-[#4285F4]"
                placeholder="请输入帖子内容..."
              />
            </div>

            {/* 标签 */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                标签
              </label>
              <div className="flex flex-wrap gap-2">
                {['技术分析', '交易策略', '风险控制', '市场分析', '交易心理'].map((tag) => (
                  <label
                    key={tag}
                    className="inline-flex items-center gap-2 bg-gray-100 px-3 py-1 rounded-full cursor-pointer hover:bg-gray-200"
                  >
                    <input type="checkbox" className="hidden" />
                    <span className="text-sm text-gray-600">{tag}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* 提交按钮 */}
            <div className="flex justify-end gap-4">
              <button
                type="button"
                className="px-6 py-2 rounded-full border border-gray-300 hover:bg-gray-50"
              >
                保存草稿
              </button>
              <button
                type="submit"
                className="px-6 py-2 rounded-full bg-[#4285F4] text-white hover:bg-[#3367d6]"
              >
                发布帖子
              </button>
            </div>
          </form>
        </div>
      </main>
    </div>
  );
}