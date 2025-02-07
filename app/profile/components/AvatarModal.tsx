'use client'

import { useRef } from 'react';
import Image from 'next/image';

interface AvatarModalProps {
  defaultAvatar: { src: string; alt: string };
  currentAvatar: { src: string; alt: string };
  onUpload: (file: File) => void;
  onReset: () => void;
  onClose: () => void;
}

export default function AvatarModal({ defaultAvatar, currentAvatar, onUpload, onReset, onClose }: AvatarModalProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      onUpload(file);
    }
  };

  const isUsingDefaultAvatar = currentAvatar.src === defaultAvatar.src;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div className="relative w-[480px] bg-white rounded-2xl p-8">
        {/* 关闭按钮 */}
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center text-gray-500 hover:text-gray-700"
        >
          <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        {/* 标题 */}
        <h2 className="text-2xl font-bold mb-6">更改头像</h2>

        {/* 当前头像预览 */}
        <div className="flex flex-col items-center gap-4 mb-8">
          <div className="relative w-32 h-32">
            <Image
              src={currentAvatar.src}
              alt={currentAvatar.alt}
              fill
              className="object-cover rounded-[20%] border-4 border-gray-50"
            />
          </div>
          <span className="text-sm text-gray-500">
            {isUsingDefaultAvatar ? '当前使用默认头像' : '当前使用自定义头像'}
          </span>
        </div>

        {/* 操作按钮 */}
        <div className="space-y-4">
          {/* 上传按钮 */}
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            className="hidden"
          />
          <button
            onClick={() => fileInputRef.current?.click()}
            className="w-full h-12 flex items-center justify-center gap-2 text-[#4285F4] hover:text-[#2b5797] border-2 border-dashed border-[#4285F4] hover:border-[#2b5797] rounded-xl transition-colors"
          >
            <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M12 4v16m8-8H4" />
            </svg>
            <span>上传新头像</span>
          </button>

          {/* 重置按钮 - 仅在使用自定义头像时显示 */}
          {!isUsingDefaultAvatar && (
            <button
              onClick={onReset}
              className="w-full h-12 flex items-center justify-center gap-2 text-gray-600 hover:text-gray-800 border-2 border-gray-200 hover:border-gray-300 rounded-xl transition-colors"
            >
              <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M3 12a9 9 0 1 0 9-9 9 9 0 0 0-9 9z"/>
                <path d="M3 12h9"/>
                <path d="M12 3v9"/>
              </svg>
              <span>恢复默认头像</span>
            </button>
          )}
        </div>

        {/* 提示文本 */}
        <p className="mt-4 text-center text-sm text-gray-500">
          支持 jpg、png 格式，大小不超过 2MB
        </p>
      </div>
    </div>
  );
} 