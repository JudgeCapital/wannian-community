'use client'

import { ArrowLeft, Heart, MessageSquare, Share2, Bookmark } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

// 模拟帖子数据
const postData = {
  id: 1,
  title: "如何正确设置止损位？",
  content: `止损是交易中最重要的环节之一，合理的止损可以帮助我们：

1. 控制风险
2. 保护利润
3. 避免情绪化交易

以下是我的一些经验分享...`,
  author: {
    name: "交易达人",
    avatar: "/images/avatar.jpg",
    level: "专家"
  },
  stats: {
    views: "2.3k",
    likes: 156,
    replies: 56
  },
  tags: ["技术分析", "风险控制", "交易心理"],
  createdAt: "2024-03-20 14:30"
};

// 模拟评论数据
const comments = [
  {
    id: 1,
    author: {
      name: "量化小白",
      avatar: "/images/avatar-1.jpg",
    },
    content: "这个建议非常实用，谢谢分享！",
    likes: 23,
    createdAt: "2小时前"
  },
  // ... 更多评论
];

export default function PostDetail() {
  return (
    <div className="min-h-screen bg-[#f5f5f5] pt-[60px]">
      <main className="max-w-[1200px] mx-auto px-4 py-8">
        {/* 返回按钮 */}
        <Link href="/" className="inline-flex items-center gap-2 text-gray-600 mb-6 hover:text-[#4285F4]">
          <ArrowLeft className="w-4 h-4" />
          返回列表
        </Link>

        {/* 帖子内容 */}
        <div className="bg-white rounded-xl p-6 shadow-sm mb-6">
          {/* 帖子头部 */}
          <div className="flex justify-between items-start mb-6">
            <div className="flex gap-4">
              <div className="relative w-12 h-12">
                <Image
                  src={postData.author.avatar}
                  alt={postData.author.name}
                  fill
                  className="rounded-full object-cover"
                />
              </div>
              <div>
                <h3 className="font-bold">{postData.author.name}</h3>
                <div className="flex items-center gap-2 text-sm text-gray-500">
                  <span className="bg-blue-100 text-blue-600 px-2 py-0.5 rounded">
                    {postData.author.level}
                  </span>
                  <span>{postData.createdAt}</span>
                </div>
              </div>
            </div>
            <button className="text-gray-500 hover:text-[#4285F4]">
              <Share2 className="w-5 h-5" />
            </button>
          </div>

          {/* 帖子标题 */}
          <h1 className="text-2xl font-bold mb-4">{postData.title}</h1>

          {/* 帖子内容 */}
          <div className="prose max-w-none mb-6">
            <p className="text-gray-600 whitespace-pre-line">{postData.content}</p>
          </div>

          {/* 标签 */}
          <div className="flex gap-2 mb-6">
            {postData.tags.map((tag) => (
              <span
                key={tag}
                className="bg-gray-100 text-gray-600 px-3 py-1 rounded-full text-sm"
              >
                {tag}
              </span>
            ))}
          </div>

          {/* 互动按钮 */}
          <div className="flex items-center gap-6 border-t pt-4">
            <button className="flex items-center gap-2 text-gray-500 hover:text-[#4285F4]">
              <Heart className="w-5 h-5" />
              <span>{postData.stats.likes}</span>
            </button>
            <button className="flex items-center gap-2 text-gray-500 hover:text-[#4285F4]">
              <MessageSquare className="w-5 h-5" />
              <span>{postData.stats.replies}</span>
            </button>
            <button className="flex items-center gap-2 text-gray-500 hover:text-[#4285F4]">
              <Bookmark className="w-5 h-5" />
              收藏
            </button>
          </div>
        </div>

        {/* 评论区 */}
        <div className="bg-white rounded-xl p-6 shadow-sm">
          <h3 className="font-bold text-lg mb-6">评论 ({comments.length})</h3>
          
          {/* 评论输入框 */}
          <div className="mb-8">
            <textarea
              className="w-full border rounded-lg p-4 h-24 resize-none focus:outline-none focus:ring-2 focus:ring-[#4285F4]"
              placeholder="写下你的评论..."
            />
            <div className="flex justify-end mt-2">
              <button className="bg-[#4285F4] text-white px-4 py-2 rounded-full hover:bg-[#3367d6] transition-colors">
                发表评论
              </button>
            </div>
          </div>

          {/* 评论列表 */}
          <div className="space-y-6">
            {comments.map((comment) => (
              <div key={comment.id} className="flex gap-4 pb-4 border-b last:border-0">
                <div className="relative w-10 h-10 flex-shrink-0">
                  <Image
                    src={comment.author.avatar}
                    alt={comment.author.name}
                    fill
                    className="rounded-full object-cover"
                  />
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="font-medium">{comment.author.name}</h4>
                    <span className="text-sm text-gray-500">{comment.createdAt}</span>
                  </div>
                  <p className="text-gray-600 mb-2">{comment.content}</p>
                  <div className="flex items-center gap-4">
                    <button className="flex items-center gap-1 text-sm text-gray-500 hover:text-[#4285F4]">
                      <Heart className="w-4 h-4" />
                      <span>{comment.likes}</span>
                    </button>
                    <button className="text-sm text-gray-500 hover:text-[#4285F4]">
                      回复
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}