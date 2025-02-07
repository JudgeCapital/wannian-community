'use client'

export default function DataDisplay() {
  return (
    <div className="min-h-[calc(100vh-60px)] flex items-center justify-center p-4">
      <div className="text-center max-w-2xl mx-auto bg-white rounded-2xl shadow-sm p-12">
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
        
        <p className="text-gray-600 mb-8">
          我们正在整合和开发更全面的数据分析功能，敬请期待！
        </p>

        <div className="space-y-4">
          <div className="bg-gray-50 rounded-lg p-4">
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              即将推出的功能
            </h3>
            <ul className="text-gray-600 space-y-2">
              <li>• 实时市场数据</li>
              <li>• 高级图表分析</li>
              <li>• 历史数据查询</li>
              <li>• 自定义数据报告</li>
            </ul>
          </div>

          <div className="bg-[#4285F4]/5 rounded-lg p-4 mt-4">
            <p className="text-sm text-gray-600">
              我们致力于为您提供最专业、最全面的数据分析工具，
              帮助您做出更明智的交易决策。
            </p>
          </div>
        </div>
      </div>
    </div>
  );
} 