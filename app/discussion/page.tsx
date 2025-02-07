'use client'

export default function Discussion() {
  return (
    <div className="min-h-[calc(100vh-60px)] flex items-center justify-center p-4">
      <div className="text-center w-[600px] min-h-[300px] mx-auto bg-white rounded-2xl shadow-sm p-12">
        {/* 敬请期待图标 */}
        <div className="w-24 h-24 mx-auto mb-6 bg-[#4285F4]/10 rounded-full flex items-center justify-center">
          <svg 
            className="w-12 h-12 text-[#4285F4]" 
            fill="none" 
            viewBox="0 0 24 24" 
            stroke="currentColor"
          >
            <path 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              strokeWidth={2} 
              d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" 
            />
          </svg>
        </div>

        <h2 className="text-3xl font-bold text-gray-900 mb-4">
          内部讨论组
        </h2>
        
        <p className="text-gray-600">
          我们正在努力打造一个更好的交流平台，敬请期待！
        </p>
      </div>
    </div>
  );
} 