'use client'

import { useState, useEffect } from 'react';

interface NotificationModalProps {
  showNotificationModal: boolean;
  setShowNotificationModal: (show: boolean) => void;
  selectedNotification: {
    id: number;
    title: string;
    content: string;
    time: string;
    type: string;
  } | null;
}

export default function NotificationModal({
  showNotificationModal,
  setShowNotificationModal,
  selectedNotification
}: NotificationModalProps) {
  if (!showNotificationModal || !selectedNotification) return null;

  return (
    <div 
      className="fixed inset-0 bg-black/50 flex items-center justify-center z-50"
      onClick={(e) => {
        if (e.target === e.currentTarget) {
          setShowNotificationModal(false);
        }
      }}
    >
      <div className="bg-white rounded-2xl max-w-[500px] w-full mx-4 p-6 relative animate-modal-in">
        {/* 关闭按钮 */}
        <button 
          onClick={() => setShowNotificationModal(false)}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors"
        >
          <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M18 6L6 18M6 6l12 12" />
          </svg>
        </button>

        {/* 通知类型图标 */}
        <div className="mb-4">
          {selectedNotification.type === 'course' && (
            <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center">
              <svg className="w-6 h-6 text-blue-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M12 14l9-5-9-5-9 5 9 5z" />
                <path d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" />
              </svg>
            </div>
          )}
          {selectedNotification.type === 'reply' && (
            <div className="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center">
              <svg className="w-6 h-6 text-green-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M21 11.5a8.38 8.38 0 01-.9 3.8 8.5 8.5 0 01-7.6 4.7 8.38 8.38 0 01-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 01-.9-3.8 8.5 8.5 0 014.7-7.6 8.38 8.38 0 013.8-.9h.5a8.48 8.48 0 018 8v.5z" />
              </svg>
            </div>
          )}
          {selectedNotification.type === 'system' && (
            <div className="w-12 h-12 rounded-full bg-yellow-100 flex items-center justify-center">
              <svg className="w-6 h-6 text-yellow-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z" />
                <line x1="12" y1="9" x2="12" y2="13" />
                <line x1="12" y1="17" x2="12.01" y2="17" />
              </svg>
            </div>
          )}
        </div>

        {/* 通知标题 */}
        <h3 className="text-xl font-bold mb-2">{selectedNotification.title}</h3>
        {/* 通知时间 */}
        <p className="text-sm text-gray-500 mb-4">{selectedNotification.time}</p>
        
        {/* 通知内容 */}
        <p className="text-gray-600 mb-6">{selectedNotification.content}</p>
        
        {/* 操作按钮 */}
        <div className="flex gap-4">
          <button
            onClick={() => setShowNotificationModal(false)}
            className="flex-1 px-4 py-2 bg-gray-100 text-gray-600 rounded-lg hover:bg-gray-200 transition-colors"
          >
            关闭
          </button>
          {selectedNotification.type === 'course' && (
            <button
              onClick={() => {
                setShowNotificationModal(false);
                // 这里可以添加跳转到课程页面的逻辑
              }}
              className="flex-1 px-4 py-2 bg-[#4285F4] text-white rounded-lg hover:bg-[#3367D6] transition-colors"
            >
              查看课程
            </button>
          )}
          {selectedNotification.type === 'reply' && (
            <button
              onClick={() => {
                setShowNotificationModal(false);
                // 这里可以添加跳转到帖子页面的逻辑
              }}
              className="flex-1 px-4 py-2 bg-[#4285F4] text-white rounded-lg hover:bg-[#3367D6] transition-colors"
            >
              查看帖子
            </button>
          )}
        </div>
      </div>
    </div>
  );
} 