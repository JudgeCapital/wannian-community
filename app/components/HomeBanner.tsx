'use client'

export default function HomeBanner() {
  return (
    <section className="relative">
      <div 
        className="h-[400px] w-full"
        style={{
          background: 'linear-gradient(180deg, #4285F4 0%, rgba(66, 133, 244, 0.85) 100%)'
        }}
      >
        {/* 内容区域 */}
        <div className="h-full flex flex-col items-center justify-center text-center">
          <h1 className="text-[40px] text-white font-bold mb-4">万年社区</h1>
          <p className="text-white text-[18px] opacity-80 mb-8">
            从零开始学习技术分析，让交易成为时间的玫瑰
          </p>
          <div className="flex gap-4">
            <button className="bg-white text-[#4285F4] px-6 py-2 rounded-full">
              开始学习
            </button>
            <button className="border border-white text-white px-6 py-2 rounded-full">
              了解更多
            </button>
          </div>
        </div>

        {/* 底部白色模糊过渡 */}
        <div 
          className="absolute bottom-0 left-0 right-0 h-[80px]"
          style={{
            background: 'linear-gradient(180deg, rgba(255, 255, 255, 0) 0%, #FFFFFF 100%)'
          }}
        />
      </div>
    </section>
  );
}