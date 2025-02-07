'use client'

export default function DataDisplay() {
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
              d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" 
            />
          </svg>
        </div>

        <h2 className="text-3xl font-bold text-gray-900 mb-4">
          数据展示
        </h2>
        
        <p className="text-gray-600">
          我们正在整合和开发更全面的数据分析功能，敬请期待！
        </p>
      </div>
    </div>
  );
} 